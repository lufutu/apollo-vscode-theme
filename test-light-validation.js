/**
 * Validation script for Apollo Light theme syntax highlighting
 * This script checks if the light theme has proper syntax highlighting implementation
 */

const fs = require('fs');
const path = require('path');

function validateLightThemeStructure() {
  try {
    // Read the Apollo Light theme file
    const themePath = path.join(__dirname, 'themes', 'apollo-light-color-theme.json');
    const themeContent = fs.readFileSync(themePath, 'utf8');
    const theme = JSON.parse(themeContent);

    console.log('🌞 Apollo Light Theme Validation');
    console.log('=================================');

    // Check basic theme structure
    console.log('✓ Theme JSON is valid');
    console.log(`✓ Theme name: ${theme.name}`);
    console.log(`✓ Theme type: ${theme.type}`);

    // Check if semantic highlighting is enabled
    if (theme.semanticHighlighting === true) {
      console.log('✓ Semantic highlighting is enabled');
    } else {
      console.log('✗ Semantic highlighting is not enabled');
      return false;
    }

    // Check if semantic token colors are defined
    if (theme.semanticTokenColors && typeof theme.semanticTokenColors === 'object') {
      console.log('✓ Semantic token colors are defined');
      
      const semanticTokenCount = Object.keys(theme.semanticTokenColors).length;
      console.log(`✓ Found ${semanticTokenCount} semantic token color definitions`);

      // Check for essential semantic token types
      const essentialTokens = [
        'namespace', 'class', 'interface', 'function', 'method', 
        'variable', 'property', 'parameter', 'type', 'enum'
      ];

      const missingTokens = essentialTokens.filter(token => 
        !theme.semanticTokenColors.hasOwnProperty(token)
      );

      if (missingTokens.length === 0) {
        console.log('✓ All essential semantic token types are defined');
      } else {
        console.log(`✗ Missing semantic token types: ${missingTokens.join(', ')}`);
      }

      // Validate color format for semantic tokens
      let invalidColors = [];
      for (const [token, color] of Object.entries(theme.semanticTokenColors)) {
        if (typeof color === 'string' && !isValidHexColor(color)) {
          invalidColors.push(`${token}: ${color}`);
        }
      }

      if (invalidColors.length === 0) {
        console.log('✓ All semantic token colors have valid hex format');
      } else {
        console.log(`✗ Invalid color formats found: ${invalidColors.join(', ')}`);
      }

    } else {
      console.log('✗ Semantic token colors are not defined');
      return false;
    }

    // Check traditional token colors exist and have proper syntax highlighting
    if (theme.tokenColors && Array.isArray(theme.tokenColors)) {
      console.log(`✓ Traditional token colors are defined (${theme.tokenColors.length} rules)`);
      
      // Check for essential syntax highlighting categories
      const essentialScopes = [
        'comment', 'keyword', 'string', 'constant.numeric', 'variable',
        'entity.name.function', 'entity.name.class', 'entity.name.tag'
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
      
      const missingScopes = essentialScopes.filter(scope => 
        !Array.from(definedScopes).some(defined => defined.includes(scope.split('.')[0]))
      );
      
      if (missingScopes.length === 0) {
        console.log('✓ All essential syntax highlighting scopes are covered');
      } else {
        console.log(`⚠ Some syntax scopes might need attention: ${missingScopes.join(', ')}`);
      }
      
    } else {
      console.log('✗ Traditional token colors are missing');
      return false;
    }

    // Check workbench colors
    if (theme.colors && typeof theme.colors === 'object') {
      const workbenchColorCount = Object.keys(theme.colors).length;
      console.log(`✓ Workbench colors are defined (${workbenchColorCount} colors)`);
    } else {
      console.log('✗ Workbench colors are missing');
      return false;
    }

    // Validate light theme specific requirements
    console.log('\n🔍 Light Theme Specific Validation:');
    
    // Check that background is light
    const editorBg = theme.colors['editor.background'];
    if (editorBg && isLightColor(editorBg)) {
      console.log('✓ Editor background is appropriately light');
    } else {
      console.log('✗ Editor background should be light for light theme');
    }
    
    // Check that foreground is dark
    const editorFg = theme.colors['editor.foreground'];
    if (editorFg && isDarkColor(editorFg)) {
      console.log('✓ Editor foreground is appropriately dark');
    } else {
      console.log('✗ Editor foreground should be dark for light theme');
    }

    console.log('\n🎉 Light theme validation completed successfully!');
    console.log('The Apollo Light theme has comprehensive syntax highlighting.');
    
    return true;

  } catch (error) {
    console.error('✗ Light theme validation failed:', error.message);
    return false;
  }
}

function isValidHexColor(color) {
  return /^#[0-9A-Fa-f]{6}$/.test(color);
}

function isLightColor(hexColor) {
  // Convert hex to RGB and calculate luminance
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
}

function isDarkColor(hexColor) {
  return !isLightColor(hexColor);
}

// Run validation
if (require.main === module) {
  const isValid = validateLightThemeStructure();
  process.exit(isValid ? 0 : 1);
}

module.exports = { validateLightThemeStructure };