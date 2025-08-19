/**
 * Comprehensive Test Suite for Apollo VS Code Theme
 * 
 * This test suite validates:
 * - Theme JSON structure and color format compliance
 * - Syntax highlighting with various programming languages
 * - Contrast ratio validation for accessibility compliance
 * - Theme loading and activation functionality
 * 
 * Requirements: 4.1, 4.2, 4.3, 4.4, 6.3
 */

const fs = require('fs');
const path = require('path');

class ApolloThemeTestSuite {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0,
      tests: []
    };
  }

  // Main test runner
  async runAllTests() {
    console.log('🚀 Apollo Theme Comprehensive Test Suite');
    console.log('=========================================\n');

    try {
      // Test 1: Theme JSON Structure Validation
      await this.testThemeStructure();
      
      // Test 2: Color Format Compliance
      await this.testColorFormatCompliance();
      
      // Test 3: Syntax Highlighting Validation
      await this.testSyntaxHighlighting();
      
      // Test 4: Contrast Ratio Accessibility
      await this.testContrastRatios();
      
      // Test 5: Theme Loading Functionality
      await this.testThemeLoading();
      
      // Test 6: Cross-theme Consistency
      await this.testCrossThemeConsistency();

      this.printSummary();
      return this.results.failed === 0;

    } catch (error) {
      this.logError('Test Suite Execution', error.message);
      return false;
    }
  }

  // Test 1: Theme JSON Structure Validation
  async testThemeStructure() {
    console.log('📋 Test 1: Theme JSON Structure Validation');
    console.log('-------------------------------------------');

    const themes = ['apollo-dark-color-theme.json', 'apollo-light-color-theme.json'];
    
    for (const themeFile of themes) {
      try {
        const themePath = path.join(__dirname, 'themes', themeFile);
        const themeContent = fs.readFileSync(themePath, 'utf8');
        const theme = JSON.parse(themeContent);

        // Required properties
        const requiredProps = ['name', 'type', 'colors', 'tokenColors'];
        const missingProps = requiredProps.filter(prop => !theme.hasOwnProperty(prop));
        
        if (missingProps.length === 0) {
          this.logPass(`${themeFile}: All required properties present`);
        } else {
          this.logFail(`${themeFile}: Missing properties: ${missingProps.join(', ')}`);
        }

        // Validate theme type
        if (['dark', 'light'].includes(theme.type)) {
          this.logPass(`${themeFile}: Valid theme type (${theme.type})`);
        } else {
          this.logFail(`${themeFile}: Invalid theme type: ${theme.type}`);
        }

        // Validate semantic highlighting
        if (theme.semanticHighlighting === true && theme.semanticTokenColors) {
          this.logPass(`${themeFile}: Semantic highlighting properly configured`);
        } else {
          this.logWarning(`${themeFile}: Semantic highlighting not fully configured`);
        }

        // Validate workbench colors count
        const workbenchColorCount = Object.keys(theme.colors).length;
        if (workbenchColorCount >= 100) {
          this.logPass(`${themeFile}: Comprehensive workbench colors (${workbenchColorCount})`);
        } else {
          this.logWarning(`${themeFile}: Limited workbench colors (${workbenchColorCount})`);
        }

        // Validate token colors count
        if (theme.tokenColors.length >= 30) {
          this.logPass(`${themeFile}: Comprehensive syntax highlighting (${theme.tokenColors.length} rules)`);
        } else {
          this.logWarning(`${themeFile}: Limited syntax highlighting (${theme.tokenColors.length} rules)`);
        }

      } catch (error) {
        this.logFail(`${themeFile}: JSON parsing failed - ${error.message}`);
      }
    }
    console.log('');
  }

  // Test 2: Color Format Compliance
  async testColorFormatCompliance() {
    console.log('🎨 Test 2: Color Format Compliance');
    console.log('----------------------------------');

    const themes = ['apollo-dark-color-theme.json', 'apollo-light-color-theme.json'];
    
    for (const themeFile of themes) {
      try {
        const themePath = path.join(__dirname, 'themes', themeFile);
        const theme = JSON.parse(fs.readFileSync(themePath, 'utf8'));

        let invalidColors = [];

        // Check workbench colors
        for (const [key, color] of Object.entries(theme.colors)) {
          if (typeof color === 'string' && !this.isValidColor(color)) {
            invalidColors.push(`workbench.${key}: ${color}`);
          }
        }

        // Check token colors
        theme.tokenColors.forEach((rule, index) => {
          if (rule.settings && rule.settings.foreground && !this.isValidColor(rule.settings.foreground)) {
            invalidColors.push(`tokenColors[${index}].foreground: ${rule.settings.foreground}`);
          }
          if (rule.settings && rule.settings.background && !this.isValidColor(rule.settings.background)) {
            invalidColors.push(`tokenColors[${index}].background: ${rule.settings.background}`);
          }
        });

        // Check semantic token colors
        if (theme.semanticTokenColors) {
          for (const [token, color] of Object.entries(theme.semanticTokenColors)) {
            if (typeof color === 'string' && !this.isValidColor(color)) {
              invalidColors.push(`semanticTokenColors.${token}: ${color}`);
            }
          }
        }

        if (invalidColors.length === 0) {
          this.logPass(`${themeFile}: All colors have valid format`);
        } else {
          this.logFail(`${themeFile}: Invalid color formats found:`);
          invalidColors.forEach(invalid => console.log(`    ❌ ${invalid}`));
        }

      } catch (error) {
        this.logFail(`${themeFile}: Color validation failed - ${error.message}`);
      }
    }
    console.log('');
  }

  // Test 3: Syntax Highlighting Validation
  async testSyntaxHighlighting() {
    console.log('💻 Test 3: Syntax Highlighting Validation');
    console.log('------------------------------------------');

    // Create test files for different languages
    const testFiles = {
      'test-syntax.js': this.getJavaScriptTestContent(),
      'test-syntax.ts': this.getTypeScriptTestContent(),
      'test-syntax.html': this.getHTMLTestContent(),
      'test-syntax.css': this.getCSSTestContent(),
      'test-syntax.json': this.getJSONTestContent(),
      'test-syntax.md': this.getMarkdownTestContent()
    };

    // Ensure test files exist
    for (const [filename, content] of Object.entries(testFiles)) {
      const filePath = path.join(__dirname, filename);
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content);
        this.logPass(`Created test file: ${filename}`);
      } else {
        this.logPass(`Test file exists: ${filename}`);
      }
    }

    // Validate syntax highlighting coverage
    const themes = ['apollo-dark-color-theme.json', 'apollo-light-color-theme.json'];
    
    for (const themeFile of themes) {
      try {
        const themePath = path.join(__dirname, 'themes', themeFile);
        const theme = JSON.parse(fs.readFileSync(themePath, 'utf8'));

        const essentialScopes = [
          'comment', 'keyword', 'string', 'constant.numeric', 'variable',
          'entity.name.function', 'entity.name.class', 'entity.name.tag',
          'support.type.property-name', 'markup.heading', 'markup.bold'
        ];

        const definedScopes = new Set();
        theme.tokenColors.forEach(rule => {
          if (rule.scope) {
            if (Array.isArray(rule.scope)) {
              rule.scope.forEach(scope => definedScopes.add(scope));
            } else {
              definedScopes.add(rule.scope);
            }
          }
        });

        const coveredScopes = essentialScopes.filter(scope => 
          Array.from(definedScopes).some(defined => defined.includes(scope.split('.')[0]))
        );

        if (coveredScopes.length === essentialScopes.length) {
          this.logPass(`${themeFile}: All essential syntax scopes covered`);
        } else {
          const missingScopes = essentialScopes.filter(scope => !coveredScopes.includes(scope));
          this.logWarning(`${themeFile}: Missing scopes: ${missingScopes.join(', ')}`);
        }

      } catch (error) {
        this.logFail(`${themeFile}: Syntax highlighting validation failed - ${error.message}`);
      }
    }
    console.log('');
  }

  // Test 4: Contrast Ratio Accessibility
  async testContrastRatios() {
    console.log('♿ Test 4: Contrast Ratio Accessibility');
    console.log('---------------------------------------');

    const themes = [
      { file: 'apollo-dark-color-theme.json', name: 'Apollo Dark' },
      { file: 'apollo-light-color-theme.json', name: 'Apollo Light' }
    ];

    for (const { file: themeFile, name: themeName } of themes) {
      try {
        const themePath = path.join(__dirname, 'themes', themeFile);
        const theme = JSON.parse(fs.readFileSync(themePath, 'utf8'));

        const backgroundColor = theme.colors['editor.background'];
        const foregroundColor = theme.colors['editor.foreground'];
        
        // Test main editor contrast
        const mainContrast = this.calculateContrastRatio(backgroundColor, foregroundColor);
        if (mainContrast >= 4.5) {
          this.logPass(`${themeName}: Main editor contrast ${mainContrast.toFixed(2)}:1 (AA compliant)`);
        } else if (mainContrast >= 3) {
          this.logWarning(`${themeName}: Main editor contrast ${mainContrast.toFixed(2)}:1 (AA Large only)`);
        } else {
          this.logFail(`${themeName}: Main editor contrast ${mainContrast.toFixed(2)}:1 (Below AA standards)`);
        }

        // Test syntax highlighting contrast
        let lowContrastCount = 0;
        let totalColors = 0;

        theme.tokenColors.forEach(rule => {
          if (rule.settings && rule.settings.foreground) {
            totalColors++;
            const contrast = this.calculateContrastRatio(backgroundColor, rule.settings.foreground);
            if (contrast < 3) {
              lowContrastCount++;
            }
          }
        });

        const contrastPercentage = ((totalColors - lowContrastCount) / totalColors * 100).toFixed(1);
        if (lowContrastCount === 0) {
          this.logPass(`${themeName}: All syntax colors meet minimum contrast (${contrastPercentage}%)`);
        } else {
          this.logWarning(`${themeName}: ${lowContrastCount}/${totalColors} syntax colors below 3:1 contrast (${contrastPercentage}% compliant)`);
        }

      } catch (error) {
        this.logFail(`${themeFile}: Contrast validation failed - ${error.message}`);
      }
    }
    console.log('');
  }

  // Test 5: Theme Loading Functionality
  async testThemeLoading() {
    console.log('⚙️  Test 5: Theme Loading Functionality');
    console.log('--------------------------------------');

    try {
      // Test package.json configuration
      const packagePath = path.join(__dirname, 'package.json');
      const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

      // Validate extension configuration
      if (packageContent.contributes && packageContent.contributes.themes) {
        const themes = packageContent.contributes.themes;
        
        if (themes.length === 2) {
          this.logPass('Package.json: Both themes configured');
        } else {
          this.logFail(`Package.json: Expected 2 themes, found ${themes.length}`);
        }

        // Validate theme paths
        themes.forEach(theme => {
          const themePath = path.join(__dirname, theme.path);
          if (fs.existsSync(themePath)) {
            this.logPass(`Theme file exists: ${theme.path}`);
          } else {
            this.logFail(`Theme file missing: ${theme.path}`);
          }

          // Validate UI theme mapping
          const expectedUITheme = theme.label.includes('Dark') ? 'vs-dark' : 'vs';
          if (theme.uiTheme === expectedUITheme) {
            this.logPass(`${theme.label}: Correct UI theme mapping (${theme.uiTheme})`);
          } else {
            this.logFail(`${theme.label}: Incorrect UI theme mapping (${theme.uiTheme})`);
          }
        });

      } else {
        this.logFail('Package.json: Theme contributions not found');
      }

      // Validate VS Code engine compatibility
      if (packageContent.engines && packageContent.engines.vscode) {
        this.logPass(`VS Code engine compatibility: ${packageContent.engines.vscode}`);
      } else {
        this.logFail('Package.json: VS Code engine compatibility not specified');
      }

    } catch (error) {
      this.logFail(`Theme loading validation failed: ${error.message}`);
    }
    console.log('');
  }

  // Test 6: Cross-theme Consistency
  async testCrossThemeConsistency() {
    console.log('🔄 Test 6: Cross-theme Consistency');
    console.log('----------------------------------');

    try {
      const darkTheme = JSON.parse(fs.readFileSync(path.join(__dirname, 'themes', 'apollo-dark-color-theme.json'), 'utf8'));
      const lightTheme = JSON.parse(fs.readFileSync(path.join(__dirname, 'themes', 'apollo-light-color-theme.json'), 'utf8'));

      // Test accent color consistency
      const accentColors = ['73bed3', 'a8ca58', 'de9e41', 'cf573c', '4f8fba', '75a743'];
      let consistentAccents = 0;

      accentColors.forEach(color => {
        const darkHasColor = JSON.stringify(darkTheme).includes(color);
        const lightHasColor = JSON.stringify(lightTheme).includes(color);
        
        if (darkHasColor && lightHasColor) {
          consistentAccents++;
        }
      });

      if (consistentAccents >= accentColors.length * 0.8) {
        this.logPass(`Accent color consistency: ${consistentAccents}/${accentColors.length} colors shared`);
      } else {
        this.logWarning(`Accent color consistency: Only ${consistentAccents}/${accentColors.length} colors shared`);
      }

      // Test structure consistency
      const darkKeys = new Set(Object.keys(darkTheme.colors));
      const lightKeys = new Set(Object.keys(lightTheme.colors));
      const commonKeys = new Set([...darkKeys].filter(key => lightKeys.has(key)));
      
      const consistencyPercentage = (commonKeys.size / Math.max(darkKeys.size, lightKeys.size) * 100).toFixed(1);
      
      if (consistencyPercentage >= 90) {
        this.logPass(`Workbench structure consistency: ${consistencyPercentage}%`);
      } else {
        this.logWarning(`Workbench structure consistency: ${consistencyPercentage}%`);
      }

      // Test semantic token consistency
      if (darkTheme.semanticTokenColors && lightTheme.semanticTokenColors) {
        const darkSemanticKeys = new Set(Object.keys(darkTheme.semanticTokenColors));
        const lightSemanticKeys = new Set(Object.keys(lightTheme.semanticTokenColors));
        const commonSemanticKeys = new Set([...darkSemanticKeys].filter(key => lightSemanticKeys.has(key)));
        
        const semanticConsistency = (commonSemanticKeys.size / Math.max(darkSemanticKeys.size, lightSemanticKeys.size) * 100).toFixed(1);
        
        if (semanticConsistency >= 90) {
          this.logPass(`Semantic token consistency: ${semanticConsistency}%`);
        } else {
          this.logWarning(`Semantic token consistency: ${semanticConsistency}%`);
        }
      }

    } catch (error) {
      this.logFail(`Cross-theme consistency validation failed: ${error.message}`);
    }
    console.log('');
  }

  // Helper methods
  isValidColor(color) {
    // Support hex colors with or without alpha
    return /^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(color);
  }

  calculateContrastRatio(color1, color2) {
    const luminance1 = this.calculateLuminance(color1);
    const luminance2 = this.calculateLuminance(color2);
    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  calculateLuminance(hexColor) {
    // Remove alpha channel if present
    const hex = hexColor.slice(0, 7);
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    
    const rLinear = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const gLinear = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const bLinear = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
    
    return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
  }

  // Test content generators
  getJavaScriptTestContent() {
    return `// JavaScript Test File for Syntax Highlighting
const apolloTheme = {
  name: "Apollo Theme",
  version: "1.0.0",
  colors: ["#172038", "#73bed3", "#a8ca58"]
};

function validateTheme(theme) {
  if (!theme || typeof theme !== 'object') {
    throw new Error('Invalid theme object');
  }
  
  return theme.colors.every(color => /^#[0-9A-Fa-f]{6}$/.test(color));
}

class ThemeManager {
  constructor(themes = []) {
    this.themes = themes;
    this.activeTheme = null;
  }
  
  async loadTheme(themeName) {
    try {
      const theme = this.themes.find(t => t.name === themeName);
      if (theme && validateTheme(theme)) {
        this.activeTheme = theme;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to load theme:', error.message);
      return false;
    }
  }
}

export { ThemeManager, validateTheme };
`;
  }

  getTypeScriptTestContent() {
    return `// TypeScript Test File for Syntax Highlighting
interface ThemeConfig {
  name: string;
  type: 'dark' | 'light';
  colors: Record<string, string>;
  tokenColors: TokenColor[];
}

interface TokenColor {
  name?: string;
  scope: string | string[];
  settings: {
    foreground?: string;
    background?: string;
    fontStyle?: 'bold' | 'italic' | 'underline';
  };
}

type ThemeType = 'dark' | 'light';
type ColorValue = \`#\${string}\`;

class ApolloTheme implements ThemeConfig {
  public readonly name: string;
  public readonly type: ThemeType;
  public colors: Record<string, ColorValue>;
  public tokenColors: TokenColor[];

  constructor(config: Partial<ThemeConfig>) {
    this.name = config.name ?? 'Apollo Theme';
    this.type = config.type ?? 'dark';
    this.colors = config.colors ?? {};
    this.tokenColors = config.tokenColors ?? [];
  }

  public validateColors(): boolean {
    return Object.values(this.colors).every(
      (color: ColorValue) => /^#[0-9A-Fa-f]{6}$/.test(color)
    );
  }

  public static createDarkTheme(): ApolloTheme {
    return new ApolloTheme({
      name: 'Apollo Dark',
      type: 'dark',
      colors: {
        'editor.background': '#090a14',
        'editor.foreground': '#ebede9'
      }
    });
  }
}

export { ApolloTheme, ThemeConfig, TokenColor };
`;
  }

  getHTMLTestContent() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Apollo Theme Test</title>
    <style>
        .apollo-theme {
            background-color: #090a14;
            color: #ebede9;
            font-family: 'Fira Code', monospace;
        }
        
        .syntax-highlight {
            background: #151d28;
            padding: 1rem;
            border-radius: 4px;
        }
    </style>
</head>
<body class="apollo-theme">
    <header>
        <h1>Apollo VS Code Theme</h1>
        <nav>
            <ul>
                <li><a href="#dark">Dark Theme</a></li>
                <li><a href="#light">Light Theme</a></li>
                <li><a href="#features">Features</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="dark">
            <h2>Dark Theme Preview</h2>
            <div class="syntax-highlight">
                <code>
                    const theme = { name: "Apollo Dark", type: "dark" };
                </code>
            </div>
        </section>
        
        <section id="light">
            <h2>Light Theme Preview</h2>
            <p>A beautiful light variant with excellent contrast.</p>
        </section>
        
        <form action="/submit" method="post">
            <label for="theme-name">Theme Name:</label>
            <input type="text" id="theme-name" name="themeName" required>
            
            <label for="theme-type">Theme Type:</label>
            <select id="theme-type" name="themeType">
                <option value="dark">Dark</option>
                <option value="light">Light</option>
            </select>
            
            <button type="submit">Apply Theme</button>
        </form>
    </main>
    
    <footer>
        <p>&copy; 2024 Apollo Theme. All rights reserved.</p>
    </footer>
</body>
</html>
`;
  }

  getCSSTestContent() {
    return `/* CSS Test File for Apollo Theme Syntax Highlighting */

:root {
  --apollo-dark-bg: #090a14;
  --apollo-dark-fg: #ebede9;
  --apollo-accent: #73bed3;
  --apollo-success: #75a743;
  --apollo-warning: #de9e41;
  --apollo-error: #cf573c;
}

/* Base styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Fira Code', 'Consolas', monospace;
  background-color: var(--apollo-dark-bg);
  color: var(--apollo-dark-fg);
  line-height: 1.6;
}

/* Layout components */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

/* Theme-specific styles */
.apollo-theme {
  background: linear-gradient(135deg, #172038 0%, #253a5e 100%);
  border: 2px solid var(--apollo-accent);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.apollo-theme:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 12px rgba(115, 190, 211, 0.2);
  transition: all 0.3s ease;
}

/* Syntax highlighting preview */
.code-block {
  background-color: #151d28;
  border-left: 4px solid var(--apollo-accent);
  padding: 1rem;
  font-family: inherit;
  overflow-x: auto;
}

.keyword { color: #4f8fba; }
.string { color: #a8ca58; }
.number { color: #c65197; }
.comment { color: #577277; font-style: italic; }
.function { color: #e8c170; }

/* Responsive design */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  
  .grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-color-scheme: light) {
  :root {
    --apollo-dark-bg: #ebede9;
    --apollo-dark-fg: #090a14;
  }
}

/* Animation keyframes */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.6s ease-out;
}
`;
  }

  getJSONTestContent() {
    return `{
  "name": "Apollo Theme Test Data",
  "version": "1.0.0",
  "description": "Test JSON file for Apollo theme syntax highlighting",
  "themes": [
    {
      "name": "Apollo Dark",
      "type": "dark",
      "colors": {
        "editor.background": "#090a14",
        "editor.foreground": "#ebede9",
        "editor.selectionBackground": "#253a5e"
      },
      "features": [
        "Comprehensive syntax highlighting",
        "Semantic token support",
        "Accessibility compliant",
        "Cross-platform compatibility"
      ],
      "metadata": {
        "author": "Apollo Theme Team",
        "created": "2024-01-01T00:00:00Z",
        "updated": "2024-01-15T12:30:00Z",
        "tags": ["dark", "retro", "pixel-art", "accessibility"],
        "stats": {
          "downloads": 1000,
          "rating": 4.8,
          "reviews": 42
        }
      }
    },
    {
      "name": "Apollo Light",
      "type": "light",
      "colors": {
        "editor.background": "#ebede9",
        "editor.foreground": "#090a14",
        "editor.selectionBackground": "#a4dddb"
      },
      "features": [
        "Light theme variant",
        "Consistent color logic",
        "High contrast ratios",
        "Eye-friendly colors"
      ],
      "metadata": {
        "author": "Apollo Theme Team",
        "created": "2024-01-01T00:00:00Z",
        "updated": "2024-01-15T12:30:00Z",
        "tags": ["light", "retro", "pixel-art", "accessibility"],
        "stats": {
          "downloads": 750,
          "rating": 4.6,
          "reviews": 28
        }
      }
    }
  ],
  "configuration": {
    "semanticHighlighting": true,
    "contrastRatio": {
      "minimum": 3.0,
      "preferred": 4.5,
      "target": "AA"
    },
    "supportedLanguages": [
      "javascript",
      "typescript",
      "html",
      "css",
      "json",
      "markdown",
      "python",
      "java",
      "c",
      "cpp"
    ]
  },
  "testing": {
    "automated": true,
    "contrastValidation": true,
    "crossPlatform": ["windows", "macos", "linux"],
    "vscodeVersions": ["^1.74.0"]
  }
}
`;
  }

  getMarkdownTestContent() {
    return `# Apollo VS Code Theme

A **retro pixel art** color theme for VS Code that brings nostalgic aesthetics to modern development.

## Features

- 🎨 **Comprehensive Color Palette**: 48 carefully selected colors from the Apollo palette
- 🌙 **Dark Theme**: Perfect for late-night coding sessions
- ☀️ **Light Theme**: Easy on the eyes during daytime work
- ♿ **Accessibility**: WCAG AA compliant contrast ratios
- 🔧 **Semantic Highlighting**: Enhanced TypeScript/JavaScript support

## Installation

### Via VS Code Marketplace

1. Open VS Code
2. Go to Extensions (\`Ctrl+Shift+X\`)
3. Search for "Apollo Theme"
4. Click **Install**

### Manual Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/lufutu/apollo-vscode-theme.git

# Install dependencies
cd apollo-vscode-theme
npm install

# Package the extension
npm run package
\`\`\`

## Color Palette

The Apollo theme uses a carefully curated palette of 48 colors:

| Color Group | Example Colors |
|-------------|----------------|
| **Blues/Teals** | \`#172038\`, \`#4f8fba\`, \`#73bed3\` |
| **Greens** | \`#25562e\`, \`#75a743\`, \`#a8ca58\` |
| **Browns/Oranges** | \`#7a4841\`, \`#be772b\`, \`#de9e41\` |
| **Purples** | \`#7a367b\`, \`#c65197\`, \`#df84a5\` |

## Syntax Highlighting

### JavaScript/TypeScript

\`\`\`javascript
// Keywords in blue
const apolloTheme = {
  name: "Apollo Dark",
  version: "1.0.0"
};

// Functions in yellow
function validateTheme(theme) {
  return theme && typeof theme === 'object';
}

// Classes in orange
class ThemeManager {
  constructor() {
    this.themes = [];
  }
}
\`\`\`

### CSS

\`\`\`css
/* Selectors in teal */
.apollo-theme {
  /* Properties in yellow */
  background-color: #090a14;
  color: #ebede9;
  
  /* Values in green */
  font-family: 'Fira Code', monospace;
}
\`\`\`

## Configuration

### Settings

You can customize the theme behavior in your VS Code settings:

\`\`\`json
{
  "workbench.colorTheme": "Apollo Dark",
  "editor.semanticHighlighting.enabled": true,
  "editor.bracketPairColorization.enabled": true
}
\`\`\`

### Recommended Extensions

- **Bracket Pair Colorizer**: Enhanced bracket highlighting
- **Indent Rainbow**: Better indentation visualization
- **Color Highlight**: Preview colors in your code

## Screenshots

### Dark Theme
![Apollo Dark Theme](./screenshots/apollo-dark.png)

### Light Theme
![Apollo Light Theme](./screenshots/apollo-light.png)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. **Fork** the repository
2. **Clone** your fork
3. **Install** dependencies: \`npm install\`
4. **Make** your changes
5. **Test** your changes: \`npm test\`
6. **Submit** a pull request

## Testing

The theme includes comprehensive automated tests:

- ✅ JSON structure validation
- ✅ Color format compliance
- ✅ Contrast ratio accessibility
- ✅ Syntax highlighting coverage
- ✅ Cross-platform compatibility

Run tests with:

\`\`\`bash
npm test
\`\`\`

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by retro pixel art aesthetics
- Built with accessibility in mind
- Community feedback and contributions

---

> **Note**: This theme is actively maintained and regularly updated based on user feedback and VS Code updates.

**Enjoy coding with Apollo! 🚀**
`;
  }

  // Logging methods
  logPass(message) {
    console.log(`✅ ${message}`);
    this.results.passed++;
    this.results.tests.push({ type: 'pass', message });
  }

  logFail(message) {
    console.log(`❌ ${message}`);
    this.results.failed++;
    this.results.tests.push({ type: 'fail', message });
  }

  logWarning(message) {
    console.log(`⚠️  ${message}`);
    this.results.warnings++;
    this.results.tests.push({ type: 'warning', message });
  }

  logError(context, message) {
    console.log(`💥 ${context}: ${message}`);
    this.results.failed++;
    this.results.tests.push({ type: 'error', message: `${context}: ${message}` });
  }

  printSummary() {
    console.log('📊 Test Summary');
    console.log('===============');
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`⚠️  Warnings: ${this.results.warnings}`);
    console.log(`📝 Total Tests: ${this.results.tests.length}`);
    
    const successRate = (this.results.passed / (this.results.passed + this.results.failed) * 100).toFixed(1);
    console.log(`📈 Success Rate: ${successRate}%`);
    
    if (this.results.failed === 0) {
      console.log('\n🎉 All tests passed! Apollo theme is ready for distribution.');
    } else {
      console.log('\n🔧 Some tests failed. Please review and fix the issues above.');
    }
  }
}

// Export for use in other modules
module.exports = { ApolloThemeTestSuite };

// Run tests if this file is executed directly
if (require.main === module) {
  const testSuite = new ApolloThemeTestSuite();
  testSuite.runAllTests().then(success => {
    process.exit(success ? 0 : 1);
  });
}