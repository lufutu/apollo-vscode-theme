#!/usr/bin/env node

/**
 * Apollo Theme Performance and Cross-Platform Compatibility Test Suite
 * Tests theme loading performance, memory usage, and cross-platform compatibility
 */

const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

class ApolloThemePerformanceTest {
    constructor() {
        this.results = {
            performance: {},
            compatibility: {},
            optimization: {},
            crossPlatform: {}
        };
        this.themeFiles = [
            'themes/apollo-dark-color-theme.json',
            'themes/apollo-light-color-theme.json'
        ];
    }

    /**
     * Test theme loading performance and memory usage
     */
    async testThemeLoadingPerformance() {
        console.log('🚀 Testing theme loading performance...');
        
        for (const themeFile of this.themeFiles) {
            const themePath = path.join(__dirname, themeFile);
            const themeName = path.basename(themeFile, '.json');
            
            // Test file size
            const stats = fs.statSync(themePath);
            const fileSizeKB = (stats.size / 1024).toFixed(2);
            
            // Test JSON parsing performance
            const startTime = performance.now();
            const memBefore = process.memoryUsage();
            
            try {
                const themeContent = fs.readFileSync(themePath, 'utf8');
                const parseStart = performance.now();
                const themeData = JSON.parse(themeContent);
                const parseEnd = performance.now();
                
                const memAfter = process.memoryUsage();
                const endTime = performance.now();
                
                // Calculate metrics
                const totalLoadTime = (endTime - startTime).toFixed(2);
                const parseTime = (parseEnd - parseStart).toFixed(2);
                const memoryUsage = ((memAfter.heapUsed - memBefore.heapUsed) / 1024).toFixed(2);
                
                // Count theme elements for complexity analysis
                const colorCount = Object.keys(themeData.colors || {}).length;
                const tokenColorCount = (themeData.tokenColors || []).length;
                const semanticTokenCount = Object.keys(themeData.semanticTokenColors || {}).length;
                
                this.results.performance[themeName] = {
                    fileSize: `${fileSizeKB} KB`,
                    totalLoadTime: `${totalLoadTime} ms`,
                    parseTime: `${parseTime} ms`,
                    memoryUsage: `${memoryUsage} KB`,
                    complexity: {
                        workbenchColors: colorCount,
                        tokenColors: tokenColorCount,
                        semanticTokens: semanticTokenCount,
                        totalElements: colorCount + tokenColorCount + semanticTokenCount
                    }
                };
                
                console.log(`  ✅ ${themeName}:`);
                console.log(`     File size: ${fileSizeKB} KB`);
                console.log(`     Load time: ${totalLoadTime} ms`);
                console.log(`     Parse time: ${parseTime} ms`);
                console.log(`     Memory usage: ${memoryUsage} KB`);
                console.log(`     Elements: ${colorCount + tokenColorCount + semanticTokenCount}`);
                
            } catch (error) {
                console.log(`  ❌ ${themeName}: Failed to load - ${error.message}`);
                this.results.performance[themeName] = { error: error.message };
            }
        }
    }

    /**
     * Validate JSON structure for faster theme loading
     */
    async testJSONStructureOptimization() {
        console.log('\n🔧 Testing JSON structure optimization...');
        
        for (const themeFile of this.themeFiles) {
            const themePath = path.join(__dirname, themeFile);
            const themeName = path.basename(themeFile, '.json');
            
            try {
                const themeContent = fs.readFileSync(themePath, 'utf8');
                const themeData = JSON.parse(themeContent);
                
                // Check for optimization opportunities
                const optimizations = {
                    duplicateColors: this.findDuplicateColors(themeData),
                    unusedProperties: this.findUnusedProperties(themeData),
                    structureIssues: this.validateStructure(themeData),
                    compressionPotential: this.calculateCompressionPotential(themeContent)
                };
                
                this.results.optimization[themeName] = optimizations;
                
                console.log(`  📊 ${themeName} optimization analysis:`);
                console.log(`     Duplicate colors: ${optimizations.duplicateColors.count}`);
                console.log(`     Structure issues: ${optimizations.structureIssues.length}`);
                console.log(`     Compression potential: ${optimizations.compressionPotential}%`);
                
            } catch (error) {
                console.log(`  ❌ ${themeName}: Optimization analysis failed - ${error.message}`);
            }
        }
    }

