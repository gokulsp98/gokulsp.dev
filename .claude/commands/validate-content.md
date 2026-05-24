---
description: Validate all portfolio content for accuracy, grammar, consistency, and trustworthiness — no assumptions, no wrong info, no fluff
---

# Content Validator Skill

You are auditing every piece of text in this portfolio for accuracy, grammar, and trust. A recruiter reading this should never find a claim that feels exaggerated, a grammar mistake, or information that contradicts itself across sections.

## Input
$ARGUMENTS (specific text to validate, or "full" for complete audit. Default: "full")

## Step 1: Gather all content

Read `data.js` for all portfolio data. Read `script.js` for any hardcoded text in render functions. Read `resume.html` for resume-specific text. Cross-reference everything.

## Step 2: Factual accuracy checks

For each claim, verify:

### Technology claims
- Every technology mentioned must appear in the Skills section OR Experience tags
- If a technology is highlighted in a description (e.g., "built with Spark"), it must be in the relevant experience entry
- Don't claim expertise in something only listed as "intermediate"
- Don't mention technologies in hero/about that aren't backed by experience entries

### Role & timeline claims
- Job titles must be consistent across all sections (hero, about, experience, resume)
- Date ranges must not overlap or have unexplained gaps
- "Years of experience" stat must match the actual timeline (first job start → present)
- Company names must be consistent (not "Kissflow" in one place and "KissFlow" in another)

### Achievement claims
- "Built from scratch" / "from zero" — is there an experience entry that supports this?
- Award descriptions must match what the award was actually for
- Stats (years, technologies count, awards count) must be verifiable from the data

### Cross-section consistency
- Hero description must not contradict About paragraphs
- About paragraphs must not contradict Experience details
- Resume text must align with portfolio content
- Skills listed in Experience tags should exist in Skills section

## Step 3: Grammar & language quality

Check for:
- Subject-verb agreement
- Tense consistency (present for current role, past for previous)
- Comma splices, run-on sentences, fragments
- Correct use of em dashes (—) vs hyphens (-)
- Consistent capitalization of product/technology names
- No orphaned conjunctions or awkward phrasing
- British vs American English consistency (pick one, stick with it)

## Step 4: Trust & tone audit

Flag any text that:
- Makes claims without backing (e.g., "expert in X" without showing where X was used)
- Uses vague buzzwords without substance ("leveraging synergies", "driving innovation")
- Sounds like AI-generated filler rather than a real person
- Exaggerates scope (saying "led" when the experience suggests individual contribution)
- Mentions technologies or tools not supported by any experience entry
- References things the person hasn't actually done based on their experience data

## Step 5: Redundancy check

Flag content that:
- Says the same thing in multiple sections (see UX audit guidelines)
- Uses the same phrase or sentence structure repeatedly
- Lists the same technology in description text AND tags of the same section

## Step 6: Report

```
## Content Validation Report

### Errors (must fix)
- [location]: [what's wrong] → [suggested fix]

### Warnings (should fix)
- [location]: [concern] → [recommendation]

### Grammar fixes
- [location]: [issue] → [correction]

### Verified accurate
- [list of claims checked and confirmed correct]
```

## Rules
- NEVER assume something is true — verify against the data
- If a technology is mentioned in a description but not in skills/experience tags, flag it
- If a claim can't be verified from the portfolio data alone, flag it as "unverifiable — confirm with user"
- Tense matters: current role = present tense, past roles = past tense
- Every section should sound like the SAME person wrote it (consistent voice)
- Don't flag style preferences (like using em dashes) — only flag actual errors
- The portfolio is for job marketing — content should be confident but honest, never inflated
