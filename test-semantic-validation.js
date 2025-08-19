/**
 * Validation script for Apollo Dark theme semantic token support
 * This script checks if the theme JSON structure is valid and contains semantic token definitions
 */

const fs = require('fs');
const path = require('path');

function validateThemeStructure() {
  try {
    // Read the Apollo Dark theme file
    const themePath = path.join(__dirname, 'themes', 'apollo-dark-color-theme.json');
    const themeContent = fs.readFileSync(themePath, 'utf8');
    const theme = JSON.parse(themeContent);

    console.log('🎨 Apollo Dark Theme Validation');
    console.log('================================');

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

    console.log('\n🎉 Theme validation completed successfully!');
    console.log('The Apollo Dark theme now supports semantic token highlighting.');
    
    return true;

  } catch (error) {
    console.error('✗ Theme validation failed:', error.message);
    return false;
  }
}

function isValidHexColor(color) {
  return /^#[0-9A-Fa-f]{6}$/.test(color);
}

// Run validation
if (require.main === module) {
  const isValid = validateThemeStructure();
  process.exit(isValid ? 0 : 1);
}

module.exports = { validateThemeStructure };