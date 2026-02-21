# Contributing to Graphmaid

Thank you for your interest in contributing! This document covers how to get set up and submit changes.

## Local Setup

```bash
git clone https://github.com/navopw/graphmaid.git
cd graphmaid
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Development Workflow

1. Fork the repository and create a branch from `main`
2. Use a descriptive branch name: `fix/export-png-crash`, `feat/add-gantt-sample`, etc.
3. Make your changes and manually test in the browser
4. Run `npm run lint` and fix any issues before submitting
5. Open a pull request against `main`

## Code Style

- **TypeScript strict mode** is enabled — no `any` types or unused variables
- **ESLint** enforces React hooks rules; run `npm run lint` to check
- Keep components small and focused; follow the existing file layout in `src/`
- No test runner is configured — manual browser testing is sufficient

## Adding Sample Diagrams

Sample diagrams live in [src/data/samples.ts](src/data/samples.ts). Each entry is:

```ts
{
  name: "My Diagram",
  description: "Short description",
  code: `graph TD\n  A --> B`
}
```

Good samples showcase a specific Mermaid diagram type not already covered.

## Reporting Issues

Use the [bug report template](https://github.com/navopw/graphmaid/issues/new?template=bug_report.yml) when filing bugs. Including the Mermaid code that triggered the issue speeds up diagnosis significantly.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
