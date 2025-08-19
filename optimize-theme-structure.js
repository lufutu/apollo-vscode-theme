#!/usr/bin/env node

/**
 * Apollo Theme JSON Structure Optimizer
 * Optimizes theme JSON files for faster loading and better performance
 */

const fs = require('fs');
const path = require('path');

class ApolloThemeOptimizer {
    constructor() {
        this.themeFiles = [
            'themes/apollo-dark-color-theme.json',
            'themes/apollo-light-color-theme.json'
        ];
        this.optimizations = [];
    }

    /**
     * Optimize all theme files
     */
    async optimizeAllThemes() {
        console.log('🔧 Optimizing Apollo theme JSON structure for performance...\n');
        
        for (const themeFile of this.themeFiles) {
            await this.optimizeThemeFile(themeFile);
        }
        
        this.generateOptimizationReport();
        console.log('\n✅ Theme optimization completed!');
    }

    /**
     * Optimize a single theme file
     */
    async optimizeThemeFile(themeFile) {
        const themePath = path.join(__dirname, themeFile);
        const themeName = path.basename(themeFile, '.json');
        
        console.log(`🎯 Optimizing ${themeName}...`);
        
        try {
            // Read and parse theme
            const originalContent = fs.readFileSync(themePath, 'utf8');
            const themeData = JSON.parse(originalContent);
            const originalSize = originalContent.length;
            
            // Apply optimizations
            const optimizedTheme = this.applyOptimizations(themeData, themeName);
            
            // Generate optimized JSON with consistent formatting
            const optimizedContent = this.formatOptimizedJSON(optimizedTheme);
            const optimizedSize = optimizedContent.length;
            
            // Create backup
            const backupPath = `${themePath}.backup`;
            fs.writeFileSync(backupPath, originalContent);
            
            // Write optimized version
            fs.writeFileSync(themePath, optimizedContent);
            
            const sizeDiff = originalSize - optimizedSize;
            const percentReduction = ((sizeDiff / originalSize) * 100).toFixed(1);
            
            console.log(`  ✅ Optimized ${themeName}:`);
            console.log(`     Original size: ${(originalSize / 1024).toFixed(2)} KB`);
            console.log(`     Optimized size: ${(optimizedSize / 1024).toFixed(2)} KB`);
            console.log(`     Size reduction: ${(sizeDiff / 1024).toFixed(2)} KB (${percentReduction}%)`);
            console.log(`     Backup saved: ${path.basename(backupPath)}`);
            
            this.optimizations.push({
                theme: themeName,
                originalSize,
                optimizedSize,
                sizeDiff,
                percentReduction: parseFloat(percentReduction)
            });
            
        } catch (error) {
            console.log(`  ❌ Failed to optimize ${themeName}: ${error.message}`);
        }
    }

    /**
     * Apply various optimizations to theme data
     */
    applyOptimizations(themeData, themeName) {
        const optimized = JSON.parse(JSON.stringify(themeData)); // Deep clone
        
        // 1. Ensure proper structure order for faster parsing
        const orderedTheme = this.reorderThemeStructure(optimized);
        
        // 2. Optimize color definitions
        this.optimizeColorDefinitions(orderedTheme);
        
        // 3. Optimize token colors array
        this.optimizeTokenColors(orderedTheme);
        
        // 4. Optimize semantic token colors
        this.optimizeSemanticTokenColors(orderedTheme);
        
        // 5. Remove redundant properties
        this.removeRedundantProperties(orderedTheme);
        
        // 6. Validate and fix deprecated properties
        this.fixDeprecatedProperties(orderedTheme);
        
        return orderedTheme;
    }

    /**
     * Reorder theme structure for optimal parsing performance
     */
    reorderThemeStructure(theme) {
        const ordered = {};
        
        // Order properties by importance for VS Code parsing
        const propertyOrder = [
            'name',
            'type',
            'semanticHighlighting',
            'colors',
            'tokenColors',
            'semanticTokenColors'
        ];
        
        // Add properties in optimal order
        propertyOrder.forEach(prop => {
            if (theme[prop] !== undefined) {
                ordered[prop] = theme[prop];
            }
        });
        
        // Add any remaining properties
        Object.keys(theme).forEach(prop => {
            if (!propertyOrder.includes(prop)) {
                ordered[prop] = theme[prop];
            }
        });
        
        return ordered;
    }

    /**
     * Optimize color definitions for consistency and performance
     */
    optimizeColorDefinitions(theme) {
        if (!theme.colors) return;
        
        const colors = theme.colors;
        const optimizedColors = {};
        
        // Sort colors alphabetically for better compression and readability
        const sortedKeys = Object.keys(colors).sort();
        
        sortedKeys.forEach(key => {
            let color = colors[key];
            
            // Normalize color format
            if (typeof color === 'string' && color.startsWith('#')) {
                // Ensure lowercase hex colors
                color = color.toLowerCase();
                
                // Convert 8-digit hex to 6-digit if alpha is FF (fully opaque)
                if (color.length === 9 && color.endsWith('ff')) {
                    color = color.substring(0, 7);
                }
            }
            
            optimizedColors[key] = color;
        });
        
        theme.colors = optimizedColors;
    }

    /**
     * Optimize token colors array
     */
    optimizeTokenColors(theme) {
        if (!theme.tokenColors || !Array.isArray(theme.tokenColors)) return;
        
        theme.tokenColors = theme.tokenColors.map(token => {
            const optimized = {};
            
            // Maintain property order for consistency
            if (token.name) optimized.name = token.name;
            if (token.scope) optimized.scope = token.scope;
            if (token.settings) {
                optimized.settings = {};
                
                // Order settings properties
                if (token.settings.foreground) {
                    optimized.settings.foreground = token.settings.foreground.toLowerCase();
                }
                if (token.settings.background) {
                    optimized.settings.background = token.settings.background.toLowerCase();
                }
                if (token.settings.fontStyle) {
                    optimized.settings.fontStyle = token.settings.fontStyle;
                }
            }
            
            return optimized;
        });
    }

