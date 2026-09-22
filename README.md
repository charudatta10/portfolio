# Charudatta Korde — Portfolio

Research, engineering and teaching portfolio of [Charudatta Korde](https://github.com/charudatta10)
— resource-efficient AI, FPGA acceleration, cybersecurity and open-source
software.

**Live:** https://charudatta10.github.io/portfolio/

![Version](https://img.shields.io/github/v/release/charudatta10/portfolio)

## Highlights

- **Single-file site** — the entire portfolio lives in one self-contained
  `index.html` (inline CSS + JS, no build step).
- **Research** — hardware-optimised GAN architectures for FPGA-based edge
  devices; all nine publications verified against ORCID and Crossref.
- **Projects** — every card links to its exact repository or live site, no
  generic "view profile" links.
- **Design** — hand-crafted SVG/CSS diagrams, dark/light themes, scroll
  reveals, responsive, accessibility-friendly.

## Structure

```
.
├── index.html                  # The entire site (markup + CSS + JS)
├── assets/
│   ├── images/svg/favicon.svg
│   └── CharudattaKorde.pdf     # CV
├── sitemap.xml
├── robots.txt
└── .github/workflows/pages.yml # Deploys the repo root to GitHub Pages
```

## Development

Serve locally:

```sh
python -m http.server 8000
```

## Deployment

Pushing to `main` triggers the `pages.yml` workflow, which publishes the repo
root to GitHub Pages.

## License

The site content and design are © Charudatta Korde. Third-party trademarks
(IEEE, AMD Kintex, etc.) belong to their respective owners.