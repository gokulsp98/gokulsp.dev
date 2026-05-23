# gokulsp.dev

Personal portfolio — Software Engineer building marketplace features at ACV. Built with vanilla HTML, CSS, and JS.

## Tech Stack

- HTML, CSS, JavaScript (no frameworks, no build tools)
- Static 4-file architecture: `index.html`, `styles.css`, `script.js`, `data.js`
- Separate `resume.html` for a printable resume view

## Run Locally

```bash
python3 -m http.server 8090
```

Open [http://localhost:8090](http://localhost:8090)

## Structure

```
├── index.html       # Main portfolio page
├── resume.html      # Resume page (standalone)
├── styles.css       # All styles
├── script.js        # Rendering, animations, interactions
├── data.js          # All content data (edit this to update portfolio)
└── audit-layout.js  # Layout verification script
```

## Update Content

Edit `data.js` — all portfolio content (experience, skills, education, awards, writing) is driven from this single file.
