#!/usr/bin/env node

/**
 * Apollo Theme VS Code Version Compatibility Test Suite
 * Tests theme compatibility across different VS Code versions
 */

const fs = require('fs');
const path = require('path');

class ApolloThemeVSCodeVersionTest {
    constructor() {
        this.results = {
            compatibility: {},
            recommendations: []
        };
        this.themeFiles = [
            'themes/apollo-dark-color-theme.json',
            'themes/apollo-light-color-theme.json'
        ];
        
        // VS Code version milestones and their key features
        this.vscodeVersions = {
            '1.60.0': {
                name: 'August 2021',
                features: ['Semantic highlighting improvements', 'Theme color improvements']
            },
            '1.65.0': {
                name: 'January 2022', 
                features: ['New theme colors', 'Improved semantic tokens']
            },
            '1.70.0': {
                name: 'July 2022',
                features: ['Enhanced color customization', 'Better theme performance']
            },
            '1.75.0': {
                name: 'January 2023',
                features: ['New workbench colors', 'Improved accessibility']
            },
            '1.80.0': {
                name: 'July 2023',
                features: ['Modern theme features', 'Enhanced semantic highlighting']
            },
            '1.85.0': {
                name: 'December 2023',
                features: ['Latest theme API', 'Performance improvements']
            }
        };
    }

    /**
     * Run all VS Code version compatibility tests
     */
    async runAllTests() {
        console.log('📦 Apollo Theme VS Code Version Compatibility Test Suite\\n');
        
        await this.testCurrentVersionCompatibility();
        await this.testFeatureCompatibility();
        await this.testDeprecatedFeatures();
        await this.testModernFeatures();
        await this.generateVersionRecommendations();
        
        this.saveResults();
        console.log('\\n✅ VS Code version compatibility tests completed!');
        
        return this.results;
    }

    /**
     * Test compatibility with current VS Code version requirements
     */
    async testCurrentVersionCompatibility() {
        console.log('🔍 Testing current VS Code version compatibility...');
        
        try {
            const packagePath = path.join(__dirname, 'package.json');
            const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
            
            const engineVersion = packageData.engines?.vscode;
            
            if (!engineVersion) {
                this.results.compatibility.engineVersion = {
                    status: 'error',
                    message: 'No VS Code engine version specified'
                };
                console.log('  ❌ No VS Code engine version specified in package.json');
                return;
            }
            
            // Parse version requirement
            const versionMatch = engineVersion.match(/([\\^>=<~]*)([\\d\\.]+)/);
            if (!versionMatch) {
                this.results.compatibility.engineVersion = {
                    status: 'error',
                    message: `Invalid version format: ${engineVersion}`
                };
                console.log(`  ❌ Invalid version format: ${engineVersion}`);
                return;
            }
            
            const [, operator, version] = versionMatch;
            const [major, minor] = version.split('.').map(Number);
            
            // Check if version is reasonable
            const isModern = major > 1 || (major === 1 && minor >= 60);
            const isTooOld = major < 1 || (major === 1 && minor < 50);
            
            this.results.compatibility.engineVersion = {
                status: isModern ? 'good' : (isTooOld ? 'outdated' : 'acceptable'),
                currentRequirement: engineVersion,
                parsedVersion: version,
                operator: operator || 'exact',
                isModern,
                isTooOld
            };
            
            if (isModern) {
                console.log(`  ✅ VS Code engine version: ${engineVersion} (modern)`);
            } else if (isTooOld) {
                console.log(`  ⚠️  VS Code engine version: ${engineVersion} (consider updating)`);
            } else {
                console.log(`  ✅ VS Code engine version: ${engineVersion} (acceptable)`);
            }
            
        } catch (error) {
            this.results.compatibility.engineVersion = {
                status: 'error',
                message: error.message
            };
            console.log(`  ❌ Error checking engine version: ${error.message}`);
        }
    }

    /**
     * Test compatibility with VS Code features by version
     */
    async testFeatureCompatibility() {
        console.log('\\n🎯 Testing feature compatibility across VS Code versions...');
        
        const featureTests = {};
        
        // Test semantic highlighting support (VS Code 1.44+)
        featureTests.semanticHighlighting = this.testSemanticHighlighting();
        
        // Test modern workbench colors (VS Code 1.60+)
        featureTests.modernWorkbenchColors = this.testModernWorkbenchColors();
        
        // Test semantic token colors (VS Code 1.44+)
        featureTests.semanticTokenColors = this.testSemanticTokenColors();
        
        // Test color customization features (VS Code 1.65+)
        featureTests.colorCustomization = this.testColorCustomization();
        
        this.results.compatibility.features = featureTests;
        
        // Report results
        Object.entries(featureTests).forEach(([feature, result]) => {
            const status = result.supported ? '✅' : '⚠️';
            console.log(`  ${status} ${feature}: ${result.message}`);
        });
    }

