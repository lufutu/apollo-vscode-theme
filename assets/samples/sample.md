# Apollo Theme Documentation

Welcome to the **Apollo Theme** for VS Code! This theme brings the nostalgic *retro pixel art* aesthetic to your coding environment.

## Table of Contents

1. [Installation](#installation)
2. [Features](#features)
3. [Color Palette](#color-palette)
4. [Language Support](#language-support)
5. [Configuration](#configuration)
6. [Contributing](#contributing)

---

## Installation

### Quick Install

```bash
# Install via VS Code Extensions
ext install apollo-theme.apollo-theme

# Or via command line
code --install-extension apollo-theme.apollo-theme
```

### Manual Installation

1. Download the `.vsix` file from [releases](https://github.com/lufutu/apollo-vscode-theme/releases)
2. Open VS Code
3. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS)
4. Type "Extensions: Install from VSIX"
5. Select the downloaded file

> **Note**: Requires VS Code version 1.74.0 or higher

## Features

### 🎨 Dual Theme Support

The Apollo theme comes in two beautiful variants:

- **Apollo Dark**: Perfect for low-light environments
- **Apollo Light**: Ideal for well-lit spaces

### 🌈 Complete Color Palette

Our theme uses a carefully curated **48-color palette** organized into thematic groups:

| Group | Colors | Usage |
|-------|--------|-------|
| Blues/Teals | 6 colors | Keywords, UI accents |
| Greens | 6 colors | Strings, success states |
| Browns/Oranges | 6 colors | Types, classes |
| Warm Tones | 6 colors | Functions, constants |
| Purples/Magentas | 6 colors | Numbers, errors |
| Deep Purples | 6 colors | Booleans, special |
| Grayscale | 10 colors | Text, backgrounds |

### ⚡ Performance Optimized

- Fast loading times (< 50ms)
- Minimal memory footprint (< 2MB)
- Optimized JSON structure
- Efficient color mapping

## Color Palette

### Primary Colors

```css
/* Apollo Primary Colors */
--apollo-primary: #73bed3;    /* Bright Teal */
--apollo-secondary: #a8ca58;  /* Light Green */
--apollo-accent: #de9e41;     /* Orange */
--apollo-background: #090a14; /* Deep Black */
--apollo-text: #ebede9;       /* Off White */
```

### Syntax Highlighting

Here's how different code elements are colored:

```javascript
// Keywords and control flow - Blue (#4f8fba)
const apolloTheme = {
  // Strings - Green (#a8ca58)
  name: "Apollo Dark",
  
  // Numbers - Purple (#c65197)
  version: 1.0,
  
  // Booleans - Light Purple (#df84a5)
  isActive: true,
  
  // Comments - Muted Gray (#577277)
  /* This is a comment */
  
  // Functions - Warm Yellow (#e8c170)
  applyTheme() {
    return "Theme applied!";
  }
};
```

### Color Groups in Detail

#### Blues and Teals 🔵
- `#172038` - Darkest Blue (backgrounds)
- `#253a5e` - Dark Blue (selections)
- `#3c5e8b` - Medium Blue (borders)
- `#4f8fba` - Light Blue (keywords)
- `#73bed3` - Bright Teal (primary accent)
- `#a4dddb` - Lightest Teal (variables)

#### Greens 🟢
- `#19332d` - Darkest Green
- `#25562e` - Dark Green
- `#468232` - Medium Green
- `#75a743` - Bright Green (success)
- `#a8ca58` - Light Green (strings)
- `#d0da91` - Lightest Green (escape chars)

## Language Support

### Fully Supported Languages

- [x] **JavaScript/TypeScript** - Complete semantic highlighting
- [x] **HTML** - Tags, attributes, content distinction
- [x] **CSS/SCSS/Less** - Selectors, properties, values
- [x] **JSON/JSONC** - Keys, values, structure
- [x] **Markdown** - Headers, links, code blocks, emphasis
- [x] **Python** - Full syntax support
- [x] **PHP** - Complete coverage
- [x] **Vue** - Template and script sections
- [x] **React/JSX** - Component highlighting

### Code Examples

#### JavaScript/TypeScript
```typescript
interface ApolloConfig {
  theme: 'dark' | 'light';
  colors: Record<string, string>;
}

class ThemeManager implements ApolloConfig {
  constructor(public theme: ApolloConfig['theme']) {}
  
  async loadColors(): Promise<void> {
    // Implementation here
  }
}
```

#### HTML
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Apollo Theme Demo</title>
</head>
<body class="apollo-dark">
  <h1 id="title">Welcome to Apollo</h1>
  <p data-theme="dark">Retro pixel art aesthetic</p>
</body>
</html>
```

#### CSS
```css
.apollo-theme {
  --primary: #73bed3;
  --secondary: #a8ca58;
  
  background: linear-gradient(135deg, #090a14, #151d28);
  color: #ebede9;
  font-family: 'Fira Code', monospace;
}

.highlight {
  background-color: var(--primary);
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
}
```

## Configuration

### Basic Setup

Add these settings to your VS Code `settings.json`:

```json
{
  "workbench.colorTheme": "Apollo Dark",
  "editor.fontFamily": "'Fira Code', 'Cascadia Code', monospace",
  "editor.fontLigatures": true,
  "editor.semanticHighlighting.enabled": true
}
```

### Custom Color Overrides

```json
{
  "workbench.colorCustomizations": {
    "[Apollo Dark]": {
      "editor.background": "#0a0b15",
      "sideBar.background": "#0f131e"
    }
  },
  "editor.tokenColorCustomizations": {
    "[Apollo Dark]": {
      "comments": "#6a7d82",
      "strings": "#b5d668"
    }
  }
}
```

### Recommended Extensions

These extensions work great with Apollo Theme:

1. **Bracket Pair Colorizer** - Enhanced bracket highlighting
2. **Indent Rainbow** - Colorful indentation guides  
3. **GitLens** - Git integration with Apollo colors
4. **Material Icon Theme** - Complementary file icons

## Contributing

We welcome contributions! Here's how you can help:

### Development Setup

```bash
# Clone the repository
git clone https://github.com/lufutu/apollo-vscode-theme.git
cd apollo-vscode-theme/apollo-theme

# Install dependencies
npm install

# Run tests
npm test

# Package extension
npm run package
```

### Testing

Run our comprehensive test suite:

```bash
npm run test:all          # All tests
npm run test:contrast     # Contrast validation
npm run test:validation   # Theme structure
npm run test:installation # Installation process
```

### Submitting Changes

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm run test:all`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style

- Use TypeScript for new code
- Follow existing color naming conventions
- Add tests for new features
- Update documentation as needed

## Changelog

### Version 1.0.0 (2024-01-15)

#### Added ✨
- Initial release with dual theme support
- Complete 48-color Apollo palette
- Comprehensive syntax highlighting for 15+ languages
- Semantic token support
- Accessibility compliance (WCAG AA)
- Automated test suite

#### Features 🚀
- Dark and light theme variants
- Retro pixel art aesthetic
- Cross-platform compatibility
- Performance optimizations

## License

MIT License - see [LICENSE](LICENSE) for details.

## Support

- 🐛 **Issues**: [GitHub Issues](https://github.com/lufutu/apollo-vscode-theme/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/lufutu/apollo-vscode-theme/discussions)
- 🌟 **Rate**: [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=lufutu.apollo-theme)

---

**Made with ❤️ by the Apollo Theme Team**

> *"Bringing retro aesthetics to modern development"*

### Quick Links

- [📦 VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=lufutu.apollo-theme)
- [🐙 GitHub Repository](https://github.com/lufutu/apollo-vscode-theme)
- [🎨 Color Palette Reference](https://github.com/lufutu/apollo-vscode-theme/blob/main/src/colors.ts)

### Community

Join our community of developers who love retro aesthetics:

- [Discord Server](https://discord.gg/apollo-theme)
- [Reddit Community](https://reddit.com/r/apollotheme)
- [Twitter](https://twitter.com/apollo_theme)

**Happy coding with Apollo! 🚀✨**