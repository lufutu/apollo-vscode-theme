/**
 * Apollo Theme Demo - JavaScript/TypeScript Example
 * Showcasing syntax highlighting with the Apollo color palette
 */

import { EventEmitter } from 'events';
import fs from 'fs/promises';

// Class definition with inheritance
class ApolloThemeManager extends EventEmitter {
  constructor(config = {}) {
    super();
    this.themes = new Map();
    this.activeTheme = null;
    this.config = {
      autoSave: true,
      darkMode: true,
      ...config
    };
  }

  // Async method with error handling
  async loadTheme(themeName) {
    try {
      const themePath = `./themes/${themeName}.json`;
      const themeData = await fs.readFile(themePath, 'utf8');
      const theme = JSON.parse(themeData);
      
      // Object destructuring and template literals
      const { name, colors, tokenColors } = theme;
      console.log(`Loading theme: ${name}`);
      
      // Map operations and arrow functions
      this.themes.set(themeName, {
        ...theme,
        loadedAt: new Date().toISOString(),
        isActive: false
      });
      
      this.emit('themeLoaded', { name, colors: colors.length });
      return theme;
    } catch (error) {
      console.error(`Failed to load theme ${themeName}:`, error.message);
      throw new Error(`Theme loading failed: ${error.message}`);
    }
  }

  // Method with multiple parameter types
  applyTheme(themeName, options = {}) {
    const theme = this.themes.get(themeName);
    
    if (!theme) {
      throw new Error(`Theme '${themeName}' not found`);
    }

    // Conditional logic and ternary operators
    const shouldAnimate = options.animate ?? this.config.autoAnimate;
    const duration = shouldAnimate ? (options.duration || 300) : 0;
    
    // Array methods and functional programming
    const colorKeys = Object.keys(theme.colors)
      .filter(key => key.startsWith('editor.'))
      .map(key => ({ key, value: theme.colors[key] }))
      .sort((a, b) => a.key.localeCompare(b.key));

    // Regular expressions and string manipulation
    const validColors = colorKeys.filter(({ value }) => 
      /^#[0-9A-Fa-f]{6}$/.test(value)
    );

    console.log(`Applying ${validColors.length} valid colors`);
    
    // Promise-based operations
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          this.activeTheme = themeName;
          this.updateUI(theme, duration);
          resolve({ success: true, theme: themeName });
        } catch (err) {
          reject(err);
        }
      }, duration);
    });
  }

  // Private method (convention)
  #validateTheme(theme) {
    const required = ['name', 'type', 'colors', 'tokenColors'];
    return required.every(prop => prop in theme);
  }

  // Static method
  static getDefaultConfig() {
    return {
      autoSave: true,
      darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
      animations: true,
      version: '1.0.0'
    };
  }

  // Getter and setter
  get themeCount() {
    return this.themes.size;
  }

  set defaultTheme(themeName) {
    if (this.themes.has(themeName)) {
      this.config.defaultTheme = themeName;
    }
  }
}

// Export and usage example
export default ApolloThemeManager;

// Async IIFE with top-level await
(async () => {
  const manager = new ApolloThemeManager({
    darkMode: true,
    autoSave: false
  });

  // Event listeners
  manager.on('themeLoaded', ({ name, colors }) => {
    console.log(`✅ Theme "${name}" loaded with ${colors} colors`);
  });

  // Error handling with try-catch
  try {
    await manager.loadTheme('apollo-dark');
    await manager.applyTheme('apollo-dark', { animate: true });
    
    console.log(`Active theme: ${manager.activeTheme}`);
    console.log(`Total themes: ${manager.themeCount}`);
  } catch (error) {
    console.error('Theme initialization failed:', error);
  }
})();

// Modern JavaScript features showcase
const apolloColors = {
  primary: '#73bed3',
  secondary: '#a8ca58',
  accent: '#de9e41',
  background: '#090a14',
  text: '#ebede9'
};

// Destructuring with rest operator
const { primary, secondary, ...otherColors } = apolloColors;

// Optional chaining and nullish coalescing
const themeConfig = {
  colors: apolloColors,
  name: 'Apollo Dark',
  author: 'Apollo Team'
};

const authorName = themeConfig?.author ?? 'Unknown';
const colorCount = Object.keys(themeConfig?.colors ?? {}).length;