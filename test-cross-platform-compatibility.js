#!/usr/bin/env node

/**
 * Apollo Theme Cross-Platform Compatibility Test Suite
 * Tests theme compatibility across Windows, macOS, and Linux platforms
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

class ApolloThemeCrossPlatformTest {
    constructor() {
        this.results = {
            platform: {
                os: process.platform,
                arch: process.arch,
                nodeVersion: process.version,
                hostname: os.hostname()
            },
            tests: {}
        };
        this.themeFiles = [
            'themes/apollo-dark-color-theme.json',
            'themes/apollo-light-color-theme.json'
        ];
    }

    /**
     * Run all cross-platform compatibility tests
     */
    async runAllTests() {
        console.log('🌍 Apollo Theme Cross-Platform Compatibility Test Suite\n');
        console.log(`Platform: ${this.results.platform.os} (${this.results.platform.arch})`);
        console.log(`Node.js: ${this.results.platform.nodeVersion}\n`);
        
        await this.testFileSystemCompatibility();
        await this.testColorFormatCompatibility();
        await this.testFontRenderingCompatibility();
        await this.testVSCodeVersionCompatibility();
        await this.testExtensionPackaging();
        await this.testPerformanceAcrossPlatforms();
        
        this.generateCompatibilityReport();
        console.log('\n✅ Cross-platform compatibility tests completed!');
        
        return this.results;
    }

    /**
     * Test file system compatibility (paths, case sensitivity, etc.)
     */
    async testFileSystemCompatibility() {
        console.log('📁 Testing file system compatibility...');
        
        const tests = {
            pathSeparators: this.testPathSeparators(),
            caseSensitivity: this.testCaseSensitivity(),
            filePermissions: this.testFilePermissions(),
            longPaths: this.testLongPathSupport()
        };
        
        this.results.tests.fileSystem = tests;
        
        const passed = Object.values(tests).filter(test => test.passed).length;
        const total = Object.keys(tests).length;
        
        console.log(`  ✅ File system tests: ${passed}/${total} passed`);
        
        if (tests.pathSeparators.passed) {
            console.log('    ✓ Path separators compatible');
        } else {
            console.log('    ✗ Path separator issues found');
        }
        
        if (tests.caseSensitivity.passed) {
            console.log('    ✓ Case sensitivity handled correctly');
        } else {
            console.log('    ✗ Case sensitivity issues found');
        }
    }

    /**
     * Test path separator compatibility
     */
    testPathSeparators() {
        const issues = [];
        let passed = true;
        
        try {
            // Check package.json theme paths
            const packagePath = path.join(__dirname, 'package.json');
            if (fs.existsSync(packagePath)) {
                const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
                
                if (packageData.contributes && packageData.contributes.themes) {
                    packageData.contributes.themes.forEach(theme => {
                        if (theme.path) {
                            // Check for Windows-style backslashes
                            if (theme.path.includes('\\\\')) {
                                issues.push(`Windows-style path separators found: ${theme.path}`);
                                passed = false;
                            }
                            
                            // Verify path exists using cross-platform path resolution
                            const resolvedPath = path.resolve(__dirname, theme.path);
                            if (!fs.existsSync(resolvedPath)) {
                                issues.push(`Theme file not found at resolved path: ${resolvedPath}`);
                                passed = false;
                            }
                        }
                    });
                }
            }
            
            // Test theme file paths
            this.themeFiles.forEach(themeFile => {
                const fullPath = path.join(__dirname, themeFile);
                if (!fs.existsSync(fullPath)) {
                    issues.push(`Theme file not accessible: ${themeFile}`);
                    passed = false;
                }
            });
            
        } catch (error) {
            issues.push(`Path separator test failed: ${error.message}`);
            passed = false;
        }
        
        return { passed, issues };
    }

    /**
     * Test case sensitivity handling
     */
    testCaseSensitivity() {
        const issues = [];
        let passed = true;
        
        try {
            // Test if file system is case sensitive
            const testFile = path.join(__dirname, 'test-case-sensitivity.tmp');
            const testFileUpper = path.join(__dirname, 'TEST-CASE-SENSITIVITY.TMP');
            
            fs.writeFileSync(testFile, 'test');
            
            const isCaseSensitive = !fs.existsSync(testFileUpper);
            
            // Clean up
            if (fs.existsSync(testFile)) fs.unlinkSync(testFile);
            if (fs.existsSync(testFileUpper)) fs.unlinkSync(testFileUpper);
            
            // Check theme file references for consistent casing
            this.themeFiles.forEach(themeFile => {
                const fileName = path.basename(themeFile);
                
                // Check for mixed case in file names
                if (fileName !== fileName.toLowerCase() && isCaseSensitive) {
                    issues.push(`Mixed case filename on case-sensitive system: ${fileName}`);
                }
            });
            
            // Check package.json references
            const packagePath = path.join(__dirname, 'package.json');
            if (fs.existsSync(packagePath)) {
                const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
                
                if (packageData.contributes && packageData.contributes.themes) {
                    packageData.contributes.themes.forEach(theme => {
                        if (theme.path) {
                            const actualPath = path.join(__dirname, theme.path);
                            const actualFileName = path.basename(actualPath);
                            const referencedFileName = path.basename(theme.path);
                            
                            if (actualFileName !== referencedFileName && isCaseSensitive) {
                                issues.push(`Case mismatch: referenced "${referencedFileName}" vs actual "${actualFileName}"`);
                                passed = false;
                            }
                        }
                    });
                }
            }
            
        } catch (error) {
            issues.push(`Case sensitivity test failed: ${error.message}`);
            passed = false;
        }
        
        return { passed, issues, isCaseSensitive: passed };
    }

    /**
     * Test file permissions
     */
    testFilePermissions() {
        const issues = [];
        let passed = true;
        
        try {
            this.themeFiles.forEach(themeFile => {
                const fullPath = path.join(__dirname, themeFile);
                
                if (fs.existsSync(fullPath)) {
                    const stats = fs.statSync(fullPath);
                    
                    // Check if file is readable
                    try {
                        fs.accessSync(fullPath, fs.constants.R_OK);
                    } catch (error) {
                        issues.push(`File not readable: ${themeFile}`);
                        passed = false;
                    }
                    
                    // Check file permissions (Unix-like systems)
                    if (process.platform !== 'win32') {
                        const mode = stats.mode;
                        const permissions = (mode & parseInt('777', 8)).toString(8);
                        
                        // Should be readable by owner, group, and others
                        if (!permissions.includes('4')) {
                            issues.push(`Insufficient read permissions for ${themeFile}: ${permissions}`);
                        }
                    }
                }
            });
            
        } catch (error) {
            issues.push(`File permissions test failed: ${error.message}`);
            passed = false;
        }
        
        return { passed, issues };
    }

    /**
     * Test long path support (Windows specific)
     */
    testLongPathSupport() {
        const issues = [];
        let passed = true;
        
        try {
            // Test if current paths are within reasonable limits
            this.themeFiles.forEach(themeFile => {
                const fullPath = path.resolve(__dirname, themeFile);
                
                // Windows has a 260 character limit for paths (unless long path support is enabled)
                if (process.platform === 'win32' && fullPath.length > 250) {
                    issues.push(`Path may be too long for Windows: ${fullPath} (${fullPath.length} chars)`);
                }
                
                // General recommendation: keep paths under 200 characters
                if (fullPath.length > 200) {
                    issues.push(`Long path detected: ${fullPath} (${fullPath.length} chars)`);
                }
            });
            
        } catch (error) {
            issues.push(`Long path test failed: ${error.message}`);
            passed = false;
        }
        
        return { passed, issues };
    }

    /**
     * Test color format compatibility across platforms
     */
    async testColorFormatCompatibility() {
        console.log('🎨 Testing color format compatibility...');
        
        const tests = {
            hexFormat: this.testHexColorFormat(),
            alphaSupport: this.testAlphaChannelSupport(),
            colorConsistency: this.testColorConsistency()
        };
        
        this.results.tests.colorFormat = tests;
        
        const passed = Object.values(tests).filter(test => test.passed).length;
        const total = Object.keys(tests).length;
        
        console.log(`  ✅ Color format tests: ${passed}/${total} passed`);
    }

    /**
     * Test hex color format consistency
     */
    testHexColorFormat() {
        const issues = [];
        let passed = true;
        
        try {
            this.themeFiles.forEach(themeFile => {
                const themePath = path.join(__dirname, themeFile);
                const themeData = JSON.parse(fs.readFileSync(themePath, 'utf8'));
                
                // Check all color values
                this.checkColorsInObject(themeData.colors, `${themeFile}:colors`, issues);
                
                if (themeData.tokenColors) {
                    themeData.tokenColors.forEach((token, index) => {
                        if (token.settings) {
                            this.checkColorsInObject(token.settings, `${themeFile}:tokenColors[${index}].settings`, issues);
                        }
                    });
                }
                
                if (themeData.semanticTokenColors) {
                    this.checkSemanticTokenColors(themeData.semanticTokenColors, `${themeFile}:semanticTokenColors`, issues);
                }
            });
            
            if (issues.length > 0) {
                passed = false;
            }
            
        } catch (error) {
            issues.push(`Hex color format test failed: ${error.message}`);
            passed = false;
        }
        
        return { passed, issues };
    }

    /**
     * Check colors in an object for format issues
     */
    checkColorsInObject(obj, context, issues) {
        if (!obj) return;
        
        Object.entries(obj).forEach(([key, value]) => {
            if (typeof value === 'string' && value.startsWith('#')) {
                // Check hex format
                if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(value)) {
                    issues.push(`Invalid hex color format in ${context}.${key}: ${value}`);
                }
                
                // Check for consistent case (should be lowercase)
                if (value !== value.toLowerCase()) {
                    issues.push(`Color should be lowercase in ${context}.${key}: ${value}`);
                }
                
                // Check for unnecessary alpha channel (FF at end)
                if (value.length === 9 && value.toLowerCase().endsWith('ff')) {
                    issues.push(`Unnecessary alpha channel in ${context}.${key}: ${value} (use 6-digit hex instead)`);
                }
            }
        });
    }

    /**
     * Check semantic token colors
     */
    checkSemanticTokenColors(semanticColors, context, issues) {
        Object.entries(semanticColors).forEach(([key, value]) => {
            if (typeof value === 'string' && value.startsWith('#')) {
                this.checkColorsInObject({ [key]: value }, context, issues);
            } else if (typeof value === 'object' && value !== null) {
                this.checkColorsInObject(value, `${context}.${key}`, issues);
            }
        });
    }

    /**
     * Test alpha channel support
     */
    testAlphaChannelSupport() {
        const issues = [];
        let passed = true;
        let alphaColorsFound = 0;
        
        try {
            this.themeFiles.forEach(themeFile => {
                const themePath = path.join(__dirname, themeFile);
                const themeData = JSON.parse(fs.readFileSync(themePath, 'utf8'));
                
                // Count alpha channel usage
                if (themeData.colors) {
                    Object.entries(themeData.colors).forEach(([key, value]) => {
                        if (typeof value === 'string' && value.length === 9 && value.startsWith('#')) {
                            alphaColorsFound++;
                            
                            // Check if alpha value is valid
                            const alpha = value.substring(7, 9);
                            if (!/^[A-Fa-f0-9]{2}$/.test(alpha)) {
                                issues.push(`Invalid alpha channel in ${themeFile}:${key}: ${value}`);
                                passed = false;
                            }
                        }
                    });
                }
            });
            
        } catch (error) {
            issues.push(`Alpha channel test failed: ${error.message}`);
            passed = false;
        }
        
        return { passed, issues, alphaColorsFound };
    }

    /**
     * Test color consistency between themes
     */
    testColorConsistency() {
        const issues = [];
        let passed = true;
        
        try {
            if (this.themeFiles.length >= 2) {
                const themes = this.themeFiles.map(file => {
                    const themePath = path.join(__dirname, file);
                    return {
                        name: path.basename(file, '.json'),
                        data: JSON.parse(fs.readFileSync(themePath, 'utf8'))
                    };
                });
                
                // Check if both themes have similar structure
                const darkTheme = themes.find(t => t.data.type === 'dark');
                const lightTheme = themes.find(t => t.data.type === 'light');
                
                if (darkTheme && lightTheme) {
                    // Compare color keys
                    const darkKeys = Object.keys(darkTheme.data.colors || {});
                    const lightKeys = Object.keys(lightTheme.data.colors || {});
                    
                    const missingInLight = darkKeys.filter(key => !lightKeys.includes(key));
                    const missingInDark = lightKeys.filter(key => !darkKeys.includes(key));
                    
                    if (missingInLight.length > 0) {
                        issues.push(`Colors missing in light theme: ${missingInLight.join(', ')}`);
                    }
                    
                    if (missingInDark.length > 0) {
                        issues.push(`Colors missing in dark theme: ${missingInDark.join(', ')}`);
                    }
                    
                    // Compare token color structure
                    const darkTokens = darkTheme.data.tokenColors?.length || 0;
                    const lightTokens = lightTheme.data.tokenColors?.length || 0;
                    
                    if (Math.abs(darkTokens - lightTokens) > 2) {
                        issues.push(`Significant difference in token color count: dark=${darkTokens}, light=${lightTokens}`);
                    }
                }
            }
            
            if (issues.length > 0) {
                passed = false;
            }
            
        } catch (error) {
            issues.push(`Color consistency test failed: ${error.message}`);
            passed = false;
        }
        
        return { passed, issues };
    }

    /**
     * Test font rendering compatibility
     */
    async testFontRenderingCompatibility() {
        console.log('🔤 Testing font rendering compatibility...');
        
        const tests = {
            fontStyles: this.testFontStyles(),
            unicodeSupport: this.testUnicodeSupport(),
            fontFallbacks: this.testFontFallbacks()
        };
        
        this.results.tests.fontRendering = tests;
        
        const passed = Object.values(tests).filter(test => test.passed).length;
        const total = Object.keys(tests).length;
        
        console.log(`  ✅ Font rendering tests: ${passed}/${total} passed`);
    }

    /**
     * Test font style compatibility
     */
    testFontStyles() {
        const issues = [];
        let passed = true;
        
        try {
            const validFontStyles = ['normal', 'italic', 'bold', 'underline', 'strikethrough'];
            
            this.themeFiles.forEach(themeFile => {
                const themePath = path.join(__dirname, themeFile);
                const themeData = JSON.parse(fs.readFileSync(themePath, 'utf8'));
                
                // Check token color font styles
                if (themeData.tokenColors) {
                    themeData.tokenColors.forEach((token, index) => {
                        if (token.settings && token.settings.fontStyle) {
                            const styles = token.settings.fontStyle.split(' ');
                            
                            styles.forEach(style => {
                                if (!validFontStyles.includes(style.trim())) {
                                    issues.push(`Invalid font style in ${themeFile}:tokenColors[${index}]: ${style}`);
                                    passed = false;
                                }
                            });
                        }
                    });
                }
                
                // Check semantic token font styles
                if (themeData.semanticTokenColors) {
                    Object.entries(themeData.semanticTokenColors).forEach(([key, value]) => {
                        if (value && typeof value === 'object' && value.fontStyle) {
                            const styles = value.fontStyle.split(' ');
                            
                            styles.forEach(style => {
                                if (!validFontStyles.includes(style.trim())) {
                                    issues.push(`Invalid semantic font style in ${themeFile}:${key}: ${style}`);
                                    passed = false;
                                }
                            });
                        }
                    });
                }
            });
            
        } catch (error) {
            issues.push(`Font style test failed: ${error.message}`);
            passed = false;
        }
        
        return { passed, issues };
    }

    /**
     * Test Unicode support in theme names and descriptions
     */
    testUnicodeSupport() {
        const issues = [];
        let passed = true;
        
        try {
            this.themeFiles.forEach(themeFile => {
                const themePath = path.join(__dirname, themeFile);
                const themeData = JSON.parse(fs.readFileSync(themePath, 'utf8'));
                
                // Check theme name for problematic characters
                if (themeData.name) {
                    // Check for non-ASCII characters that might cause issues
                    if (!/^[\x20-\x7E]*$/.test(themeData.name)) {
                        issues.push(`Non-ASCII characters in theme name: ${themeData.name}`);
                    }
                }
                
                // Check token names for Unicode issues
                if (themeData.tokenColors) {
                    themeData.tokenColors.forEach((token, index) => {
                        if (token.name && !/^[\x20-\x7E]*$/.test(token.name)) {
                            issues.push(`Non-ASCII characters in token name ${index}: ${token.name}`);
                        }
                    });
                }
            });
            
        } catch (error) {
            issues.push(`Unicode support test failed: ${error.message}`);
            passed = false;
        }
        
        return { passed, issues };
    }

    /**
     * Test font fallback compatibility
     */
    testFontFallbacks() {
        const issues = [];
        let passed = true;
        
        // This is more of a documentation check since themes don't directly specify fonts
        // VS Code handles font fallbacks, but we can check for any font-related properties
        
        try {
            // Check if there are any font family specifications (which there shouldn't be in color themes)
            this.themeFiles.forEach(themeFile => {
                const themePath = path.join(__dirname, themeFile);
                const content = fs.readFileSync(themePath, 'utf8');
                
                // Look for font-family properties (which shouldn't exist in color themes)
                if (content.includes('fontFamily') || content.includes('font-family')) {
                    issues.push(`Font family specification found in color theme: ${themeFile}`);
                    passed = false;
                }
            });
            
        } catch (error) {
            issues.push(`Font fallback test failed: ${error.message}`);
            passed = false;
        }
        
        return { passed, issues };
    }

    /**
     * Test VS Code version compatibility
     */
    async testVSCodeVersionCompatibility() {
        console.log('📦 Testing VS Code version compatibility...');
        
        const tests = {
            engineVersion: this.testEngineVersion(),
            apiCompatibility: this.testAPICompatibility(),
            deprecatedFeatures: this.testDeprecatedFeatures()
        };
        
        this.results.tests.vscodeCompatibility = tests;
        
        const passed = Object.values(tests).filter(test => test.passed).length;
        const total = Object.keys(tests).length;
        
        console.log(`  ✅ VS Code compatibility tests: ${passed}/${total} passed`);
    }

    /**
     * Test engine version requirements
     */
    testEngineVersion() {
        const issues = [];
        let passed = true;
        
        try {
            const packagePath = path.join(__dirname, 'package.json');
            
            if (fs.existsSync(packagePath)) {
                const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
                
                if (packageData.engines && packageData.engines.vscode) {
                    const vscodeVersion = packageData.engines.vscode;
                    
                    // Check if version is reasonable (should support modern VS Code)
                    if (!vscodeVersion.includes('^1.') && !vscodeVersion.includes('>=1.')) {
                        issues.push(`Unusual VS Code engine version: ${vscodeVersion}`);
                    }
                    
                    // Extract version number
                    const versionMatch = vscodeVersion.match(/\\d+\\.\\d+/);
                    if (versionMatch) {
                        const [major, minor] = versionMatch[0].split('.').map(Number);
                        
                        // Should support at least VS Code 1.60 for modern features
                        if (major < 1 || (major === 1 && minor < 60)) {
                            issues.push(`Consider updating minimum VS Code version (currently ${versionMatch[0]}, recommend 1.60+)`);
                        }
                    }
                } else {
                    issues.push('Missing VS Code engine version in package.json');
                    passed = false;
                }
            } else {
                issues.push('package.json not found');
                passed = false;
            }
            
        } catch (error) {
            issues.push(`Engine version test failed: ${error.message}`);
            passed = false;
        }
        
        return { passed, issues };
    }

    /**
     * Test API compatibility
     */
    testAPICompatibility() {
        const issues = [];
        let passed = true;
        
        try {
            // Check for use of modern theme features
            this.themeFiles.forEach(themeFile => {
                const themePath = path.join(__dirname, themeFile);
                const themeData = JSON.parse(fs.readFileSync(themePath, 'utf8'));
                
                // Check for semantic highlighting (modern feature)
                if (themeData.semanticHighlighting === undefined) {
                    issues.push(`Consider adding semanticHighlighting property to ${themeFile}`);
                }
                
                // Check for semantic token colors (modern feature)
                if (!themeData.semanticTokenColors) {
                    issues.push(`Consider adding semanticTokenColors to ${themeFile}`);
                }
            });
            
        } catch (error) {
            issues.push(`API compatibility test failed: ${error.message}`);
            passed = false;
        }
        
        return { passed, issues };
    }

    /**
     * Test for deprecated features
     */
    testDeprecatedFeatures() {
        const issues = [];
        let passed = true;
        
        try {
            const deprecatedColors = [
                'editorIndentGuide.background',
                'editorIndentGuide.activeBackground'
            ];
            
            this.themeFiles.forEach(themeFile => {
                const themePath = path.join(__dirname, themeFile);
                const themeData = JSON.parse(fs.readFileSync(themePath, 'utf8'));
                
                if (themeData.colors) {
                    deprecatedColors.forEach(colorKey => {
                        if (themeData.colors[colorKey]) {
                            issues.push(`Deprecated color key in ${themeFile}: ${colorKey}`);
                            passed = false;
                        }
                    });
                }
            });
            
        } catch (error) {
            issues.push(`Deprecated features test failed: ${error.message}`);
            passed = false;
        }
        
        return { passed, issues };
    }

    /**
     * Test extension packaging
     */
    async testExtensionPackaging() {
        console.log('📦 Testing extension packaging compatibility...');
        
        const tests = {
            packageStructure: this.testPackageStructure(),
            manifestValidation: this.testManifestValidation(),
            assetValidation: this.testAssetValidation()
        };
        
        this.results.tests.packaging = tests;
        
        const passed = Object.values(tests).filter(test => test.passed).length;
        const total = Object.keys(tests).length;
        
        console.log(`  ✅ Packaging tests: ${passed}/${total} passed`);
    }

    /**
     * Test package structure
     */
    testPackageStructure() {
        const issues = [];
        let passed = true;
        
        try {
            const requiredFiles = [
                'package.json',
                'README.md'
            ];
            
            const recommendedFiles = [
                'CHANGELOG.md',
                'LICENSE'
            ];
            
            // Check required files
            requiredFiles.forEach(file => {
                if (!fs.existsSync(path.join(__dirname, file))) {
                    issues.push(`Missing required file: ${file}`);
                    passed = false;
                }
            });
            
            // Check recommended files
            recommendedFiles.forEach(file => {
                if (!fs.existsSync(path.join(__dirname, file))) {
                    issues.push(`Missing recommended file: ${file}`);
                }
            });
            
            // Check theme files exist
            this.themeFiles.forEach(themeFile => {
                if (!fs.existsSync(path.join(__dirname, themeFile))) {
                    issues.push(`Missing theme file: ${themeFile}`);
                    passed = false;
                }
            });
            
        } catch (error) {
            issues.push(`Package structure test failed: ${error.message}`);
            passed = false;
        }
        
        return { passed, issues };
    }

    /**
     * Test manifest validation
     */
    testManifestValidation() {
        const issues = [];
        let passed = true;
        
        try {
            const packagePath = path.join(__dirname, 'package.json');
            
            if (fs.existsSync(packagePath)) {
                const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
                
                // Check required fields
                const requiredFields = ['name', 'version', 'engines', 'categories', 'contributes'];
                
                requiredFields.forEach(field => {
                    if (!packageData[field]) {
                        issues.push(`Missing required field in package.json: ${field}`);
                        passed = false;
                    }
                });
                
                // Check categories
                if (packageData.categories && !packageData.categories.includes('Themes')) {
                    issues.push('Package should include "Themes" in categories');
                    passed = false;
                }
                
                // Check theme contributions
                if (packageData.contributes && packageData.contributes.themes) {
                    packageData.contributes.themes.forEach((theme, index) => {
                        if (!theme.label) {
                            issues.push(`Missing label for theme ${index}`);
                            passed = false;
                        }
                        
                        if (!theme.uiTheme) {
                            issues.push(`Missing uiTheme for theme ${index}`);
                            passed = false;
                        }
                        
                        if (!theme.path) {
                            issues.push(`Missing path for theme ${index}`);
                            passed = false;
                        }
                    });
                }
                
            } else {
                issues.push('package.json not found');
                passed = false;
            }
            
        } catch (error) {
            issues.push(`Manifest validation failed: ${error.message}`);
            passed = false;
        }
        
        return { passed, issues };
    }

    /**
     * Test asset validation
     */
    testAssetValidation() {
        const issues = [];
        let passed = true;
        
        try {
            // Check for icon
            const iconPaths = ['icon.png', 'assets/icon.png', 'images/icon.png'];
            let iconFound = false;
            
            iconPaths.forEach(iconPath => {
                if (fs.existsSync(path.join(__dirname, iconPath))) {
                    iconFound = true;
                }
            });
            
            if (!iconFound) {
                issues.push('No extension icon found (recommended: icon.png)');
            }
            
            // Check README content
            const readmePath = path.join(__dirname, 'README.md');
            if (fs.existsSync(readmePath)) {
                const readmeContent = fs.readFileSync(readmePath, 'utf8');
                
                if (readmeContent.length < 100) {
                    issues.push('README.md is very short, consider adding more documentation');
                }
                
                if (!readmeContent.toLowerCase().includes('installation')) {
                    issues.push('README.md should include installation instructions');
                }
            }
            
        } catch (error) {
            issues.push(`Asset validation failed: ${error.message}`);
            passed = false;
        }
        
        return { passed, issues };
    }

    /**
     * Test performance across platforms
     */
    async testPerformanceAcrossPlatforms() {
        console.log('⚡ Testing performance characteristics...');
        
        const tests = {
            loadTime: this.testLoadTime(),
            memoryUsage: this.testMemoryUsage(),
            fileSize: this.testFileSize()
        };
        
        this.results.tests.performance = tests;
        
        console.log(`  ✅ Performance tests completed`);
    }

    /**
     * Test theme load time
     */
    testLoadTime() {
        const results = {};
        let passed = true;
        
        try {
            this.themeFiles.forEach(themeFile => {
                const themePath = path.join(__dirname, themeFile);
                const themeName = path.basename(themeFile, '.json');
                
                const startTime = process.hrtime.bigint();
                const content = fs.readFileSync(themePath, 'utf8');
                JSON.parse(content);
                const endTime = process.hrtime.bigint();
                
                const loadTimeMs = Number(endTime - startTime) / 1000000;
                results[themeName] = {
                    loadTime: `${loadTimeMs.toFixed(2)}ms`,
                    acceptable: loadTimeMs < 50
                };
                
                if (loadTimeMs >= 50) {
                    passed = false;
                }
            });
            
        } catch (error) {
            results.error = error.message;
            passed = false;
        }
        
        return { passed, results };
    }

    /**
     * Test memory usage
     */
    testMemoryUsage() {
        const results = {};
        let passed = true;
        
        try {
            this.themeFiles.forEach(themeFile => {
                const themePath = path.join(__dirname, themeFile);
                const themeName = path.basename(themeFile, '.json');
                
                const memBefore = process.memoryUsage();
                const content = fs.readFileSync(themePath, 'utf8');
                const themeData = JSON.parse(content);
                const memAfter = process.memoryUsage();
                
                const memoryUsed = memAfter.heapUsed - memBefore.heapUsed;
                results[themeName] = {
                    memoryUsed: `${(memoryUsed / 1024).toFixed(2)}KB`,
                    acceptable: memoryUsed < 1024 * 100 // Less than 100KB
                };
                
                if (memoryUsed >= 1024 * 100) {
                    passed = false;
                }
            });
            
        } catch (error) {
            results.error = error.message;
            passed = false;
        }
        
        return { passed, results };
    }

    /**
     * Test file size
     */
    testFileSize() {
        const results = {};
        let passed = true;
        
        try {
            this.themeFiles.forEach(themeFile => {
                const themePath = path.join(__dirname, themeFile);
                const themeName = path.basename(themeFile, '.json');
                
                const stats = fs.statSync(themePath);
                const sizeKB = stats.size / 1024;
                
                results[themeName] = {
                    fileSize: `${sizeKB.toFixed(2)}KB`,
                    acceptable: sizeKB < 200 // Less than 200KB
                };
                
                if (sizeKB >= 200) {
                    passed = false;
                }
            });
            
        } catch (error) {
            results.error = error.message;
            passed = false;
        }
        
        return { passed, results };
    }

    /**
     * Generate comprehensive compatibility report
     */
    generateCompatibilityReport() {
        console.log('\\n📊 Cross-Platform Compatibility Report:');
        
        const allTests = Object.values(this.results.tests);
        const allSubTests = allTests.flatMap(test => Object.values(test));
        const passedTests = allSubTests.filter(test => test.passed).length;
        const totalTests = allSubTests.length;
        
        console.log(`  📈 Overall compatibility: ${passedTests}/${totalTests} tests passed`);
        
        // Platform-specific recommendations
        if (this.results.platform.os === 'win32') {
            console.log('  🪟 Windows-specific recommendations:');
            console.log('    - Ensure paths use forward slashes');
            console.log('    - Test with Windows Defender enabled');
            console.log('    - Verify long path support if needed');
        } else if (this.results.platform.os === 'darwin') {
            console.log('  🍎 macOS-specific recommendations:');
            console.log('    - Test with case-sensitive file systems');
            console.log('    - Verify Retina display compatibility');
        } else if (this.results.platform.os === 'linux') {
            console.log('  🐧 Linux-specific recommendations:');
            console.log('    - Test with different desktop environments');
            console.log('    - Verify font rendering across distributions');
        }
        
        // Save detailed report
        const reportPath = path.join(__dirname, 'cross-platform-compatibility-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
        console.log(`  💾 Detailed report saved: ${path.basename(reportPath)}`);
    }
}

// Run tests if called directly
if (require.main === module) {
    const tester = new ApolloThemeCrossPlatformTest();
    tester.runAllTests().catch(console.error);
}

module.exports = ApolloThemeCrossPlatformTest;