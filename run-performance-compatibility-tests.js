#!/usr/bin/env node

/**
 * Apollo Theme Performance and Cross-Platform Compatibility Test Runner
 * Runs all performance optimization and compatibility tests
 */

const ApolloThemePerformanceTest = require('./test-performance-optimization');
const ApolloThemeCrossPlatformTest = require('./test-cross-platform-compatibility');
const ApolloThemeVSCodeVersionTest = require('./test-vscode-versions');
const ApolloThemeOptimizer = require('./optimize-theme-structure');

class ApolloThemeTestRunner {
    constructor() {
        this.results = {
            performance: null,
            crossPlatform: null,
            vscodeVersions: null,
            optimization: null,
            summary: {}
        };
    }

    /**
     * Run all performance and compatibility tests
     */
    async runAllTests() {
        console.log('🎯 Apollo Theme Complete Performance & Compatibility Test Suite');
        console.log('================================================================\n');
        
        try {
            // 1. Performance Tests
            console.log('1️⃣ Running Performance Tests...');
            const performanceTester = new ApolloThemePerformanceTest();
            this.results.performance = await performanceTester.runAllTests();
            
            console.log('\n' + '='.repeat(60) + '\n');
            
            // 2. Cross-Platform Compatibility Tests
            console.log('2️⃣ Running Cross-Platform Compatibility Tests...');
            const crossPlatformTester = new ApolloThemeCrossPlatformTest();
            this.results.crossPlatform = await crossPlatformTester.runAllTests();
            
            console.log('\n' + '='.repeat(60) + '\n');
            
            // 3. VS Code Version Compatibility Tests
            console.log('3️⃣ Running VS Code Version Compatibility Tests...');
            const vscodeVersionTester = new ApolloThemeVSCodeVersionTest();
            this.results.vscodeVersions = await vscodeVersionTester.runAllTests();
            
            console.log('\n' + '='.repeat(60) + '\n');
            
            // 4. Theme Optimization
            console.log('4️⃣ Running Theme Optimization...');
            const optimizer = new ApolloThemeOptimizer();
            await optimizer.optimizeAllThemes();
            
            console.log('\n' + '='.repeat(60) + '\n');
            
            // 5. Generate Summary Report
            this.generateSummaryReport();
            
        } catch (error) {
            console.error('❌ Test suite failed:', error.message);
            process.exit(1);
        }
    }

    /**
     * Generate comprehensive summary report
     */
    generateSummaryReport() {
        console.log('📊 COMPREHENSIVE TEST SUMMARY');
        console.log('============================\n');
        
        // Performance Summary
        if (this.results.performance) {
            console.log('🚀 Performance Results:');
            console.log(`   • Performance tests: ${this.results.performance.performanceTests || 0} themes tested`);
            console.log(`   • Optimization issues: ${this.results.performance.optimizationIssues || 0} found`);
            console.log(`   • Compatibility issues: ${this.results.performance.compatibilityIssues || 0} found`);
        }
        
        // Cross-Platform Summary
        if (this.results.crossPlatform && this.results.crossPlatform.tests) {
            const allTests = Object.values(this.results.crossPlatform.tests);
            const allSubTests = allTests.flatMap(test => Object.values(test));
            const passedTests = allSubTests.filter(test => test.passed).length;
            const totalTests = allSubTests.length;
            
            console.log('\\n🌍 Cross-Platform Compatibility:');
            console.log(`   • Overall compatibility: ${passedTests}/${totalTests} tests passed`);
            console.log(`   • Platform: ${this.results.crossPlatform.platform.os} (${this.results.crossPlatform.platform.arch})`);
        }
        
        // VS Code Version Summary
        if (this.results.vscodeVersions && this.results.vscodeVersions.compatibility) {
            const compat = this.results.vscodeVersions.compatibility;
            
            console.log('\\n📦 VS Code Version Compatibility:');
            
            if (compat.engineVersion) {
                console.log(`   • Engine version: ${compat.engineVersion.currentRequirement} (${compat.engineVersion.status})`);
            }
            
            if (compat.modernFeatures) {
                const adoptedFeatures = Object.values(compat.modernFeatures).filter(Boolean).length;
                const totalFeatures = Object.keys(compat.modernFeatures).length;
                console.log(`   • Modern features: ${adoptedFeatures}/${totalFeatures} adopted`);
            }
            
            if (compat.deprecated) {
                console.log(`   • Deprecated features: ${compat.deprecated.count} found`);
            }
        }
        
        // Overall Assessment
        console.log('\\n🎯 Overall Assessment:');
        
        const issues = this.collectAllIssues();
        const criticalIssues = issues.filter(issue => issue.severity === 'critical').length;
        const warningIssues = issues.filter(issue => issue.severity === 'warning').length;
        const infoIssues = issues.filter(issue => issue.severity === 'info').length;
        
        console.log(`   • Critical issues: ${criticalIssues}`);
        console.log(`   • Warning issues: ${warningIssues}`);
        console.log(`   • Info issues: ${infoIssues}`);
        
        // Performance Rating
        const performanceRating = this.calculatePerformanceRating();
        console.log(`   • Performance rating: ${performanceRating}/5 ⭐`);
        
        // Compatibility Rating
        const compatibilityRating = this.calculateCompatibilityRating();
        console.log(`   • Compatibility rating: ${compatibilityRating}/5 ⭐`);
        
        // Recommendations
        this.generateRecommendations();
        
        // Save comprehensive report
        this.saveComprehensiveReport();
    }