    /**
     * Test cross-platform compatibility
     */
    async testCrossPlatformCompatibility() {
        console.log('\n🌍 Testing cross-platform compatibility...');
        
        const platformTests = {
            colorFormat: this.validateColorFormats(),
            pathSeparators: this.validatePathSeparators(),
            fontSupport: this.validateFontSupport(),
            vsCodeVersions: this.validateVSCodeVersionCompatibility()
        };
        
        this.results.crossPlatform = platformTests;
        
        console.log('  ✅ Color format compatibility: ' + (platformTests.colorFormat.valid ? 'PASS' : 'FAIL'));
        console.log('  ✅ Path separator compatibility: ' + (platformTests.pathSeparators.valid ? 'PASS' : 'FAIL'));
        console.log('  ✅ Font support compatibility: ' + (platformTests.fontSupport.valid ? 'PASS' : 'FAIL'));
        console.log('  ✅ VS Code version compatibility: ' + (platformTests.vsCodeVersions.valid ? 'PASS' : 'FAIL'));
    }

    /**
     * Find duplicate color values that could be optimized
     */
    findDuplicateColors(themeData) {
        const colorMap = new Map();
        const duplicates = [];
        
        if (themeData.colors) {
            Object.entries(themeData.colors).forEach(([key, value]) => {
                if (colorMap.has(value)) {
                    colorMap.get(value).push(key);
                } else {
                    colorMap.set(value, [key]);
                }
            });
        }
        
        colorMap.forEach((keys, color) => {
            if (keys.length > 1) {
                duplicates.push({ color, keys, count: keys.length });
            }
        });
        
        return { count: duplicates.length, duplicates };
    }

    /**
     * Find potentially unused properties
     */
    findUnusedProperties(themeData) {
        const unused = [];
        
        // Check for empty or null values
        if (themeData.colors) {
            Object.entries(themeData.colors).forEach(([key, value]) => {
                if (!value || value === '' || value === 'transparent') {
                    unused.push({ property: key, issue: 'empty or transparent value' });
                }
            });
        }
        
        return unused;
    }

    /**
     * Validate theme structure for VS Code compatibility
     */
    validateStructure(themeData) {
        const issues = [];
        
        // Required properties
        if (!themeData.name) issues.push('Missing theme name');
        if (!themeData.type) issues.push('Missing theme type');
        if (!themeData.colors) issues.push('Missing colors object');
        if (!themeData.tokenColors) issues.push('Missing tokenColors array');
        
        // Type validation
        if (themeData.type && !['dark', 'light'].includes(themeData.type)) {
            issues.push('Invalid theme type (must be "dark" or "light")');
        }
        
        // Color format validation
        if (themeData.colors) {
            Object.entries(themeData.colors).forEach(([key, value]) => {
                if (typeof value === 'string' && value.startsWith('#')) {
                    if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(value)) {
                        issues.push(`Invalid color format for ${key}: ${value}`);
                    }
                }
            });
        }
        
