# Personal Portfolio

Personal portfolio website built with MkDocs Material.

![Version](https://img.shields.io/github/v/release/charudatta10/personal-portfolio)

## What is this?

A personal portfolio and blog site built on MkDocs Material, covering profile,
education, skills, projects, publications and blog posts. It ships with
offline support, full-text search, tags, a blog plugin and a light/dark theme.

## Features

- MkDocs Material theme with dark/light palette
- Offline build (PWA) with search, tags and blog
- Sections for profile, achievements, education, skills and experience
- Projects, publications and FOSS work showcase
- Self-hosted blog with tags and pagination

## Install

```sh
pip install uv
uv sync
```

## Quickstart

```sh
uv run python -m mkdocs serve
```

Build the static site:

```sh
uv run python -m mkdocs build
```

Run the tests:

```sh
uv run python -m unittest discover -s tests
```

## Usage

Serve locally and open the printed URL to preview. The built site is output to
the `site/` directory and can be deployed to any static host.

## License

All rights reserved.
