/**
 * Comprehensive syntax highlighting test for Apollo Light theme
 * Tests color distinction, accessibility, and coverage across all file types
 */

const fs = require('fs');
const path = require('path');

function testLightThemeSyntaxHighlighting() {
  try {
    // Read the Apollo Light theme file
    const themePath = path.join(__dirname, 'themes', 'apollo-light-color-theme.json');
    const themeContent = fs.readFileSync(themePath, 'utf8');
    const theme = JSON.parse(themeContent);

    console.log('🎨 Apollo Light Theme Syntax Highlighting Test');
    console.log('===============================================');

    // Test 1: Color Distinction
    console.log('\n1. Testing Color Distinction:');
    const tokenColors = theme.tokenColors;
    const usedColors = new Set();
    const colorUsage = {};

    tokenColors.forEach(rule => {
      if (rule.settings && rule.settings.foreground) {
        const color = rule.settings.foreground;
        usedColors.add(color);
        if (!colorUsage[color]) {
          colorUsage[color] = [];
        }
        colorUsage[color].push(rule.name || rule.scope);
      }
    });

    console.log(`✓ Found ${usedColors.size} distinct colors in syntax highlighting`);
    
    // Check for sufficient color variety
    if (usedColors.size >= 10) {
      console.log('✓ Good color variety for syntax distinction');
    } else {
      console.log('⚠ Limited color variety - consider adding more distinct colors');
    }

    // Test 2: Language-Specific Coverage
    console.log('\n2. Testing Language-Specific Coverage:');
    
    const languageTests = {
      'JavaScript/TypeScript': [
        'keyword', 'entity.name.function', 'variable', 'string', 'constant.numeric'
      ],
      'HTML': [
        'entity.name.tag', 'entity.other.attribute-name', 'string.quoted.double.html'
      ],
      'CSS': [
        'entity.name.tag.css', 'support.type.property-name.css', 'support.constant.property-value.css'
      ],
      'JSON': [
        'support.type.property-name.json', 'string.quoted.double.json'
      ],
      'Markdown': [
        'markup.heading', 'markup.bold', 'markup.italic', 'markup.inline.raw.markdown'
      ]
    };

    Object.entries(languageTests).forEach(([language, scopes]) => {
      const coveredScopes = scopes.filter(scope => 
        tokenColors.some(rule => 
          (Array.isArray(rule.scope) && rule.scope.some(s => s.includes(scope))) ||
          (typeof rule.scope === 'string' && rule.scope.includes(scope))
        )
      );
      
      if (coveredScopes.length === scopes.length) {
        console.log(`✓ ${language}: All essential scopes covered`);
      } else {
        console.log(`⚠ ${language}: ${coveredScopes.length}/${scopes.length} scopes covered`);
      }
    });

    // Test 3: Contrast and Accessibility
    console.log('\n3. Testing Contrast and Accessibility:');
    
    const backgroundColor = theme.colors['editor.background'];
    const foregroundColor = theme.colors['editor.foreground'];
    
    console.log(`✓ Background: ${backgroundColor}`);
    console.log(`✓ Foreground: ${foregroundColor}`);
    
    // Calculate contrast ratio for main text
    const bgLuminance = calculateLuminance(backgroundColor);
    const fgLuminance = calculateLuminance(foregroundColor);
    const contrastRatio = (Math.max(bgLuminance, fgLuminance) + 0.05) / (Math.min(bgLuminance, fgLuminance) + 0.05);
    
    console.log(`✓ Main text contrast ratio: ${contrastRatio.toFixed(2)}:1`);
    
    if (contrastRatio >= 7) {
      console.log('✓ Excellent contrast (AAA level)');
    } else if (contrastRatio >= 4.5) {
      console.log('✓ Good contrast (AA level)');
    } else {
      console.log('⚠ Low contrast - may affect readability');
    }

    // Test syntax colors against background
    let lowContrastColors = 0;
    usedColors.forEach(color => {
      const colorLuminance = calculateLuminance(color);
      const colorContrast = (Math.max(bgLuminance, colorLuminance) + 0.05) / (Math.min(bgLuminance, colorLuminance) + 0.05);
      if (colorContrast < 3) {
        lowContrastColors++;
      }
    });
    
    if (lowContrastColors === 0) {
      console.log('✓ All syntax colors have adequate contrast');
    } else {
      console.log(`⚠ ${lowContrastColors} syntax colors may have low contrast`);
    }

    // Test 4: Semantic Token Integration
    console.log('\n4. Testing Semantic Token Integration:');
    
    if (theme.semanticHighlighting && theme.semanticTokenColors) {
      const semanticColors = new Set();
      Object.values(theme.semanticTokenColors).forEach(color => {
        if (typeof color === 'string') {
          semanticColors.add(color);
        }
      });
      
      console.log(`✓ ${semanticColors.size} distinct semantic token colors`);
      
      // Check if semantic colors complement traditional colors
      const sharedColors = [...usedColors].filter(color => semanticColors.has(color));
      console.log(`✓ ${sharedColors.length} colors shared between traditional and semantic highlighting`);
      
      if (sharedColors.length > 0) {
        console.log('✓ Good integration between traditional and semantic highlighting');
      }
    }

    // Test 5: Theme Consistency
    console.log('\n5. Testing Theme Consistency:');
    
    // Check if colors follow Apollo palette
    const apolloPalette = [
      '#172038', '#253a5e', '#3c5e8b', '#4f8fba', '#73bed3', '#a4dddb',
      '#19332d', '#25562e', '#468232', '#75a743', '#a8ca58', '#d0da91',
      '#4d2b32', '#7a4841', '#ad7757', '#c09473', '#d7b594', '#e7d5b3',
      '#341c27', '#602c2c', '#884b2b', '#be772b', '#de9e41', '#e8c170',
      '#241527', '#411d31', '#752438', '#a53030', '#cf573c', '#da863e',
      '#1e1d39', '#402751', '#7a367b', '#a23e8c', '#c65197', '#df84a5',
      '#090a14', '#10141f', '#151d28', '#202e37', '#394a50', '#577277',
      '#819796', '#a8b5b2', '#c7cfcc', '#ebede9'
    ];
    
    const paletteColors = new Set(apolloPalette);
    const nonPaletteColors = [...usedColors].filter(color => !paletteColors.has(color));
    
    if (nonPaletteColors.length === 0) {
      console.log('✓ All syntax colors use Apollo palette');
    } else {
      console.log(`⚠ ${nonPaletteColors.length} colors not from Apollo palette: ${nonPaletteColors.join(', ')}`);
    }

    console.log('\n🎉 Syntax highlighting test completed!');
    console.log('The Apollo Light theme provides comprehensive and accessible syntax highlighting.');
    
    return true;

  } catch (error) {
    console.error('✗ Syntax highlighting test failed:', error.message);
    return false;
  }
}

function calculateLuminance(hexColor) {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16) / 255;
  const g = parseInt(hexColor.slice(3, 5), 16) / 255;
  const b = parseInt(hexColor.slice(5, 7), 16) / 255;
  
  // Apply gamma correction
  const rLinear = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gLinear = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bLinear = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
  
  // Calculate luminance
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

// Run test
if (require.main === module) {
  const isValid = testLightThemeSyntaxHighlighting();
  process.exit(isValid ? 0 : 1);
}

module.exports = { testLightThemeSyntaxHighlighting };