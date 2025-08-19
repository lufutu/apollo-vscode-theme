/**
 * Script to create placeholder preview images for Apollo Theme
 * This creates simple placeholder images that should be replaced with actual screenshots
 */

const fs = require('fs');
const path = require('path');

// SVG template for preview placeholders
function createPreviewSVG(title, subtitle, width = 1200, height = 800, isDark = true) {
  const bgColor = isDark ? '#090a14' : '#ebede9';
  const textColor = isDark ? '#ebede9' : '#090a14';
  const accentColor = '#73bed3';
  const secondaryColor = '#a8ca58';
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="${bgColor}"/>
  
  <!-- Header bar -->
  <rect x="0" y="0" width="${width}" height="60" fill="${isDark ? '#151d28' : '#c7cfcc'}"/>
  
  <!-- Sidebar -->
  <rect x="0" y="60" width="250" height="${height - 60}" fill="${isDark ? '#10141f' : '#a8b5b2'}"/>
  
  <!-- Main editor area -->
  <rect x="250" y="60" width="${width - 250}" height="${height - 120}" fill="${bgColor}"/>
  
  <!-- Status bar -->
  <rect x="0" y="${height - 60}" width="${width}" height="60" fill="${isDark ? '#151d28' : '#c7cfcc'}"/>
  
  <!-- Title -->
  <text x="${width / 2}" y="200" font-family="Arial, sans-serif" font-size="48" font-weight="bold" 
        text-anchor="middle" fill="${accentColor}">${title}</text>
  
  <!-- Subtitle -->
  <text x="${width / 2}" y="260" font-family="Arial, sans-serif" font-size="24" 
        text-anchor="middle" fill="${textColor}">${subtitle}</text>
  
  <!-- Code preview simulation -->
  <g transform="translate(300, 320)">
    <!-- Line numbers -->
    <text x="0" y="20" font-family="monospace" font-size="14" fill="${isDark ? '#577277' : '#394a50'}">1</text>
    <text x="0" y="40" font-family="monospace" font-size="14" fill="${isDark ? '#577277' : '#394a50'}">2</text>
    <text x="0" y="60" font-family="monospace" font-size="14" fill="${isDark ? '#577277' : '#394a50'}">3</text>
    <text x="0" y="80" font-family="monospace" font-size="14" fill="${isDark ? '#577277' : '#394a50'}">4</text>
    <text x="0" y="100" font-family="monospace" font-size="14" fill="${isDark ? '#577277' : '#394a50'}">5</text>
    
    <!-- Code lines -->
    <text x="30" y="20" font-family="monospace" font-size="14" fill="${isDark ? '#4f8fba' : '#3c5e8b'}">const</text>
    <text x="80" y="20" font-family="monospace" font-size="14" fill="${isDark ? '#a4dddb' : '#253a5e'}">apolloTheme</text>
    <text x="180" y="20" font-family="monospace" font-size="14" fill="${isDark ? '#a8b5b2' : '#202e37'}">=</text>
    <text x="200" y="20" font-family="monospace" font-size="14" fill="${isDark ? '#a8ca58' : '#468232'}">"Apollo Dark"</text>
    
    <text x="30" y="40" font-family="monospace" font-size="14" fill="${isDark ? '#4f8fba' : '#3c5e8b'}">function</text>
    <text x="110" y="40" font-family="monospace" font-size="14" fill="${isDark ? '#e8c170' : '#884b2b'}">applyTheme</text>
    <text x="200" y="40" font-family="monospace" font-size="14" fill="${isDark ? '#a8b5b2' : '#202e37'}">()</text>
    <text x="220" y="40" font-family="monospace" font-size="14" fill="${isDark ? '#a8b5b2' : '#202e37'}">{</text>
    
    <text x="50" y="60" font-family="monospace" font-size="14" fill="${isDark ? '#577277' : '#394a50'}">// Apply Apollo colors</text>
    
    <text x="50" y="80" font-family="monospace" font-size="14" fill="${isDark ? '#4f8fba' : '#3c5e8b'}">return</text>
    <text x="110" y="80" font-family="monospace" font-size="14" fill="${isDark ? '#df84a5' : '#a23e8c'}">true</text>
    
    <text x="30" y="100" font-family="monospace" font-size="14" fill="${isDark ? '#a8b5b2' : '#202e37'}">}</text>
  </g>
  
  <!-- Apollo logo placeholder -->
  <circle cx="125" cy="200" r="40" fill="${accentColor}" opacity="0.3"/>
  <text x="125" y="210" font-family="Arial, sans-serif" font-size="36" font-weight="bold" 
        text-anchor="middle" fill="${accentColor}">A</text>
  
  <!-- Feature highlights -->
  <g transform="translate(300, 500)">
    <circle cx="0" cy="0" r="5" fill="${secondaryColor}"/>
    <text x="15" y="5" font-family="Arial, sans-serif" font-size="16" fill="${textColor}">48 Apollo Colors</text>
    
    <circle cx="0" cy="30" r="5" fill="${secondaryColor}"/>
    <text x="15" y="35" font-family="Arial, sans-serif" font-size="16" fill="${textColor}">Dual Theme Support</text>
    
    <circle cx="0" cy="60" r="5" fill="${secondaryColor}"/>
    <text x="15" y="65" font-family="Arial, sans-serif" font-size="16" fill="${textColor}">Retro Pixel Art Aesthetic</text>
    
    <circle cx="0" cy="90" r="5" fill="${secondaryColor}"/>
    <text x="15" y="95" font-family="Arial, sans-serif" font-size="16" fill="${textColor}">WCAG AA Compliant</text>
  </g>
  
  <!-- Watermark -->
  <text x="${width - 20}" y="${height - 20}" font-family="Arial, sans-serif" font-size="12" 
        text-anchor="end" fill="${isDark ? '#577277' : '#394a50'}" opacity="0.7">
    Apollo Theme Preview - Replace with actual screenshot
  </text>
</svg>`;
}

// Create preview images
const previews = [
  {
    filename: 'preview-dark.svg',
    title: 'Apollo Dark Theme',
    subtitle: 'Retro pixel art aesthetic for VS Code',
    isDark: true
  },
  {
    filename: 'preview-light.svg', 
    title: 'Apollo Light Theme',
    subtitle: 'Bright and accessible coding experience',
    isDark: false
  },
  {
    filename: 'screenshot-js.svg',
    title: 'JavaScript Highlighting',
    subtitle: 'Enhanced syntax colors for modern JS/TS',
    width: 800,
    height: 600,
    isDark: true
  },
  {
    filename: 'screenshot-html.svg',
    title: 'HTML & CSS Support',
    subtitle: 'Clear distinction for web development',
    width: 800,
    height: 600,
    isDark: true
  },
  {
    filename: 'screenshot-json.svg',
    title: 'JSON Visualization',
    subtitle: 'Structured data with Apollo colors',
    width: 800,
    height: 600,
    isDark: true
  },
  {
    filename: 'screenshot-md.svg',
    title: 'Markdown Formatting',
    subtitle: 'Beautiful documentation styling',
    width: 800,
    height: 600,
    isDark: true
  }
];

// Ensure assets directory exists
const assetsDir = path.join(__dirname);
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Generate SVG files
previews.forEach(preview => {
  const svg = createPreviewSVG(
    preview.title,
    preview.subtitle,
    preview.width || 1200,
    preview.height || 800,
    preview.isDark
  );
  
  const filepath = path.join(assetsDir, preview.filename);
  fs.writeFileSync(filepath, svg);
  console.log(`Created ${preview.filename}`);
});

console.log('\nPlaceholder preview images created!');
console.log('These SVG files should be replaced with actual VS Code screenshots.');
console.log('Use the sample files in /assets/samples/ to generate real screenshots.');

// Create a README for the assets directory
const assetsReadme = `# Apollo Theme Assets

This directory contains assets for the Apollo Theme extension.

## Files

### Icons
- \`icon.svg\` - Source SVG icon
- \`icon.png\` - Extension icon (128x128)

### Preview Images (PLACEHOLDERS)
- \`preview-dark.svg\` - Main dark theme preview (replace with PNG screenshot)
- \`preview-light.svg\` - Main light theme preview (replace with PNG screenshot)
- \`screenshot-js.svg\` - JavaScript syntax highlighting (replace with PNG screenshot)
- \`screenshot-html.svg\` - HTML/CSS highlighting (replace with PNG screenshot)
- \`screenshot-json.svg\` - JSON highlighting (replace with PNG screenshot)
- \`screenshot-md.svg\` - Markdown highlighting (replace with PNG screenshot)

### Sample Files
- \`samples/sample.js\` - JavaScript/TypeScript demo code
- \`samples/sample.html\` - HTML/CSS demo code
- \`samples/sample.json\` - JSON configuration example
- \`samples/sample.md\` - Markdown documentation example

### Documentation
- \`SCREENSHOTS.md\` - Guide for creating proper screenshots

## TODO: Replace Placeholders

The SVG files are placeholders. To complete the documentation:

1. Open VS Code with Apollo Theme installed
2. Open each sample file from \`samples/\`
3. Take high-quality screenshots (PNG format)
4. Replace the SVG placeholders with actual screenshots
5. Ensure proper dimensions and file sizes per SCREENSHOTS.md

## Image Requirements

- **Format**: PNG (high quality, no compression artifacts)
- **Main previews**: 1200x800 pixels, max 500KB
- **Screenshots**: 800x600 pixels, max 300KB
- **Icon**: 128x128 pixels, max 50KB

## Usage

These assets are referenced in:
- README.md (preview images and screenshots)
- package.json (icon and gallery banner)
- VS Code Marketplace listing
- Documentation and promotional materials
`;

fs.writeFileSync(path.join(assetsDir, 'README.md'), assetsReadme);
console.log('Created assets/README.md with instructions');

module.exports = { createPreviewSVG };