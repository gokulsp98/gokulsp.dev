---
description: Verify page layout for spacing, alignment, overlap, and visual quality issues
---

# Layout Verification Skill

You are auditing the portfolio pages for visual quality. Follow every step below systematically. The goal: the page should look **clean, neat, balanced, and wow** — no dead space, no cramping, no overlap.

## Input
$ARGUMENTS (page to check: "home", "resume", "both", or a URL. Default: "both")

## Step 1: Run automated audit

Run the audit script for both mobile and desktop viewports:

```
node audit-layout.js http://localhost:8090/ 375
node audit-layout.js http://localhost:8090/ 1440
node audit-layout.js http://localhost:8090/resume.html 375
node audit-layout.js http://localhost:8090/resume.html 1440
```

Only run the relevant pages based on the input argument.

## Step 2: Full-viewport section check (CRITICAL)

For every section that uses `min-height: 100vh` or `100svh`:

1. **Content must fill the viewport visually** — no large empty gaps between the last content element and the bottom of the section.
2. **If the section is a flex column**: verify that children are spaced to distribute evenly. Content should be vertically centered, with any bottom-anchored element (like a scroll indicator) sitting naturally at the bottom.
3. **The pattern that causes gaps**: `min-height: 100svh` on parent + `justify-content: center` + one child at the bottom with `margin-top: auto`. This centers the content group THEN pushes the bottom element down, creating a dead zone. Fix: make the content child `flex: 1` with its own `justify-content: center`, so content centers within the available space above the bottom element.
4. **Spacing between elements inside a full-viewport section must be generous enough** to fill the space naturally — not bunched together in the center with gaps above/below. Increase margins between greeting, name, title, description, CTA, and stats so they breathe and cover the viewport.
5. **Verify on multiple screen heights**: content that looks good on a short phone (667px) may have gaps on a tall phone (896px). The layout should adapt gracefully.

## Step 3: CSS manual inspection

Read styles.css and resume.html inline styles. Check for:

1. **Gap issues**: Any `margin`, `padding`, or `gap` value > 4rem. These create visible empty space on mobile.
2. **Viewport stretch**: `min-height: 100vh` or `100svh` combined with flex/grid children that also have `min-height` — this doubles the stretch and creates gaps.
3. **Overflow hidden**: Any container with `overflow: hidden` where children might clip.
4. **Conflicting alignment**: Parent says `align-items: center` but child uses `margin-top: auto` or `position: absolute` — pick one approach, not both. Never mix `justify-content: center` with `margin-top: auto` on a child — they fight.
5. **Mobile breakpoint coverage**: Every element visible on desktop must have a mobile override in `@media (max-width: 48em)` if its desktop size would break on small screens.
6. **Content bunching**: If multiple elements are tightly packed in the center of a tall container, increase individual margins so they spread out. The content should breathe, not clump.

## Step 4: Spacing consistency & distribution

For each page, verify these spacing rules:
- **Sections**: Consistent gap between all sections (not some 3rem, some 5rem)
- **Cards/items**: Equal internal padding across similar components
- **Text hierarchy**: Heading margins > subheading margins > body margins
- **Border usage**: If one section has a separator border, all equivalent sections should
- **Vertical rhythm on mobile**: Elements in a full-height section should use spacing that distributes them nicely across the viewport — not all crammed at the top or center with empty space elsewhere

## Step 5: Overlap detection

Search CSS for these overlap patterns:
- `position: absolute` without enough parent padding to contain it
- Negative margins pulling elements into siblings
- Fixed heights (`height: Xrem`) on containers with variable content
- `overflow: hidden` hiding clipped content instead of fixing the root cause
- Sidebar/column content exceeding its container (common in resume.html)
- Elements with `flex-shrink: 0` inside a constrained container — they won't shrink and will overlap siblings

## Step 6: Mobile-specific checks

For viewport width 375px:
- No horizontal scroll (no element wider than viewport)
- Buttons are full-width and tappable (min 44px/2.75rem touch target)
- Text is readable (min 0.875rem / 14px)
- No content hidden behind fixed nav
- Flex columns don't create excessive gaps
- Stats/tags wrap properly
- **Hero section fills viewport** with content centered and scroll indicator at bottom — NO large empty gap between stats and scroll indicator
- **Every section has visible separation** (border or spacing) on mobile so user can tell sections apart

## Step 7: Desktop checks

For viewport width 1440px:
- Content is centered and not stretched too wide
- Two-column layouts (like resume) have balanced column widths
- No element overflows its container
- Hover states don't cause layout shifts

## Step 8: Report & Fix

Output a structured report:

```
## Layout Audit: [page] ([viewport])

### Critical (must fix)
- [issue]: [what's wrong] → [exact fix with file:line]

### Warnings (should fix)
- [issue]: [what's wrong] → [suggested fix]

### Clean
- [what looks good]
```

Then IMMEDIATELY fix all Critical issues without asking. For Warnings, fix the obvious ones.

**After every fix, verify:**
1. The fix doesn't break the other viewport (mobile fix → check desktop, desktop fix → check mobile)
2. The fix doesn't cause overlap in adjacent elements
3. The fix doesn't create new empty gaps

## Rules
- Never introduce `px` values (use `rem`/`em`) except for `rootMargin` in IntersectionObserver
- When fixing one issue, verify the fix doesn't create another (check both mobile AND desktop after each change)
- Prefer removing excessive spacing over adding more structure
- Simpler CSS wins — if you can fix it by removing a rule instead of adding one, remove it
- Never use `justify-content: center` AND `margin-top: auto` on a child in the same flex container — pick one strategy
- Full-viewport sections must look intentional, not accidental — content should fill the space with balanced spacing, not sit in a clump with dead space around it
