/**
 * Layout Audit Script (no dependencies)
 * Run: node audit-layout.js [url] [viewport-width]
 * Examples:
 *   node audit-layout.js http://localhost:8090/ 375
 *   node audit-layout.js http://localhost:8090/resume.html 1440
 */

const url = process.argv[2] || 'http://localhost:8090/';
const viewportWidth = parseInt(process.argv[3]) || 1440;
const isMobile = viewportWidth <= 768;

async function audit() {
    console.log(`\n====== LAYOUT AUDIT ======`);
    console.log(`URL: ${url}`);
    console.log(`Viewport: ${viewportWidth}px (${isMobile ? 'MOBILE' : 'DESKTOP'})`);
    console.log(`==========================\n`);

    let html;
    try {
        const res = await fetch(url);
        html = await res.text();
    } catch (e) {
        console.error(`ERROR: Cannot reach ${url} — is the dev server running?`);
        process.exit(1);
    }

    const issues = [];
    let checks = 0;

    // Extract all CSS (inline <style> blocks + linked stylesheets)
    let cssText = '';
    const styleBlocks = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
    styleBlocks.forEach(block => {
        cssText += block.replace(/<\/?style[^>]*>/gi, '') + '\n';
    });

    // Also fetch linked stylesheets
    const linkMatches = html.match(/href="([^"]+\.css)"/g) || [];
    for (const m of linkMatches) {
        const href = m.match(/href="([^"]+)"/)[1];
        const cssUrl = new URL(href, url).toString();
        try {
            const res = await fetch(cssUrl);
            cssText += await res.text() + '\n';
        } catch (e) {}
    }

    // --- CHECK 1: Large spacing values ---
    checks++;
    const largeSpacing = [];
    const spacingRegex = /(?:margin|padding|gap)(?:-top|-bottom|-left|-right)?:\s*([\d.]+)(rem|em)/g;
    let match;
    while ((match = spacingRegex.exec(cssText)) !== null) {
        const val = parseFloat(match[1]);
        if (val > 4) {
            const line = cssText.substring(0, match.index).split('\n').length;
            largeSpacing.push({ rule: match[0].trim(), px: Math.round(val * 16), line });
        }
    }
    if (largeSpacing.length > 0) {
        issues.push({
            severity: 'WARN',
            type: 'LARGE_SPACING',
            message: `${largeSpacing.length} spacing values > 4rem (~64px) — potential gap issues`,
            details: largeSpacing.map(s => `${s.rule} (~${s.px}px) at CSS line ~${s.line}`)
        });
    }

    // --- CHECK 2: Multiple viewport height locks ---
    checks++;
    const vhMatches = [];
    const vhRegex = /(min-)?height:\s*(100[vs]?vh|calc\(100[vs]?vh[^)]*\))/g;
    while ((match = vhRegex.exec(cssText)) !== null) {
        const context = cssText.substring(Math.max(0, match.index - 100), match.index);
        const selector = (context.match(/([^\n{]+)\{[^{]*$/) || ['', '?'])[1].trim();
        vhMatches.push({ rule: match[0], selector });
    }
    if (vhMatches.length > 2) {
        issues.push({
            severity: 'WARN',
            type: 'VIEWPORT_HEIGHTS',
            message: `${vhMatches.length} elements lock to viewport height — nested ones cause gaps`,
            details: vhMatches.map(v => `${v.selector}: ${v.rule}`)
        });
    }

    // --- CHECK 3: overflow: hidden ---
    checks++;
    const overflowHidden = [];
    const ohRegex = /overflow:\s*hidden/g;
    while ((match = ohRegex.exec(cssText)) !== null) {
        const context = cssText.substring(Math.max(0, match.index - 150), match.index);
        const selector = (context.match(/([^\n{]+)\{[^{]*$/) || ['', '?'])[1].trim();
        overflowHidden.push(selector);
    }
    if (overflowHidden.length > 0) {
        issues.push({
            severity: 'INFO',
            type: 'OVERFLOW_HIDDEN',
            message: `${overflowHidden.length} element(s) with overflow:hidden — content may clip`,
            details: overflowHidden.slice(0, 8)
        });
    }

    // --- CHECK 4: Conflicting layout patterns ---
    checks++;
    // Check for margin-top: auto inside flex contexts
    const autoMargins = (cssText.match(/margin-top:\s*auto/g) || []).length;
    const minHeightVh = vhMatches.length;
    if (autoMargins > 0 && minHeightVh > 1) {
        issues.push({
            severity: 'WARN',
            type: 'STRETCH_AND_AUTO',
            message: `Using margin-top:auto (${autoMargins}x) with viewport heights (${minHeightVh}x) — this combo creates large gaps on screens taller than content`
        });
    }

    // --- CHECK 5: position: absolute without containment ---
    checks++;
    const absPos = [];
    const absRegex = /position:\s*absolute/g;
    while ((match = absRegex.exec(cssText)) !== null) {
        const context = cssText.substring(Math.max(0, match.index - 150), match.index);
        const selector = (context.match(/([^\n{]+)\{[^{]*$/) || ['', '?'])[1].trim();
        absPos.push(selector);
    }
    if (absPos.length > 0) {
        issues.push({
            severity: 'INFO',
            type: 'ABSOLUTE_POSITION',
            message: `${absPos.length} absolutely positioned element(s) — verify parent has position:relative and enough padding`,
            details: absPos.slice(0, 8)
        });
    }

    // --- CHECK 6: px values in CSS (except allowed contexts) ---
    checks++;
    const pxViolations = [];
    const pxRegex = /(?:margin|padding|gap|width|height|font-size|border-radius|top|bottom|left|right)(?:-\w+)?:\s*[\d.]+(px)/g;
    while ((match = pxRegex.exec(cssText)) !== null) {
        const context = cssText.substring(Math.max(0, match.index - 100), match.index + match[0].length + 50);
        // Allow px in rootMargin comments, media queries, and 0px
        if (!context.includes('rootMargin') && !context.includes('@media') && !match[0].includes('0px')) {
            const selector = (cssText.substring(Math.max(0, match.index - 150), match.index).match(/([^\n{]+)\{[^{]*$/) || ['', '?'])[1].trim();
            pxViolations.push({ rule: match[0].trim(), selector });
        }
    }
    if (pxViolations.length > 0) {
        issues.push({
            severity: 'WARN',
            type: 'PX_UNITS',
            message: `${pxViolations.length} CSS rule(s) still use px instead of rem/em`,
            details: pxViolations.slice(0, 8).map(v => `${v.selector}: ${v.rule}`)
        });
    }

    // --- CHECK 7: Mobile-specific ---
    if (isMobile) {
        checks++;
        // Check for fixed widths that exceed viewport
        const fixedWidths = [];
        const fwRegex = /(?:width|min-width):\s*([\d.]+)(rem)/g;
        while ((match = fwRegex.exec(cssText)) !== null) {
            const px = parseFloat(match[1]) * 16;
            if (px > viewportWidth) {
                fixedWidths.push(`${match[0]} (~${Math.round(px)}px > ${viewportWidth}px)`);
            }
        }
        if (fixedWidths.length > 0) {
            issues.push({
                severity: 'ERROR',
                type: 'MOBILE_OVERFLOW',
                message: `${fixedWidths.length} fixed width(s) exceed ${viewportWidth}px viewport`,
                details: fixedWidths.slice(0, 5)
            });
        }

        // Check flex-direction not set to column for key containers
        checks++;
        const flexNowrap = (cssText.match(/flex-wrap:\s*nowrap/g) || []).length;
        if (flexNowrap > 2) {
            issues.push({
                severity: 'INFO',
                type: 'FLEX_NOWRAP',
                message: `${flexNowrap} flex containers set to nowrap — may cause horizontal overflow on mobile`
            });
        }
    }

    // --- CHECK 8: Inline style px values in HTML ---
    checks++;
    const inlinePx = [];
    const inlineStyleRegex = /style="([^"]+)"/g;
    while ((match = inlineStyleRegex.exec(html)) !== null) {
        const pxInline = match[1].match(/[\d.]+px/g);
        if (pxInline) {
            inlinePx.push({ style: match[1].substring(0, 60), px: pxInline });
        }
    }
    if (inlinePx.length > 0) {
        issues.push({
            severity: 'WARN',
            type: 'INLINE_PX',
            message: `${inlinePx.length} inline style(s) with px values`,
            details: inlinePx.slice(0, 5).map(s => s.style)
        });
    }

    // --- CHECK 9: Spacing inconsistency in sections ---
    checks++;
    const sectionPaddings = [];
    const secPadRegex = /\.section\s*\{[^}]*padding:\s*([\d.]+)(rem|em)/g;
    while ((match = secPadRegex.exec(cssText)) !== null) {
        sectionPaddings.push(parseFloat(match[1]));
    }

    // --- CHECK 10: z-index stacking ---
    checks++;
    const zIndices = [];
    const zRegex = /z-index:\s*(\d+)/g;
    while ((match = zRegex.exec(cssText)) !== null) {
        zIndices.push(parseInt(match[1]));
    }
    const maxZ = Math.max(...zIndices, 0);
    if (maxZ > 100) {
        issues.push({
            severity: 'INFO',
            type: 'HIGH_ZINDEX',
            message: `Highest z-index is ${maxZ} — consider normalizing z-index scale`
        });
    }

    // === REPORT ===
    const errors = issues.filter(i => i.severity === 'ERROR');
    const warnings = issues.filter(i => i.severity === 'WARN');
    const infos = issues.filter(i => i.severity === 'INFO');

    if (errors.length > 0) {
        console.log(`CRITICAL (${errors.length}):`);
        errors.forEach(i => {
            console.log(`  [ERROR] ${i.type}: ${i.message}`);
            if (i.details) i.details.forEach(d => console.log(`    - ${d}`));
        });
        console.log('');
    }

    if (warnings.length > 0) {
        console.log(`WARNINGS (${warnings.length}):`);
        warnings.forEach(i => {
            console.log(`  [WARN] ${i.type}: ${i.message}`);
            if (i.details) i.details.forEach(d => console.log(`    - ${d}`));
        });
        console.log('');
    }

    if (infos.length > 0) {
        console.log(`INFO (${infos.length}):`);
        infos.forEach(i => {
            console.log(`  [INFO] ${i.type}: ${i.message}`);
            if (i.details) i.details.forEach(d => console.log(`    - ${d}`));
        });
        console.log('');
    }

    if (issues.length === 0) {
        console.log('All checks passed - no issues found.');
    }

    console.log(`--- ${checks} checks run, ${issues.length} issue(s) ---`);
    console.log(`    ${errors.length} error(s), ${warnings.length} warning(s), ${infos.length} info(s)\n`);
}

audit().catch(e => { console.error(e); process.exit(1); });