        return issues;
    }

    /**
     * Calculate potential file size reduction through compression
     */
    calculateCompressionPotential(content) {
        const originalSize = content.length;
        const minified = JSON.stringify(JSON.parse(content));
        const minifiedSize = minified.length;
        
        return ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
    }

    /**
     * Validate color formats for cross-platform compatibility
     */
    validateColorFormats() {
        const issues = [];
        let valid = true;
        
        for (const themeFile of this.themeFiles) {
            try {
                const themePath = path.join(__dirname, themeFile);
                const themeData = JSON.parse(fs.readFileSync(themePath, 'utf8'));
                
                // Check all color values
                const allColors = { ...themeData.colors };
                
                // Add semantic token colors
                if (themeData.semanticTokenColors) {
                    Object.entries(themeData.semanticTokenColors).forEach(([key, value]) => {
                        if (typeof value === 'string') {
                            allColors[`semantic.${key}`] = value;
                        } else if (value && value.foreground) {
                            allColors[`semantic.${key}.foreground`] = value.foreground;
                        }
                    });
                }
                
                // Add token colors
                if (themeData.tokenColors) {
                    themeData.tokenColors.forEach((token, index) => {
                        if (token.settings && token.settings.foreground) {
                            allColors[`token.${index}.foreground`] = token.settings.foreground;
                        }
                        if (token.settings && token.settings.background) {
                            allColors[`token.${index}.background`] = token.settings.background;
                        }
                    });
                }
                
                Object.entries(allColors).forEach(([key, color]) => {
                    if (typeof color === 'string' && color.startsWith('#')) {
                        // Check for valid hex format
                        if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(color)) {
                            issues.push(`Invalid hex color in ${themeFile}: ${key} = ${color}`);
                            valid = false;
                        }
                        
                        // Check for case consistency (should be lowercase)
                        if (color !== color.toLowerCase()) {
                            issues.push(`Color should be lowercase in ${themeFile}: ${key} = ${color}`);
                        }
                    }
                });
                
            } catch (error) {
                issues.push(`Failed to validate colors in ${themeFile}: ${error.message}`);
                valid = false;
            }
        }
        
        return { valid, issues };
    }

    /**
     * Validate path separators for cross-platform compatibility
     */
    validatePathSeparators() {
        const issues = [];
        let valid = true;
        
        try {
            const packagePath = path.join(__dirname, 'package.json');
            const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
            
            if (packageData.contributes && packageData.contributes.themes) {
                packageData.contributes.themes.forEach(theme => {
                    if (theme.path) {
                        // Check for forward slashes (cross-platform compatible)
                        if (theme.path.includes('\\')) {
                            issues.push(`Use forward slashes in theme path: ${theme.path}`);
                            valid = false;
                        }
                        
                        // Check if path exists
                        const fullPath = path.join(__dirname, theme.path);
                        if (!fs.existsSync(fullPath)) {
                            issues.push(`Theme file not found: ${theme.path}`);
                            valid = false;
                        }
                    }
                });
            }
        } catch (error) {
            issues.push(`Failed to validate paths: ${error.message}`);
            valid = false;
        }
        
        return { valid, issues };
    }

    /**
     * Validate font support across platforms
     */
    validateFontSupport() {
        const issues = [];
        let valid = true;
        
        for (const themeFile of this.themeFiles) {
            try {
                const themePath = path.join(__dirname, themeFile);
                const themeData = JSON.parse(fs.readFileSync(themePath, 'utf8'));
                
                if (themeData.tokenColors) {
                    themeData.tokenColors.forEach((token, index) => {
                        if (token.settings && token.settings.fontStyle) {
                            const fontStyle = token.settings.fontStyle;
                            const validStyles = ['normal', 'italic', 'bold', 'underline', 'strikethrough'];
                            
                            // Check for multiple styles
                            const styles = fontStyle.split(' ');
                            styles.forEach(style => {
                                if (!validStyles.includes(style.trim())) {
                                    issues.push(`Invalid font style in ${themeFile}: ${fontStyle}`);
                                    valid = false;
                                }
                            });
                        }
                    });
                }
                
                // Check semantic token font styles
                if (themeData.semanticTokenColors) {
                    Object.entries(themeData.semanticTokenColors).forEach(([key, value]) => {
                        if (value && typeof value === 'object' && value.fontStyle) {
                            const fontStyle = value.fontStyle;
                            const validStyles = ['normal', 'italic', 'bold', 'underline', 'strikethrough'];
                            
                            const styles = fontStyle.split(' ');
                            styles.forEach(style => {
                                if (!validStyles.includes(style.trim())) {
                                    issues.push(`Invalid semantic font style in ${themeFile}: ${key} = ${fontStyle}`);
                                    valid = false;
                                }
                            });
                        }
                    });
                }
                
            } catch (error) {
                issues.push(`Failed to validate fonts in ${themeFile}: ${error.message}`);
                valid = false;
            }
        }
        
        return { valid, issues };
    }

    /**
     * Validate VS Code version compatibility
     */
    validateVSCodeVersionCompatibility() {
        const issues = [];
        let valid = true;
        
        try {
            const packagePath = path.join(__dirname, 'package.json');
            const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
            
            // Check engine version
            if (packageData.engines && packageData.engines.vscode) {
                const vscodeVersion = packageData.engines.vscode;
                
                // Should support modern VS Code versions (1.60+)
                if (!vscodeVersion.includes('1.') || vscodeVersion < '^1.60.0') {
                    issues.push(`Consider updating VS Code engine requirement: ${vscodeVersion}`);
                }
            } else {
                issues.push('Missing VS Code engine requirement in package.json');
                valid = false;
            }
            
            // Check for deprecated theme properties
            for (const themeFile of this.themeFiles) {
                const themePath = path.join(__dirname, themeFile);
                const themeData = JSON.parse(fs.readFileSync(themePath, 'utf8'));
                
                // Check for deprecated color keys
                const deprecatedColors = [
                    'editorIndentGuide.background',
                    'editorIndentGuide.activeBackground'
                ];
                
                deprecatedColors.forEach(colorKey => {
                    if (themeData.colors && themeData.colors[colorKey]) {
                        issues.push(`Deprecated color key in ${themeFile}: ${colorKey}`);
                    }
                });
            }
            
        } catch (error) {
            issues.push(`Failed to validate VS Code compatibility: ${error.message}`);
            valid = false;
        }
        
        return { valid, issues };
    }

    /**
     * Generate optimization recommendations
     */
    generateOptimizationRecommendations() {
        console.log('\n💡 Optimization Recommendations:');
        
        // File size recommendations
        Object.entries(this.results.performance).forEach(([theme, data]) => {
            if (data.fileSize) {
                const sizeKB = parseFloat(data.fileSize);
                if (sizeKB > 100) {
                    console.log(`  ⚠️  ${theme}: Large file size (${data.fileSize}). Consider reducing complexity.`);
                }
                
                const loadTime = parseFloat(data.totalLoadTime);
                if (loadTime > 50) {
                    console.log(`  ⚠️  ${theme}: Slow load time (${data.totalLoadTime}). Consider optimizing JSON structure.`);
                }
            }
        });
        
        // Duplicate color recommendations
        Object.entries(this.results.optimization).forEach(([theme, data]) => {
            if (data.duplicateColors && data.duplicateColors.count > 5) {
                console.log(`  💡 ${theme}: ${data.duplicateColors.count} duplicate colors found. Consider using color variables.`);
            }
        });
        
        // Cross-platform recommendations
        if (!this.results.crossPlatform.colorFormat.valid) {
            console.log('  🔧 Fix color format issues for better cross-platform compatibility');
        }
        
        if (!this.results.crossPlatform.pathSeparators.valid) {
            console.log('  🔧 Fix path separator issues for cross-platform compatibility');
        }
    }

    /**
     * Save detailed test results
     */
    saveResults() {
        const reportPath = path.join(__dirname, 'test-performance-optimization-report.json');
        const report = {
            timestamp: new Date().toISOString(),
            platform: {
                os: process.platform,
                arch: process.arch,
                nodeVersion: process.version
            },
            results: this.results
        };
        
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        console.log(`\n📊 Detailed results saved to: ${reportPath}`);
    }

    /**
     * Run all performance and compatibility tests
     */
    async runAllTests() {
        console.log('🎯 Apollo Theme Performance & Cross-Platform Compatibility Test Suite\n');
        
        await this.testThemeLoadingPerformance();
        await this.testJSONStructureOptimization();
        await this.testCrossPlatformCompatibility();
        
        this.generateOptimizationRecommendations();
        this.saveResults();
        
        console.log('\n✅ All performance and compatibility tests completed!');
        
        // Return summary
        const summary = {
            performanceTests: Object.keys(this.results.performance).length,
            optimizationIssues: Object.values(this.results.optimization).reduce((sum, opt) => 
                sum + (opt.duplicateColors?.count || 0) + (opt.structureIssues?.length || 0), 0),
            compatibilityIssues: Object.values(this.results.crossPlatform).filter(test => !test.valid).length
        };
        
        return summary;
    }
}

// Run tests if called directly
if (require.main === module) {
    const tester = new ApolloThemePerformanceTest();
    tester.runAllTests().catch(console.error);
}

module.exports = ApolloThemePerformanceTest;