    /**
     * Collect all issues from different test suites
     */
    collectAllIssues() {
        const issues = [];
        
        // Performance issues
        if (this.results.performance) {
            if (this.results.performance.optimizationIssues > 5) {
                issues.push({
                    type: 'performance',
                    severity: 'warning',
                    message: 'Multiple optimization opportunities found'
                });
            }
        }
        
        // Cross-platform issues
        if (this.results.crossPlatform && this.results.crossPlatform.tests) {
            Object.entries(this.results.crossPlatform.tests).forEach(([category, tests]) => {
                Object.entries(tests).forEach(([testName, result]) => {
                    if (!result.passed && result.issues) {
                        result.issues.forEach(issue => {
                            issues.push({
                                type: 'cross-platform',
                                category,
                                testName,
                                severity: 'warning',
                                message: issue
                            });
                        });
                    }
                });
            });
        }
        
        // VS Code version issues
        if (this.results.vscodeVersions && this.results.vscodeVersions.recommendations) {
            this.results.vscodeVersions.recommendations.forEach(rec => {
                issues.push({
                    type: 'vscode-version',
                    severity: rec.priority === 'high' ? 'critical' : rec.priority === 'medium' ? 'warning' : 'info',
                    message: rec.message
                });
            });
        }
        
        return issues;
    }

    /**
     * Calculate performance rating (1-5 stars)
     */
    calculatePerformanceRating() {
        let score = 5;
        
        // Deduct points for performance issues
        if (this.results.performance) {
            if (this.results.performance.optimizationIssues > 10) score -= 2;
            else if (this.results.performance.optimizationIssues > 5) score -= 1;
            
            if (this.results.performance.compatibilityIssues > 5) score -= 1;
        }
        
        return Math.max(1, score);
    }

    /**
     * Calculate compatibility rating (1-5 stars)
     */
    calculateCompatibilityRating() {
        let score = 5;
        
        // Cross-platform compatibility
        if (this.results.crossPlatform && this.results.crossPlatform.tests) {
            const allTests = Object.values(this.results.crossPlatform.tests);
            const allSubTests = allTests.flatMap(test => Object.values(test));
            const passedTests = allSubTests.filter(test => test.passed).length;
            const totalTests = allSubTests.length;
            
            const passRate = totalTests > 0 ? passedTests / totalTests : 1;
            
            if (passRate < 0.8) score -= 2;
            else if (passRate < 0.9) score -= 1;
        }
        
        // VS Code version compatibility
        if (this.results.vscodeVersions && this.results.vscodeVersions.compatibility) {
            const compat = this.results.vscodeVersions.compatibility;
            
            if (compat.engineVersion && compat.engineVersion.isTooOld) {
                score -= 1;
            }
            
            if (compat.deprecated && compat.deprecated.count > 0) {
                score -= 1;
            }
        }
        
        return Math.max(1, score);
    }

    /**
     * Generate actionable recommendations
     */
    generateRecommendations() {
        console.log('\\n💡 Recommendations:');
        
        const recommendations = [];
        
        // Performance recommendations
        if (this.results.performance && this.results.performance.optimizationIssues > 5) {
            recommendations.push('Consider optimizing theme structure to reduce duplicate colors');
        }
        
        // Cross-platform recommendations
        if (this.results.crossPlatform) {
            const platform = this.results.crossPlatform.platform.os;
            
            if (platform === 'win32') {
                recommendations.push('Test theme on Windows with different VS Code versions');
            } else if (platform === 'darwin') {
                recommendations.push('Test theme on macOS with both Intel and Apple Silicon');
            } else {
                recommendations.push('Test theme across different Linux distributions');
            }
        }
        
        // VS Code version recommendations
        if (this.results.vscodeVersions && this.results.vscodeVersions.recommendations) {
            this.results.vscodeVersions.recommendations
                .filter(rec => rec.priority === 'high' || rec.priority === 'medium')
                .forEach(rec => recommendations.push(rec.message));
        }
        
        // General recommendations
        recommendations.push('Regularly test theme with VS Code Insiders for upcoming features');
        recommendations.push('Monitor VS Code release notes for new theme capabilities');
        
        recommendations.forEach((rec, index) => {
            console.log(`   ${index + 1}. ${rec}`);
        });
    }

    /**
     * Save comprehensive report
     */
    saveComprehensiveReport() {
        const fs = require('fs');
        const path = require('path');
        
        const report = {
            timestamp: new Date().toISOString(),
            platform: {
                os: process.platform,
                arch: process.arch,
                nodeVersion: process.version
            },
            testResults: this.results,
            summary: {
                performanceRating: this.calculatePerformanceRating(),
                compatibilityRating: this.calculateCompatibilityRating(),
                totalIssues: this.collectAllIssues().length,
                criticalIssues: this.collectAllIssues().filter(i => i.severity === 'critical').length
            }
        };
        
        const reportPath = path.join(__dirname, 'comprehensive-test-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        
        console.log(`\\n💾 Comprehensive test report saved: ${path.basename(reportPath)}`);
        console.log('\\n✅ All performance and compatibility tests completed successfully!');
    }
}

// Run all tests if called directly
if (require.main === module) {
    const runner = new ApolloThemeTestRunner();
    runner.runAllTests().catch(console.error);
}

module.exports = ApolloThemeTestRunner;