    /**
     * Optimize semantic token colors
     */
    optimizeSemanticTokenColors(theme) {
        if (!theme.semanticTokenColors) return;
        
        const semantic = theme.semanticTokenColors;
        const optimized = {};
        
        // Sort semantic tokens alphabetically
        const sortedKeys = Object.keys(semantic).sort();
        
        sortedKeys.forEach(key => {
            let value = semantic[key];
            
            if (typeof value === 'string' && value.startsWith('#')) {
                // Normalize color format
                value = value.toLowerCase();
            } else if (typeof value === 'object' && value !== null) {
                // Optimize object properties
                const optimizedValue = {};
                
                if (value.foreground) {
                    optimizedValue.foreground = value.foreground.toLowerCase();
                }
                if (value.background) {
                    optimizedValue.background = value.background.toLowerCase();
                }
                if (value.fontStyle) {
                    optimizedValue.fontStyle = value.fontStyle;
                }
                
                value = optimizedValue;
            }
            
            optimized[key] = value;
        });
        
        theme.semanticTokenColors = optimized;
    }

    /**
     * Remove redundant or unnecessary properties
     */
    removeRedundantProperties(theme) {
        // Remove empty objects or arrays
        Object.keys(theme).forEach(key => {
            const value = theme[key];
            
            if (Array.isArray(value) && value.length === 0) {
                delete theme[key];
            } else if (typeof value === 'object' && value !== null && Object.keys(value).length === 0) {
                delete theme[key];
            }
        });
        
        // Remove null or undefined values
        if (theme.colors) {
            Object.keys(theme.colors).forEach(key => {
                if (theme.colors[key] === null || theme.colors[key] === undefined || theme.colors[key] === '') {
                    delete theme.colors[key];
                }
            });
        }
    }

    /**
     * Fix deprecated properties for VS Code compatibility
     */
    fixDeprecatedProperties(theme) {
        if (!theme.colors) return;
        
        const colors = theme.colors;
        
        // Update deprecated indent guide properties
        if (colors['editorIndentGuide.background']) {
            colors['editorIndentGuide.background1'] = colors['editorIndentGuide.background'];
            delete colors['editorIndentGuide.background'];
        }
        
        if (colors['editorIndentGuide.activeBackground']) {
            colors['editorIndentGuide.activeBackground1'] = colors['editorIndentGuide.activeBackground'];
            delete colors['editorIndentGuide.activeBackground'];
        }
        
        // Ensure required properties exist
        if (!colors['editor.background']) {
            console.warn('  ⚠️  Missing required editor.background color');
        }
        
        if (!colors['editor.foreground']) {
            console.warn('  ⚠️  Missing required editor.foreground color');
        }
    }

    /**
     * Format optimized JSON with consistent style
     */
    formatOptimizedJSON(themeData) {
        // Use 2-space indentation for consistency with VS Code standards
        return JSON.stringify(themeData, null, 2) + '\n';
    }

    /**
     * Generate optimization report
     */
    generateOptimizationReport() {
        console.log('\n📊 Optimization Report:');
        
        let totalOriginalSize = 0;
        let totalOptimizedSize = 0;
        
        this.optimizations.forEach(opt => {
            totalOriginalSize += opt.originalSize;
            totalOptimizedSize += opt.optimizedSize;
        });
        
        const totalReduction = totalOriginalSize - totalOptimizedSize;
        const totalPercentReduction = ((totalReduction / totalOriginalSize) * 100).toFixed(1);
        
        console.log(`  📈 Total size reduction: ${(totalReduction / 1024).toFixed(2)} KB (${totalPercentReduction}%)`);
        console.log(`  📁 Original total size: ${(totalOriginalSize / 1024).toFixed(2)} KB`);
        console.log(`  📁 Optimized total size: ${(totalOptimizedSize / 1024).toFixed(2)} KB`);
        
        // Save optimization report
        const reportPath = path.join(__dirname, 'theme-optimization-report.json');
        const report = {
            timestamp: new Date().toISOString(),
            optimizations: this.optimizations,
            summary: {
                totalOriginalSize,
                totalOptimizedSize,
                totalReduction,
                totalPercentReduction: parseFloat(totalPercentReduction)
            }
        };
        
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        console.log(`  💾 Optimization report saved: ${path.basename(reportPath)}`);
    }

    /**
     * Restore themes from backup
     */
    restoreFromBackup() {
        console.log('🔄 Restoring themes from backup...');
        
        this.themeFiles.forEach(themeFile => {
            const themePath = path.join(__dirname, themeFile);
            const backupPath = `${themePath}.backup`;
            
            if (fs.existsSync(backupPath)) {
                const backupContent = fs.readFileSync(backupPath, 'utf8');
                fs.writeFileSync(themePath, backupContent);
                console.log(`  ✅ Restored ${path.basename(themeFile)}`);
            } else {
                console.log(`  ⚠️  No backup found for ${path.basename(themeFile)}`);
            }
        });
    }
}

// Command line interface
if (require.main === module) {
    const optimizer = new ApolloThemeOptimizer();
    
    const command = process.argv[2];
    
    if (command === 'restore') {
        optimizer.restoreFromBackup();
    } else {
        optimizer.optimizeAllThemes().catch(console.error);
    }
}

module.exports = ApolloThemeOptimizer;