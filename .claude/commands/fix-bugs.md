---
description: Find and fix UI bugs across the portfolio — interactions, animations, responsive issues, and edge cases
---

# Bug Hunter Skill

You are systematically hunting and fixing UI bugs in this portfolio. Be thorough — check every interaction, every viewport, every edge case.

## Input
$ARGUMENTS (specific bug description, or "full" for complete audit. Default: "full")

## Step 1: Identify the bug category

Classify the reported bug (or scan for all categories if "full"):

### Navigation & Menu
- Hamburger menu: does it open/close correctly at all scroll positions?
- Does the nav background cover content when menu is open?
- Do menu links work and close the menu after click?
- Does the nav have proper `position: fixed` with full width and solid background?
- Is `z-index` high enough to sit above all content?
- When scrolled down and menu opens, does content behind stay in place (no jump)?
- Is the menu dropdown positioned relative to viewport (not document), so it appears correctly regardless of scroll position?

**CRITICAL CSS BUG PATTERN — `backdrop-filter` breaks `position: fixed` children:**
If a parent element (like `.nav`) has `backdrop-filter`, `filter`, `transform`, `perspective`, or `will-change: transform`, it becomes a **containing block** for `position: fixed` descendants. This means a child with `position: fixed; inset: 0` will be sized relative to the PARENT, not the viewport. The menu overlay will only cover the nav bar area instead of the full screen.

**How to detect:** If the fullscreen menu overlay doesn't cover the page when scrolled down (but works at the top), check if the nav gets `backdrop-filter` via a `.scrolled` class.

**How to fix:** NEVER nest a `position: fixed` fullscreen overlay inside an element that has `backdrop-filter`. Two solutions:
1. Move the overlay element OUTSIDE the parent in the HTML (preferred — no CSS hacks needed)
2. Remove `backdrop-filter` from the parent when the overlay is active (fragile — depends on `:has()` support and specificity)

**CRITICAL BUG PATTERN — Back-forward cache (bfcache) blank page:**
When a page has a fade-out exit animation (e.g., `body.page-exit { opacity: 0 }` or inline `style.opacity = '0'`), the browser may cache the page in its exit state. When the user swipes back (mobile gesture or browser back), the page is restored from bfcache with opacity still at 0 — blank screen.

**How to detect:** Navigate away from a page, then use browser back (or mobile swipe-back gesture). If the page is blank/invisible, this is a bfcache issue.

**How to fix:** Listen for `pageshow` event and reset the page state when `event.persisted` is true:
```javascript
window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
        document.body.classList.remove('page-exit');
        document.body.style.opacity = '';
        document.body.style.transition = '';
    }
});
```
This must be added to EVERY page that has exit animations.

### Scroll & Position
- Elements with `position: fixed` or `position: sticky` — do they work at all scroll positions?
- Scroll-triggered animations — do they fire correctly when scrolling up AND down?
- Back-to-top button — visible when scrolled, hidden at top?
- Scroll progress bar — accurate, smooth, no jumps?
- Anchor links (`#section`) — do they scroll to the right position accounting for fixed nav height?

### Animations & Transitions
- Page transitions — do they complete before navigation?
- Reveal animations — do all elements become visible (none stuck at opacity: 0)?
- Typing effect — does it loop correctly without glitches?
- Counter animation — does it reach the target number?
- Hover effects — no layout shifts on hover?

### Responsive & Overflow
- Horizontal scroll on any viewport width (check 320px, 375px, 414px, 768px)
- Text overflow / truncation issues
- Images or elements breaking out of containers
- Touch targets too small (< 44px)
- Content hidden behind fixed elements (nav, footer)

### Forms & Interactions
- Contact form submission — does it work?
- Form validation — proper error states?
- Button click states — visual feedback on tap?
- Link destinations — all correct, no broken links?

## Step 2: Reproduce

For each bug found:
1. Identify the exact file and line causing the issue
2. Understand WHY it happens (root cause, not just symptom)
3. Check if the bug exists on both mobile AND desktop

## Step 3: Fix

For each bug:
1. Apply the minimal fix that solves the root cause
2. Verify the fix doesn't break anything else
3. Test on both mobile (375px) and desktop (1440px) mentally

## Step 4: Systematic check

After fixing the reported bug, do a quick scan of all categories above. Report any other bugs found.

## Step 5: Report

```
## Bug Fix Report

### Fixed
- [bug]: [root cause] → [fix applied] (file:line)

### Other bugs found
- [bug]: [description] → [fix applied or recommendation]

### Verified clean
- [list of things checked that are working correctly]
```

## Rules
- Fix the ROOT CAUSE, not the symptom
- Never use `!important` to override — fix the specificity or structure
- Never use `px` (use `rem/em`) except for IntersectionObserver rootMargin
- Test that fixes work at all scroll positions, not just the top of the page
- Navigation must ALWAYS be accessible — if the menu is broken, users can't navigate at all, so nav bugs are always Critical priority
- When a `position: fixed` child doesn't cover the viewport, check EVERY ancestor for `backdrop-filter`, `filter`, `transform`, `perspective`, or `will-change` — any of these creates a containing block that breaks fixed positioning
- Prefer structural HTML fixes (moving elements) over CSS workarounds
