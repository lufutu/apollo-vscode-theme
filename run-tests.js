#!/usr/bin/env node

/**
 * Apollo Theme Test Runner
 * 
 * Coordinates and runs all theme validation tests
 * Requirements: 4.1, 4.2, 4.3, 4.4, 6.3
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

class TestRunner {
  constructor() {
    this.results = {
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      testSuites: []
    };
  }

  async runAllTests() {
    console.log('🚀 Apollo Theme Complete Test Suite');
    console.log('===================================\n');

    const testSuites = [
      {
        name: 'Comprehensive Test Suite',
        script: 'test-suite.js',
        description: 'JSON structure, color format, syntax highlighting, contrast, and loading tests'
      },
      {
        name: 'Contrast Analysis',
        script: 'test-contrast-analysis.js',
        description: 'Detailed contrast ratio analysis for accessibility compliance'
      },
      {
        name: 'Dark Theme Validation',
        script: 'test-semantic-validation.js',
        description: 'Apollo Dark theme structure and semantic token validation'
      },
      {
        name: 'Light Theme Validation',
        script: 'test-light-validation.js',
        description: 'Apollo Light theme structure and syntax highlighting validation'
      },
      {
        name: 'Installation & Activation Tests',
        script: 'test-installation-activation.js',
        description: 'Extension installation, theme selection, activation, and switching tests'
      },
      {
        name: 'VS Code Integration Tests',
        script: 'test-vscode-integration.js',
        description: 'Theme persistence, workspace configuration, and VS Code integration tests'
      },
      {
        name: 'Manual Installation Tests',
        script: 'test-manual-installation.js',
        description: 'Extension packaging, installation process, and distribution readiness tests'
      }
    ];

    for (const suite of testSuites) {
      await this.runTestSuite(suite);
    }

    this.printFinalSummary();
    return this.results.failedTests === 0;
  }

  async runTestSuite(suite) {
    console.log(`🧪 Running: ${suite.name}`);
    console.log(`📝 ${suite.description}`);
    console.log('─'.repeat(60));

    try {
      const scriptPath = path.join(__dirname, suite.script);
      
      // Check if test file exists
      if (!fs.existsSync(scriptPath)) {
        console.log(`❌ Test file not found: ${suite.script}`);
        this.results.failedTests++;
        this.results.testSuites.push({
          name: suite.name,
          status: 'failed',
          error: 'Test file not found'
        });
        return;
      }

      const result = await this.executeTest(scriptPath);
      
      if (result.success) {
        console.log(`✅ ${suite.name} completed successfully`);
        this.results.passedTests++;
        this.results.testSuites.push({
          name: suite.name,
          status: 'passed',
          output: result.output
        });
      } else {
        console.log(`❌ ${suite.name} failed`);
        if (result.error) {
          console.log(`Error: ${result.error}`);
        }
        this.results.failedTests++;
        this.results.testSuites.push({
          name: suite.name,
          status: 'failed',
          error: result.error,
          output: result.output
        });
      }

    } catch (error) {
      console.log(`💥 ${suite.name} crashed: ${error.message}`);
      this.results.failedTests++;
      this.results.testSuites.push({
        name: suite.name,
        status: 'crashed',
        error: error.message
      });
    }

    console.log(''); // Add spacing between test suites
  }

  executeTest(scriptPath) {
    return new Promise((resolve) => {
      const child = spawn('node', [scriptPath], {
        cwd: __dirname,
        stdio: ['pipe', 'pipe', 'pipe']
      });

      let output = '';
      let error = '';

      child.stdout.on('data', (data) => {
        const text = data.toString();
        output += text;
        process.stdout.write(text);
      });

      child.stderr.on('data', (data) => {
        const text = data.toString();
        error += text;
        process.stderr.write(text);
      });

      child.on('close', (code) => {
        resolve({
          success: code === 0,
          output: output.trim(),
          error: error.trim()
        });
      });

      child.on('error', (err) => {
        resolve({
          success: false,
          error: err.message,
          output: output.trim()
        });
      });
    });
  }

  printFinalSummary() {
    console.log('🏁 Final Test Results');
    console.log('=====================');
    
    this.results.totalTests = this.results.passedTests + this.results.failedTests;
    
    console.log(`📊 Test Suites Run: ${this.results.totalTests}`);
    console.log(`✅ Passed: ${this.results.passedTests}`);
    console.log(`❌ Failed: ${this.results.failedTests}`);
    
    if (this.results.totalTests > 0) {
      const successRate = (this.results.passedTests / this.results.totalTests * 100).toFixed(1);
      console.log(`📈 Success Rate: ${successRate}%`);
    }

    console.log('\n📋 Test Suite Details:');
    console.log('─'.repeat(40));
    
    this.results.testSuites.forEach(suite => {
      const statusIcon = suite.status === 'passed' ? '✅' : 
                        suite.status === 'failed' ? '❌' : '💥';
      console.log(`${statusIcon} ${suite.name}: ${suite.status.toUpperCase()}`);
      
      if (suite.error) {
        console.log(`   Error: ${suite.error}`);
      }
    });

    if (this.results.failedTests === 0) {
      console.log('\n🎉 All test suites passed! Apollo theme is ready for distribution.');
      console.log('✨ The theme meets all quality and accessibility standards.');
    } else {
      console.log('\n🔧 Some test suites failed. Please review and fix the issues above.');
      console.log('💡 Check individual test outputs for specific failure details.');
    }

    // Generate test report
    this.generateTestReport();
  }

  generateTestReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalSuites: this.results.totalTests,
        passed: this.results.passedTests,
        failed: this.results.failedTests,
        successRate: this.results.totalTests > 0 ? 
          (this.results.passedTests / this.results.totalTests * 100).toFixed(1) : 0
      },
      testSuites: this.results.testSuites,
      recommendations: this.generateRecommendations()
    };

    const reportPath = path.join(__dirname, 'test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Test report saved to: ${reportPath}`);
  }

  generateRecommendations() {
    const recommendations = [];
    
    if (this.results.failedTests > 0) {
      recommendations.push('Review failed test outputs and fix identified issues');
      recommendations.push('Ensure all theme files have valid JSON structure');
      recommendations.push('Verify color format compliance (hex colors)');
      recommendations.push('Check contrast ratios meet accessibility standards');
    }
    
    if (this.results.passedTests === this.results.totalTests) {
      recommendations.push('Theme is ready for packaging and distribution');
      recommendations.push('Consider running tests on different VS Code versions');
      recommendations.push('Test theme with various file types and extensions');
    }

    return recommendations;
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  const runner = new TestRunner();
  runner.runAllTests().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('Test runner crashed:', error);
    process.exit(1);
  });
}

module.exports = { TestRunner };