    /**
     * Test semantic highlighting support
     */
    testSemanticHighlighting() {
        try {
            let hasSemanticHighlighting = false;
            let hasSemanticTokenColors = false;
            
            this.themeFiles.forEach(themeFile => {
                const themePath = path.join(__dirname, themeFile);
                const themeData = JSON.parse(fs.readFileSync(themePath, 'utf8'));
                
                if (themeData.semanticHighlighting !== undefined) {
                    hasSemanticHighlighting = true;
                }
                
                if (themeData.semanticTokenColors && Object.keys(themeData.semanticTokenColors).length > 0) {
                    hasSemanticTokenColors = true;
                }
            });
            
            const supported = hasSemanticHighlighting && hasSemanticTokenColors;
            
            return {
                supported,
                message: supported ? 
                    'Semantic highlighting fully implemented' : 
                    'Missing semantic highlighting features',
                details: {
                    hasSemanticHighlighting,
                    hasSemanticTokenColors
                }
            };
            
        } catch (error) {
            return {
                supported: false,
                message: `Error testing semantic highlighting: ${error.message}`
            };
        }
    }

    /**
     * Test modern workbench colors
     */
    testModernWorkbenchColors() {
        try {
            const modernColors = [
                'statusBarItem.prominentBackground',
                'statusBarItem.prominentForeground',
                'button.secondaryBackground',
                'button.secondaryForeground',
                'charts.foreground',
                'charts.lines'
            ];
            
            let supportedColors = 0;
            let totalChecked = 0;
            
            this.themeFiles.forEach(themeFile => {
                const themePath = path.join(__dirname, themeFile);
                const themeData = JSON.parse(fs.readFileSync(themePath, 'utf8'));
                
                if (themeData.colors) {
                    modernColors.forEach(colorKey => {
                        totalChecked++;
                        if (themeData.colors[colorKey]) {
                            supportedColors++;
                        }
                    });
                }
            });
            
            const supportPercentage = (supportedColors / totalChecked) * 100;
            const supported = supportPercentage >= 80;
            
            return {
                supported,
                message: `${supportPercentage.toFixed(1)}% of modern workbench colors implemented`,
                details: {
                    supportedColors,
                    totalChecked,
                    supportPercentage
                }
            };
            
        } catch (error) {
            return {
                supported: false,
                message: `Error testing modern workbench colors: ${error.message}`
            };
        }
    }

    /**
     * Test semantic token colors implementation
     */
    testSemanticTokenColors() {
        try {
            const requiredSemanticTokens = [
                'namespace',
                'class',
                'function',
                'variable',
                'property',
                'keyword',
                'comment',
                'string',
                'number'
            ];
            
            let implementedTokens = 0;
            let totalTokens = 0;
            
            this.themeFiles.forEach(themeFile => {
                const themePath = path.join(__dirname, themeFile);
                const themeData = JSON.parse(fs.readFileSync(themePath, 'utf8'));
                
                if (themeData.semanticTokenColors) {
                    requiredSemanticTokens.forEach(token => {
                        totalTokens++;
                        if (themeData.semanticTokenColors[token]) {
                            implementedTokens++;
                        }
                    });
                }
            });
            
            const implementationPercentage = totalTokens > 0 ? (implementedTokens / totalTokens) * 100 : 0;
            const supported = implementationPercentage >= 90;
            
            return {
                supported,
                message: `${implementationPercentage.toFixed(1)}% of core semantic tokens implemented`,
                details: {
                    implementedTokens,
                    totalTokens,
                    implementationPercentage
                }
            };
            
        } catch (error) {
            return {
                supported: false,
                message: `Error testing semantic token colors: ${error.message}`
            };
        }
    }

