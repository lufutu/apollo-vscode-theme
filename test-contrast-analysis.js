/**
 * Detailed contrast analysis for Apollo Light theme
 * Identifies specific colors with low contrast and suggests improvements
 */

const fs = require('fs');
const path = require('path');

function analyzeContrast() {
  try {
    const themePath = path.join(__dirname, 'themes', 'apollo-light-color-theme.json');
    const themeContent = fs.readFileSync(themePath, 'utf8');
    const theme = JSON.parse(themeContent);

    console.log('🔍 Apollo Light Theme Contrast Analysis');
    console.log('======================================');

    const backgroundColor = theme.colors['editor.background']; // #ebede9
    const bgLuminance = calculateLuminance(backgroundColor);
    
    console.log(`Background: ${backgroundColor} (luminance: ${bgLuminance.toFixed(3)})`);
    console.log('\nAnalyzing syntax colors:');
    console.log('------------------------');

    const tokenColors = theme.tokenColors;
    const lowContrastColors = [];
    const colorAnalysis = [];

    tokenColors.forEach(rule => {
      if (rule.settings && rule.settings.foreground) {
        const color = rule.settings.foreground;
        const colorLuminance = calculateLuminance(color);
        const contrastRatio = (Math.max(bgLuminance, colorLuminance) + 0.05) / (Math.min(bgLuminance, colorLuminance) + 0.05);
        
        const analysis = {
          color,
          name: rule.name,
          scope: rule.scope,
          luminance: colorLuminance,
          contrast: contrastRatio,
          level: getContrastLevel(contrastRatio)
        };
        
        colorAnalysis.push(analysis);
        
        if (contrastRatio < 3) {
          lowContrastColors.push(analysis);
        }
      }
    });

    // Sort by contrast ratio (lowest first)
    colorAnalysis.sort((a, b) => a.contrast - b.contrast);

    console.log('\nColors with potential contrast issues:');
    console.log('-------------------------------------');
    
    lowContrastColors.forEach(item => {
      console.log(`❌ ${item.color} - ${item.name || 'Unnamed'}`);
      console.log(`   Contrast: ${item.contrast.toFixed(2)}:1 (${item.level})`);
      console.log(`   Scope: ${Array.isArray(item.scope) ? item.scope.join(', ') : item.scope}`);
      console.log('');
    });

    if (lowContrastColors.length === 0) {
      console.log('✅ No contrast issues found!');
    }

    console.log('\nAll colors sorted by contrast (lowest to highest):');
    console.log('--------------------------------------------------');
    
    colorAnalysis.forEach(item => {
      const status = item.contrast >= 4.5 ? '✅' : item.contrast >= 3 ? '⚠️' : '❌';
      console.log(`${status} ${item.color} - ${item.contrast.toFixed(2)}:1 (${item.level}) - ${item.name || 'Unnamed'}`);
    });

    return lowContrastColors;

  } catch (error) {
    console.error('Error analyzing contrast:', error.message);
    return [];
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

function getContrastLevel(ratio) {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA Large';
  return 'Fail';
}

// Run analysis
if (require.main === module) {
  analyzeContrast();
}

module.exports = { analyzeContrast };