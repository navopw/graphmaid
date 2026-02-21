# Graphmaid

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Deploy](https://github.com/navopw/graphmaid/actions/workflows/deploy.yml/badge.svg)](https://github.com/navopw/graphmaid/actions/workflows/deploy.yml)

A modern Mermaid diagram editor with live preview and an OLED-optimized dark theme.

**[Live Demo](https://navopw.github.io/graphmaid/)**

<img width="1698" height="1281" alt="image" src="https://github.com/user-attachments/assets/e0423a02-556d-4fc4-83d9-8755930d51a2" />

## Features

- **Live Mermaid Rendering** -- Edit Mermaid code and see diagrams update in real-time
- **OLED Dark Mode** -- True black background optimized for OLED displays
- **Export Options** -- Download diagrams as PNG, SVG, or copy to clipboard
- **Sample Library** -- Built-in collection of Mermaid diagram examples (Flowchart, Sequence, State, Class, ER, Gantt, Pie, Git, Mindmap, Architecture)
- **Monaco Editor** -- Full-featured code editor with syntax highlighting and Mermaid completions
- **URL Sharing** -- Pre-load diagrams via base64-encoded `?code=` query parameter
- **Zoom & Pan** -- Mouse wheel zoom and drag-to-pan on the diagram viewer

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Monaco Editor
- Mermaid.js

## Getting Started

```bash
git clone https://github.com/navopw/graphmaid.git
cd graphmaid
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
npm run build
npm run preview   # preview the production build
```

## URL Query Params

Pre-load a diagram by passing it as a base64-encoded `code` query parameter:

```
https://navopw.github.io/graphmaid/?code=<base64-encoded-mermaid>
```

Example:

```bash
# Encode your diagram
echo -n 'graph TD
  A --> B' | base64

# Then open:
# https://navopw.github.io/graphmaid/?code=Z3JhcGggVEQKICBBIC0tPiBC
```

## Architecture

```
src/
  App.tsx                    # Root component — holds editor state, wires editor to viewer
  components/
    editor/                  # Monaco editor with custom Mermaid language support
    layout/                  # Header, SplitPane (draggable), ErrorPanel
    toolbar/                 # SampleSelector (portal dropdown), ExportMenu
    viewer/                  # MermaidDiagram — SVG viewer with zoom/pan/export
  hooks/
    useMermaidRender.ts      # Core render loop: debounce input → Mermaid render → error extraction
    useDebounce.ts           # Generic debounce hook
  lib/
    mermaid.ts               # Mermaid initialization and render wrapper
    export.ts                # SVG/PNG download and clipboard copy
  data/
    samples.ts               # Built-in sample diagrams
```

State is managed in `App.tsx` with no external state library. The UI is a draggable split pane with Monaco on the left and the SVG viewer on the right. Rendering is handled by the `useMermaidRender` hook which debounces input (500ms) before calling Mermaid.

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for setup instructions and guidelines.

## Acknowledgments

Built on top of [Mermaid.js](https://mermaid.js.org/), [Monaco Editor](https://microsoft.github.io/monaco-editor/), and [React](https://react.dev/).

## License

[MIT](LICENSE)
