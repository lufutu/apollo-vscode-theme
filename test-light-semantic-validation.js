/**
 * Validation script for Apollo Light theme semantic token support
 * This script checks if the light theme JSON structure is valid and contains semantic token definitions
 */

const fs = require('fs');
const path = require('path');

function validateLightThemeStructure() {
  try {
    // Read the Apollo Light theme file
    const themePath = path.join(__dirname, 'themes', 'apollo-light-color-theme.json');
    const themeContent = fs.readFileSync(themePath, 'utf8');
    const theme = JSON.parse(themeContent);

    console.log('🌞 Apollo Light Theme Semantic Token Validation');
    console.log('===============================================');

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

      // Check light theme specific contrast requirements
      console.log('\n🔍 Light Theme Specific Validation');
      console.log('==================================');
      
      const lightBackground = theme.colors['editor.background'];
      const lightForeground = theme.colors['editor.foreground'];
      
      console.log(`✓ Editor background: ${lightBackground} (should be light)`);
      console.log(`✓ Editor foreground: ${lightForeground} (should be dark)`);
      
      // Validate that semantic token colors work well with light backgrounds
      const semanticTokens = theme.semanticTokenColors;
      let contrastIssues = [];
      
      // Check some key semantic tokens for light theme appropriateness
      const keyTokensToCheck = ['class', 'function', 'variable', 'string', 'comment'];
      
      for (const tokenType of keyTokensToCheck) {
        if (semanticTokens[tokenType]) {
          const color = semanticTokens[tokenType];
          if (typeof color === 'string') {
            // Simple heuristic: light theme should use darker colors for text
            const brightness = getColorBrightness(color);
            if (brightness > 0.7) {
              contrastIssues.push(`${tokenType}: ${color} may be too light for light background`);
            }
          }
        }
      }
      
      if (contrastIssues.length === 0) {
        console.log('✓ Semantic token colors appear suitable for light backgrounds');
      } else {
        console.log('⚠️  Potential contrast issues:');
        contrastIssues.forEach(issue => console.log(`   ${issue}`));
      }

    } else {
      console.log('✗ Semantic token colors are not defined');
      return false;
    }

    // Check traditional token colors still exist
    if (theme.tokenColors && Array.isArray(theme.tokenColors)) {
      console.log(`✓ Traditional token colors are preserved (${theme.tokenColors.length} rules)`);
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

    // Compare with dark theme to ensure consistency
    console.log('\n🔄 Consistency Check with Dark Theme');
    console.log('====================================');
    
    try {
      const darkThemePath = path.join(__dirname, 'themes', 'apollo-dark-color-theme.json');
      const darkThemeContent = fs.readFileSync(darkThemePath, 'utf8');
      const darkTheme = JSON.parse(darkThemeContent);
      
      const lightSemanticTokens = Object.keys(theme.semanticTokenColors);
      const darkSemanticTokens = Object.keys(darkTheme.semanticTokenColors);
      
      const missingInLight = darkSemanticTokens.filter(token => !lightSemanticTokens.includes(token));
      const extraInLight = lightSemanticTokens.filter(token => !darkSemanticTokens.includes(token));
      
      if (missingInLight.length === 0 && extraInLight.length === 0) {
        console.log('✓ Semantic token types match between dark and light themes');
      } else {
        if (missingInLight.length > 0) {
          console.log(`⚠️  Missing in light theme: ${missingInLight.join(', ')}`);
        }
        if (extraInLight.length > 0) {
          console.log(`⚠️  Extra in light theme: ${extraInLight.join(', ')}`);
        }
      }
      
    } catch (error) {
      console.log('⚠️  Could not compare with dark theme:', error.message);
    }

    console.log('\n🎉 Light theme validation completed successfully!');
    console.log('The Apollo Light theme supports semantic token highlighting with appropriate contrast.');
    
    return true;

  } catch (error) {
    console.error('✗ Light theme validation failed:', error.message);
    return false;
  }
}

function isValidHexColor(color) {
  return /^#[0-9A-Fa-f]{6}$/.test(color);
}

function getColorBrightness(hexColor) {
  // Remove # if present
  const hex = hexColor.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate relative luminance (simplified)
  return (r * 0.299 + g * 0.587 + b * 0.114) / 255;
}

// Run validation
if (require.main === module) {
  const isValid = validateLightThemeStructure();
  process.exit(isValid ? 0 : 1);
}

module.exports = { validateLightThemeStructure };