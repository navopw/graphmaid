# Graphmaid

A modern, elegant Mermaid diagram viewer with a stunning dark mode and live editing capabilities.

<img width="1698" height="1281" alt="image" src="https://github.com/user-attachments/assets/e0423a02-556d-4fc4-83d9-8755930d51a2" />

## Features

- **Live Mermaid Rendering**: Edit Mermaid code and see diagrams update in real-time
- **OLED Dark Mode**: True black background optimized for OLED displays
- **Export Options**: Download diagrams as PNG, SVG, or copy to clipboard
- **Sample Library**: Built-in collection of Mermaid diagram examples
- **Monaco Editor**: Full-featured code editor with syntax highlighting

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Monaco Editor
- Mermaid.js

## URL Query Params

You can pre-load a diagram by passing it as a base64-encoded `code` query parameter:

```
https://your-deployment.com/?code=<base64-encoded-mermaid>
```

**Example:**

```bash
# Encode your diagram
echo -n 'graph TD
  A --> B' | base64

# Then open:
# http://localhost:5173/?code=Z3JhcGggVEQKICBBIC0tPiBC
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## Build

```bash
npm run build
```

## License

MIT
