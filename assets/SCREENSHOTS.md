# Apollo Theme Screenshots Guide

This document outlines the screenshots needed for the Apollo Theme documentation and marketplace listing.

## Required Screenshots

### 1. Main Preview Images
- **preview-dark.png** (1200x800): Apollo Dark theme overview showing editor with sample code
- **preview-light.png** (1200x800): Apollo Light theme overview showing editor with sample code

### 2. Language-Specific Screenshots
- **screenshot-js.png** (800x600): JavaScript/TypeScript syntax highlighting
- **screenshot-html.png** (800x600): HTML/CSS syntax highlighting  
- **screenshot-json.png** (800x600): JSON syntax highlighting
- **screenshot-md.png** (800x600): Markdown syntax highlighting

### 3. UI Component Screenshots
- **screenshot-sidebar.png** (400x600): Sidebar and activity bar styling
- **screenshot-terminal.png** (800x400): Terminal color scheme
- **screenshot-settings.png** (800x600): Theme selection in VS Code settings

## Screenshot Guidelines

### Setup Instructions
1. Install Apollo Theme in VS Code
2. Set window size to specified dimensions
3. Use the sample files provided in `/assets/samples/`
4. Ensure consistent font (Fira Code or similar)
5. Use standard VS Code layout (sidebar visible, minimap enabled)

### Sample Code Files
Use the provided sample files for consistent screenshots:
- `sample.js` - JavaScript/TypeScript example
- `sample.html` - HTML/CSS example
- `sample.json` - JSON example
- `sample.md` - Markdown example

### Color Accuracy
- Use high-quality PNG format
- Ensure color accuracy (no compression artifacts)
- Test on different displays for consistency
- Maintain Apollo color palette integrity

### Composition Guidelines
- Show enough code to demonstrate syntax highlighting variety
- Include line numbers and minimap when relevant
- Ensure UI elements (tabs, sidebar, status bar) are visible
- Use realistic code examples (not Lorem Ipsum)

## Generating Screenshots

### Automated Method (Recommended)
```bash
# Use VS Code screenshot extension or automation script
npm run screenshots:generate
```

### Manual Method
1. Open VS Code with Apollo Theme active
2. Open sample file from `/assets/samples/`
3. Adjust window size to required dimensions
4. Take screenshot using system tools
5. Save to `/assets/` with correct filename
6. Optimize file size while maintaining quality

## File Specifications

| File | Dimensions | Format | Max Size |
|------|------------|--------|----------|
| preview-dark.png | 1200x800 | PNG | 500KB |
| preview-light.png | 1200x800 | PNG | 500KB |
| screenshot-*.png | 800x600 | PNG | 300KB |
| icon.png | 128x128 | PNG | 50KB |

## Marketplace Requirements

For VS Code Marketplace submission:
- At least 1 main preview image (1200x800)
- Maximum 5 additional screenshots
- PNG format only
- High quality, no compression artifacts
- Demonstrate theme features clearly

## Quality Checklist

- [ ] All required screenshots present
- [ ] Correct dimensions and file sizes
- [ ] Apollo colors accurately represented
- [ ] No UI elements cut off or obscured
- [ ] Consistent VS Code layout across screenshots
- [ ] Sample code demonstrates syntax highlighting variety
- [ ] File names match documentation references
- [ ] Images optimized for web display

## Sample Code Content

Each sample file should demonstrate:
- **JavaScript**: Functions, classes, variables, strings, comments, operators
- **HTML**: Tags, attributes, content, CSS integration
- **JSON**: Objects, arrays, strings, numbers, booleans
- **Markdown**: Headers, links, code blocks, emphasis, lists

## Notes for Contributors

When updating screenshots:
1. Use the same sample files for consistency
2. Maintain the same VS Code settings and layout
3. Update this guide if new screenshot types are needed
4. Test screenshots in both light and dark system themes
5. Verify accessibility (contrast, readability)

## Automation Scripts

Future enhancement: Create automated screenshot generation using:
- Puppeteer for browser automation
- VS Code extension API for programmatic screenshots
- CI/CD integration for automatic updates
- Consistent environment setup (Docker)

This ensures screenshots stay up-to-date with theme changes and maintain consistency across releases.