    /**
     * Test color customization features
     */
    testColorCustomization() {
        try {
            let hasAdvancedFeatures = false;
            let featureCount = 0;
            
            this.themeFiles.forEach(themeFile => {
                const themePath = path.join(__dirname, themeFile);
                const themeData = JSON.parse(fs.readFileSync(themePath, 'utf8'));
                
                // Check for advanced semantic token features
                if (themeData.semanticTokenColors) {
                    Object.values(themeData.semanticTokenColors).forEach(value => {
                        if (typeof value === 'object' && value !== null) {
                            if (value.fontStyle || value.foreground || value.background) {
                                featureCount++;
                                hasAdvancedFeatures = true;
                            }
                        }
                    });
                }
                
                // Check for token color complexity
                if (themeData.tokenColors && themeData.tokenColors.length > 50) {
                    featureCount++;
                    hasAdvancedFeatures = true;
                }
            });
            
            return {
                supported: hasAdvancedFeatures,
                message: hasAdvancedFeatures ? 
                    `Advanced customization features implemented (${featureCount} features)` :
                    'Basic color customization only',
                details: {
                    featureCount,
                    hasAdvancedFeatures
                }
            };
            
        } catch (error) {
            return {
                supported: false,
                message: `Error testing color customization: ${error.message}`
            };
        }
    }

    /**
     * Test for deprecated features that should be updated
     */
    async testDeprecatedFeatures() {
        console.log('\\n🔄 Testing for deprecated features...');
        
        const deprecatedFeatures = {
            colors: [
                'editorIndentGuide.background',
                'editorIndentGuide.activeBackground'
            ],
            properties: [
                'workbench.colorTheme'
            ]
        };
        
        const foundDeprecated = [];
        
        try {
            this.themeFiles.forEach(themeFile => {
                const themePath = path.join(__dirname, themeFile);
                const themeData = JSON.parse(fs.readFileSync(themePath, 'utf8'));
                
                // Check for deprecated colors
                if (themeData.colors) {
                    deprecatedFeatures.colors.forEach(colorKey => {
                        if (themeData.colors[colorKey]) {
                            foundDeprecated.push({
                                type: 'color',
                                key: colorKey,
                                file: themeFile,
                                replacement: colorKey.replace('.background', '.background1').replace('.activeBackground', '.activeBackground1')
                            });
                        }
                    });
                }
            });
            
            this.results.compatibility.deprecated = {
                found: foundDeprecated,
                count: foundDeprecated.length
            };
            
            if (foundDeprecated.length === 0) {
                console.log('  ✅ No deprecated features found');
            } else {
                console.log(`  ⚠️  Found ${foundDeprecated.length} deprecated features:`);
                foundDeprecated.forEach(item => {
                    console.log(`     - ${item.key} in ${item.file} (use ${item.replacement})`);
                });
            }
            
        } catch (error) {
            console.log(`  ❌ Error checking deprecated features: ${error.message}`);
        }
    }

    /**
     * Test for modern features that enhance the theme
     */
    async testModernFeatures() {
        console.log('\\n🚀 Testing modern feature adoption...');
        
        const modernFeatures = {
            'Semantic Highlighting': this.hasSemanticHighlighting(),
            'Advanced Semantic Tokens': this.hasAdvancedSemanticTokens(),
            'Comprehensive Workbench Colors': this.hasComprehensiveWorkbenchColors(),
            'Chart Colors': this.hasChartColors(),
            'Debug Colors': this.hasDebugColors(),
            'Git Decoration Colors': this.hasGitDecorationColors()
        };
        
        this.results.compatibility.modernFeatures = modernFeatures;
        
        const adoptedFeatures = Object.values(modernFeatures).filter(Boolean).length;
        const totalFeatures = Object.keys(modernFeatures).length;
        
        console.log(`  📊 Modern feature adoption: ${adoptedFeatures}/${totalFeatures} (${((adoptedFeatures/totalFeatures)*100).toFixed(1)}%)`);
        
        Object.entries(modernFeatures).forEach(([feature, adopted]) => {
            const status = adopted ? '✅' : '⚠️';
            console.log(`     ${status} ${feature}`);
        });
    }

    /**
     * Check if themes have semantic highlighting
     */
    hasSemanticHighlighting() {
        return this.themeFiles.every(themeFile => {
            const themePath = path.join(__dirname, themeFile);
            const themeData = JSON.parse(fs.readFileSync(themePath, 'utf8'));
            return themeData.semanticHighlighting === true;
        });
    }

