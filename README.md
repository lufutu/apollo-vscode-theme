# Apollo Theme for VS Code

A retro pixel art color theme that brings the nostalgic Apollo color palette to your VS Code editor. Experience a visually appealing coding environment with carefully selected colors that reduce eye strain while maintaining excellent readability and code distinction.

![Apollo Theme Preview](https://raw.githubusercontent.com/lufutu/apollo-vscode-theme/main/assets/preview-dark.png)

## Features

- **Dual Theme Support**: Both dark and light variants using the same Apollo color palette
- **Comprehensive Syntax Highlighting**: Optimized for JavaScript, TypeScript, HTML, CSS, JSON, Markdown, and more
- **Semantic Token Support**: Enhanced highlighting with language server integration
- **Accessibility Focused**: Carefully tested contrast ratios for comfortable extended coding sessions
- **Retro Aesthetic**: 48-color Apollo palette inspired by classic pixel art games
- **Complete UI Coverage**: All VS Code interface elements styled with cohesive Apollo colors

## Installation

### From VS Code Marketplace (Recommended)

1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for "Apollo Theme"
4. Click "Install"
5. Go to Settings → Color Theme and select "Apollo Dark" or "Apollo Light"

### Manual Installation

1. Download the latest `.vsix` file from [Releases](https://github.com/lufutu/apollo-vscode-theme/releases)
2. Open VS Code
3. Press `Ctrl+Shift+P` / `Cmd+Shift+P` to open Command Palette
4. Type "Extensions: Install from VSIX"
5. Select the downloaded `.vsix` file
6. Restart VS Code
7. Go to Settings → Color Theme and select "Apollo Dark" or "Apollo Light"

### From Source

```bash
git clone https://github.com/lufutu/apollo-vscode-theme.git
cd apollo-vscode-theme/apollo-theme
npm install -g @vscode/vsce
vsce package
code --install-extension apollo-theme-1.0.0.vsix
```

## Theme Variants

### Apollo Dark
Perfect for low-light environments and extended coding sessions. Features dark backgrounds with bright, vibrant syntax highlighting.

![Apollo Dark Theme](https://raw.githubusercontent.com/lufutu/apollo-vscode-theme/main/assets/preview-dark.png)

### Apollo Light  
Ideal for well-lit environments and daytime coding. Uses light backgrounds with carefully adjusted contrast for optimal readability.

![Apollo Light Theme](https://raw.githubusercontent.com/lufutu/apollo-vscode-theme/main/assets/preview-light.png)

## Color Palette

The Apollo theme uses a carefully curated 48-color palette organized into thematic groups:

### Primary Colors
- **Blues/Teals**: `#172038` → `#a4dddb` (6 shades)
- **Greens**: `#19332d` → `#d0da91` (6 shades)  
- **Browns/Oranges**: `#4d2b32` → `#e7d5b3` (6 shades)
- **Warm Tones**: `#341c27` → `#e8c170` (6 shades)
- **Purples/Magentas**: `#241527` → `#da863e` (6 shades)
- **Deep Purples**: `#1e1d39` → `#df84a5` (6 shades)
- **Grayscale**: `#090a14` → `#ebede9` (10 shades)

### Syntax Highlighting Colors

| Element | Dark Theme | Light Theme |
|---------|------------|-------------|
| Keywords | `#4f8fba` | `#3c5e8b` |
| Strings | `#a8ca58` | `#468232` |
| Comments | `#577277` | `#394a50` |
| Variables | `#a4dddb` | `#253a5e` |
| Functions | `#e8c170` | `#884b2b` |
| Classes | `#da863e` | `#752438` |
| Numbers | `#c65197` | `#7a367b` |
| Operators | `#a8b5b2` | `#202e37` |

## Language Support

The Apollo theme provides optimized syntax highlighting for:

- **JavaScript/TypeScript**: Enhanced semantic highlighting, clear distinction between types and values
- **HTML**: Distinct colors for tags, attributes, and content
- **CSS/SCSS/Less**: Comprehensive support for selectors, properties, and values
- **JSON**: Clear key-value distinction with proper nesting visualization
- **Markdown**: Beautiful formatting for headers, links, code blocks, and emphasis
- **Python**: Full syntax support with semantic highlighting
- **React/JSX**: Optimized for component-based development
- **Vue**: Template and script section highlighting
- **PHP**: Complete syntax coverage
- **And many more...**

## Accessibility

The Apollo theme prioritizes accessibility with:

- **WCAG AA Compliant**: All text meets minimum contrast ratio requirements (4.5:1)
- **Color Blind Friendly**: Tested with various color vision deficiencies
- **High Contrast Support**: Compatible with VS Code's high contrast mode
- **Reduced Eye Strain**: Carefully balanced colors for extended coding sessions

## Customization

You can customize the theme by adding overrides to your VS Code settings:

```json
{
  "workbench.colorCustomizations": {
    "[Apollo Dark]": {
      "editor.background": "#0a0b15"
    }
  },
  "editor.tokenColorCustomizations": {
    "[Apollo Dark]": {
      "comments": "#6a7d82"
    }
  }
}
```

## Screenshots

### JavaScript/TypeScript
![JavaScript Example](https://raw.githubusercontent.com/lufutu/apollo-vscode-theme/main/assets/screenshot-js.png)

### HTML/CSS
![HTML/CSS Example](https://raw.githubusercontent.com/lufutu/apollo-vscode-theme/main/assets/screenshot-html.png)

### JSON
![JSON Example](https://raw.githubusercontent.com/lufutu/apollo-vscode-theme/main/assets/screenshot-json.png)

### Markdown
![Markdown Example](https://raw.githubusercontent.com/lufutu/apollo-vscode-theme/main/assets/screenshot-md.png)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Clone the repository
2. Open in VS Code
3. Install dependencies: `npm install`
4. Run tests: `npm test`
5. Make your changes
6. Test thoroughly with `npm run test:all`
7. Submit a pull request

### Testing

The theme includes comprehensive automated tests:

```bash
npm run test:all          # Run all tests
npm run test:contrast     # Test contrast ratios
npm run test:validation   # Validate theme structure
npm run test:installation # Test installation process
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed history of changes.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Credits

- **Apollo Color Palette**: Inspired by classic pixel art aesthetics
- **Theme Development**: lufutu
- **Community**: Thanks to all contributors and users providing feedback

## Support

- **Issues**: [GitHub Issues](https://github.com/lufutu/apollo-vscode-theme/issues)
- **Discussions**: [GitHub Discussions](https://github.com/lufutu/apollo-vscode-theme/discussions)

## Related

- [Apollo Color Palette Documentation](https://github.com/lufutu/apollo-vscode-theme/blob/main/src/colors.ts)

---

**Enjoy coding with the Apollo theme!** ✨

If you like this theme, please consider:
- ⭐ Starring the repository
- 📝 Leaving a review on the VS Code Marketplace
- 🐛 Reporting issues or suggesting improvements
- 💝 Sharing with fellow developers