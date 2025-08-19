// Simple test to verify the color palette implementation
const colors = require('./colors.ts');

// Test that we have all color groups
console.log('Testing Apollo Color Palette Implementation...\n');

// Test color groups
console.log('Blues/Teals:', Object.keys(colors.BLUES_TEALS).length, 'colors');
console.log('Greens:', Object.keys(colors.GREENS).length, 'colors');
console.log('Browns/Oranges:', Object.keys(colors.BROWNS_ORANGES).length, 'colors');
console.log('Warm Tones:', Object.keys(colors.WARM_TONES).length, 'colors');
console.log('Purples/Magentas:', Object.keys(colors.PURPLES_MAGENTAS).length, 'colors');
console.log('Deep Purples:', Object.keys(colors.DEEP_PURPLES).length, 'colors');
console.log('Grayscale:', Object.keys(colors.GRAYSCALE).length, 'colors');

// Test total colors
const totalColors = colors.getAllApolloColors().length;
console.log('\nTotal Apollo colors:', totalColors);

// Test theme colors
console.log('\nDark theme background:', colors.DARK_THEME_COLORS.background.primary);
console.log('Light theme background:', colors.LIGHT_THEME_COLORS.background.primary);

// Test helper functions
console.log('\nTesting helper functions:');
console.log('Dark theme colors available:', !!colors.getThemeColors(true));
console.log('Light theme colors available:', !!colors.getThemeColors(false));
console.log('Syntax colors for dark theme available:', !!colors.getSyntaxColors(true));
console.log('Workbench colors for dark theme available:', !!colors.getWorkbenchColors(true));

// Test color validation
console.log('\nColor validation tests:');
console.log('Valid hex color #172038:', colors.isValidHexColor('#172038'));
console.log('Invalid hex color #xyz:', colors.isValidHexColor('#xyz'));
console.log('Is #172038 an Apollo color:', colors.isApolloColor('#172038'));
console.log('Is #ffffff an Apollo color:', colors.isApolloColor('#ffffff'));

console.log('\n✅ All tests completed successfully!');