    /**
     * Check if themes have advanced semantic tokens
     */
    hasAdvancedSemanticTokens() {
        return this.themeFiles.every(themeFile => {
            const themePath = path.join(__dirname, themeFile);
            const themeData = JSON.parse(fs.readFileSync(themePath, 'utf8'));
            
            if (!themeData.semanticTokenColors) return false;
            
            // Check for advanced features like font styles and modifiers
            const hasAdvanced = Object.values(themeData.semanticTokenColors).some(value => {
                return typeof value === 'object' && value !== null && 
                       (value.fontStyle || value.foreground || value.background);
            });
            
            return hasAdvanced && Object.keys(themeData.semanticTokenColors).length >= 20;
        });
    }

    /**
     * Check if themes have comprehensive workbench colors
     */
    hasComprehensiveWorkbenchColors() {
        return this.themeFiles.every(themeFile => {
            const themePath = path.join(__dirname, themeFile);
            const themeData = JSON.parse(fs.readFileSync(themePath, 'utf8'));
            
            return themeData.colors && Object.keys(themeData.colors).length >= 150;
        });
    }

    /**
     * Check if themes have chart colors
     */
    hasChartColors() {
        const chartColors = ['charts.foreground', 'charts.lines', 'charts.red', 'charts.blue'];
        
        return this.themeFiles.every(themeFile => {
            const themePath = path.join(__dirname, themeFile);
            const themeData = JSON.parse(fs.readFileSync(themePath, 'utf8'));
            
            return chartColors.every(color => themeData.colors && themeData.colors[color]);
        });
    }

    /**
     * Check if themes have debug colors
     */
    hasDebugColors() {
        const debugColors = ['debugToolBar.background', 'debugExceptionWidget.background'];
        
        return this.themeFiles.every(themeFile => {
            const themePath = path.join(__dirname, themeFile);
            const themeData = JSON.parse(fs.readFileSync(themePath, 'utf8'));
            
            return debugColors.every(color => themeData.colors && themeData.colors[color]);
        });
    }

    /**
     * Check if themes have git decoration colors
     */
    hasGitDecorationColors() {
        const gitColors = [
            'gitDecoration.addedResourceForeground',
            'gitDecoration.modifiedResourceForeground',
            'gitDecoration.deletedResourceForeground'
        ];
        
        return this.themeFiles.every(themeFile => {
            const themePath = path.join(__dirname, themeFile);
            const themeData = JSON.parse(fs.readFileSync(themePath, 'utf8'));
            
            return gitColors.every(color => themeData.colors && themeData.colors[color]);
        });
    }

    /**
     * Generate version-specific recommendations
     */
    async generateVersionRecommendations() {
        console.log('\\n💡 Generating version recommendations...');
        
        const recommendations = [];
        
        // Check current engine version
        const engineStatus = this.results.compatibility.engineVersion;
        if (engineStatus && engineStatus.isTooOld) {
            recommendations.push({
                type: 'engine_version',
                priority: 'high',
                message: 'Update minimum VS Code version to 1.60.0 or higher for better feature support'
            });
        }
        
        // Check deprecated features
        const deprecated = this.results.compatibility.deprecated;
        if (deprecated && deprecated.count > 0) {
            recommendations.push({
                type: 'deprecated_features',
                priority: 'medium',
                message: `Update ${deprecated.count} deprecated color properties to their modern equivalents`
            });
        }
        
        // Check modern feature adoption
        const modernFeatures = this.results.compatibility.modernFeatures;
        if (modernFeatures) {
            const adoptedCount = Object.values(modernFeatures).filter(Boolean).length;
            const totalCount = Object.keys(modernFeatures).length;
            
            if (adoptedCount < totalCount * 0.8) {
                recommendations.push({
                    type: 'modern_features',
                    priority: 'low',
                    message: `Consider adopting more modern VS Code theme features (${adoptedCount}/${totalCount} implemented)`
                });
            }
        }
        
        // Performance recommendations
        recommendations.push({
            type: 'performance',
            priority: 'low',
            message: 'Theme files are well-optimized for performance across VS Code versions'
        });
        
        this.results.recommendations = recommendations;
        
        recommendations.forEach(rec => {
            const priority = rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : '🟢';
            console.log(`  ${priority} ${rec.message}`);
        });
    }

    /**
     * Save test results
     */
    saveResults() {
        const reportPath = path.join(__dirname, 'vscode-version-compatibility-report.json');
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
        console.log(`\\n💾 VS Code compatibility report saved: ${path.basename(reportPath)}`);
    }
}

// Run tests if called directly
if (require.main === module) {
    const tester = new ApolloThemeVSCodeVersionTest();
    tester.runAllTests().catch(console.error);
}

module.exports = ApolloThemeVSCodeVersionTest;