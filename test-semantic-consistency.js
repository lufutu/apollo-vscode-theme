/**
 * Comprehensive test for semantic token consistency between Apollo Dark and Light themes
 * This script validates that both themes have matching semantic token support
 */

const fs = require('fs');
const path = require('path');

function testSemanticTokenConsistency() {
  console.log('🔄 Apollo Theme Semantic Token Consistency Test');
  console.log('===============================================\n');

  try {
    // Load both theme files
    const darkThemePath = path.join(__dirname, 'themes', 'apollo-dark-color-theme.json');
    const lightThemePath = path.join(__dirname, 'themes', 'apollo-light-color-theme.json');
    
    const darkTheme = JSON.parse(fs.readFileSync(darkThemePath, 'utf8'));
    const lightTheme = JSON.parse(fs.readFileSync(lightThemePath, 'utf8'));

    console.log(`📁 Dark Theme: ${darkTheme.name} (${darkTheme.type})`);
    console.log(`📁 Light Theme: ${lightTheme.name} (${lightTheme.type})\n`);

    let allTestsPassed = true;

    // Test 1: Both themes have semantic highlighting enabled
    console.log('🧪 Test 1: Semantic Highlighting Enabled');
    console.log('----------------------------------------');
    
    const darkSemanticEnabled = darkTheme.semanticHighlighting === true;
    const lightSemanticEnabled = lightTheme.semanticHighlighting === true;
    
    if (darkSemanticEnabled && lightSemanticEnabled) {
      console.log('✓ Both themes have semantic highlighting enabled');
    } else {
      console.log(`✗ Semantic highlighting status - Dark: ${darkSemanticEnabled}, Light: ${lightSemanticEnabled}`);
      allTestsPassed = false;
    }

    // Test 2: Both themes have semantic token colors defined
    console.log('\n🧪 Test 2: Semantic Token Colors Structure');
    console.log('------------------------------------------');
    
    const darkHasSemanticTokens = darkTheme.semanticTokenColors && typeof darkTheme.semanticTokenColors === 'object';
    const lightHasSemanticTokens = lightTheme.semanticTokenColors && typeof lightTheme.semanticTokenColors === 'object';
    
    if (darkHasSemanticTokens && lightHasSemanticTokens) {
      console.log('✓ Both themes have semantic token colors defined');
      
      const darkTokenCount = Object.keys(darkTheme.semanticTokenColors).length;
      const lightTokenCount = Object.keys(lightTheme.semanticTokenColors).length;
      
      console.log(`  Dark theme: ${darkTokenCount} semantic token definitions`);
      console.log(`  Light theme: ${lightTokenCount} semantic token definitions`);
      
      if (darkTokenCount === lightTokenCount) {
        console.log('✓ Both themes have the same number of semantic token definitions');
      } else {
        console.log('⚠️  Different number of semantic token definitions between themes');
      }
    } else {
      console.log(`✗ Semantic token colors missing - Dark: ${darkHasSemanticTokens}, Light: ${lightHasSemanticTokens}`);
      allTestsPassed = false;
    }

    // Test 3: Token type consistency
    console.log('\n🧪 Test 3: Semantic Token Type Consistency');
    console.log('------------------------------------------');
    
    if (darkHasSemanticTokens && lightHasSemanticTokens) {
      const darkTokenTypes = Object.keys(darkTheme.semanticTokenColors);
      const lightTokenTypes = Object.keys(lightTheme.semanticTokenColors);
      
      const missingInLight = darkTokenTypes.filter(type => !lightTokenTypes.includes(type));
      const missingInDark = lightTokenTypes.filter(type => !darkTokenTypes.includes(type));
      
      if (missingInLight.length === 0 && missingInDark.length === 0) {
        console.log('✓ Both themes have identical semantic token types');
      } else {
        if (missingInLight.length > 0) {
          console.log(`✗ Missing in light theme: ${missingInLight.join(', ')}`);
          allTestsPassed = false;
        }
        if (missingInDark.length > 0) {
          console.log(`✗ Missing in dark theme: ${missingInDark.join(', ')}`);
          allTestsPassed = false;
        }
      }
      
      // Check essential token types
      const essentialTypes = [
        'namespace', 'class', 'interface', 'function', 'method',
        'variable', 'property', 'parameter', 'type', 'enum',
        'string', 'number', 'comment', 'keyword', 'operator'
      ];
      
      const missingEssentialInDark = essentialTypes.filter(type => !darkTokenTypes.includes(type));
      const missingEssentialInLight = essentialTypes.filter(type => !lightTokenTypes.includes(type));
      
      if (missingEssentialInDark.length === 0 && missingEssentialInLight.length === 0) {
        console.log('✓ All essential semantic token types are present in both themes');
      } else {
        if (missingEssentialInDark.length > 0) {
          console.log(`✗ Essential types missing in dark theme: ${missingEssentialInDark.join(', ')}`);
          allTestsPassed = false;
        }
        if (missingEssentialInLight.length > 0) {
          console.log(`✗ Essential types missing in light theme: ${missingEssentialInLight.join(', ')}`);
          allTestsPassed = false;
        }
      }
    }

    // Test 4: Color format validation
    console.log('\n🧪 Test 4: Color Format Validation');
    console.log('-----------------------------------');
    
    let colorFormatIssues = [];
    
    // Check dark theme colors
    for (const [token, color] of Object.entries(darkTheme.semanticTokenColors)) {
      if (typeof color === 'string' && !isValidHexColor(color)) {
        colorFormatIssues.push(`Dark theme - ${token}: ${color}`);
      }
    }
    
    // Check light theme colors
    for (const [token, color] of Object.entries(lightTheme.semanticTokenColors)) {
      if (typeof color === 'string' && !isValidHexColor(color)) {
        colorFormatIssues.push(`Light theme - ${token}: ${color}`);
      }
    }
    
    if (colorFormatIssues.length === 0) {
      console.log('✓ All semantic token colors have valid hex format in both themes');
    } else {
      console.log('✗ Invalid color formats found:');
      colorFormatIssues.forEach(issue => console.log(`  ${issue}`));
      allTestsPassed = false;
    }

    // Test 5: Contrast appropriateness
    console.log('\n🧪 Test 5: Theme-Appropriate Contrast');
    console.log('-------------------------------------');
    
    const darkBg = darkTheme.colors['editor.background'];
    const lightBg = lightTheme.colors['editor.background'];
    
    console.log(`Dark theme background: ${darkBg}`);
    console.log(`Light theme background: ${lightBg}`);
    
    // Simple brightness check
    const darkBgBrightness = getColorBrightness(darkBg);
    const lightBgBrightness = getColorBrightness(lightBg);
    
    if (darkBgBrightness < 0.3 && lightBgBrightness > 0.7) {
      console.log('✓ Background colors are appropriate for their theme types');
    } else {
      console.log(`⚠️  Background brightness may not be optimal - Dark: ${darkBgBrightness.toFixed(2)}, Light: ${lightBgBrightness.toFixed(2)}`);
    }

    // Test 6: Modifier consistency
    console.log('\n🧪 Test 6: Semantic Token Modifier Consistency');
    console.log('----------------------------------------------');
    
    const darkModifiers = Object.keys(darkTheme.semanticTokenColors).filter(key => key.includes('.') || key.includes('*'));
    const lightModifiers = Object.keys(lightTheme.semanticTokenColors).filter(key => key.includes('.') || key.includes('*'));
    
    const modifiersMissingInLight = darkModifiers.filter(mod => !lightModifiers.includes(mod));
    const modifiersMissingInDark = lightModifiers.filter(mod => !darkModifiers.includes(mod));
    
    if (modifiersMissingInLight.length === 0 && modifiersMissingInDark.length === 0) {
      console.log('✓ Semantic token modifiers are consistent between themes');
      console.log(`  Found ${darkModifiers.length} modifier rules in each theme`);
    } else {
      if (modifiersMissingInLight.length > 0) {
        console.log(`✗ Modifiers missing in light theme: ${modifiersMissingInLight.join(', ')}`);
        allTestsPassed = false;
      }
      if (modifiersMissingInDark.length > 0) {
        console.log(`✗ Modifiers missing in dark theme: ${modifiersMissingInDark.join(', ')}`);
        allTestsPassed = false;
      }
    }

    // Final result
    console.log('\n' + '='.repeat(50));
    if (allTestsPassed) {
      console.log('🎉 All semantic token consistency tests passed!');
      console.log('Both Apollo Dark and Light themes have complete and consistent semantic token support.');
    } else {
      console.log('❌ Some semantic token consistency tests failed.');
      console.log('Please review the issues above and update the theme files accordingly.');
    }
    console.log('='.repeat(50));

    return allTestsPassed;

  } catch (error) {
    console.error('✗ Consistency test failed:', error.message);
    return false;
  }
}

function isValidHexColor(color) {
  return /^#[0-9A-Fa-f]{6}$/.test(color);
}

function getColorBrightness(hexColor) {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return (r * 0.299 + g * 0.587 + b * 0.114) / 255;
}

// Run the test
if (require.main === module) {
  const success = testSemanticTokenConsistency();
  process.exit(success ? 0 : 1);
}

module.exports = { testSemanticTokenConsistency };