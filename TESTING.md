# Apollo Theme Testing Documentation

This document describes the comprehensive test suite for the Apollo VS Code theme, covering all validation requirements for theme quality, accessibility, and functionality.

## Test Suite Overview

The Apollo theme includes a comprehensive automated test suite that validates:

- ✅ **Theme JSON Structure**: Validates theme file structure and required properties
- ✅ **Color Format Compliance**: Ensures all colors use valid hex format
- ✅ **Syntax Highlighting Coverage**: Verifies comprehensive language support
- ✅ **Accessibility Compliance**: Tests contrast ratios for WCAG AA standards
- ✅ **Theme Loading Functionality**: Validates VS Code extension configuration
- ✅ **Cross-theme Consistency**: Ensures consistency between dark and light variants

## Requirements Coverage

This test suite addresses the following requirements:

- **4.1**: Good contrast and readability validation
- **4.2**: Selected text visibility and cursor contrast
- **4.3**: Line numbers readability testing
- **4.4**: Accessibility compliance verification
- **6.3**: Theme package structure and best practices validation

## Running Tests

### Quick Test Run

```bash
# Run all tests
npm test

# Or run the comprehensive test suite directly
node run-tests.js
```

### Individual Test Suites

```bash
# Run only the main test suite
npm run test:suite

# Run contrast analysis
npm run test:contrast

# Run theme validation tests
npm run test:validation

# Run installation and activation tests
npm run test:installation

# Run VS Code integration tests
npm run test:integration

# Run manual installation tests
npm run test:manual
```

## Test Files

### Core Test Files

| File | Purpose | Requirements |
|------|---------|--------------|
| `run-tests.js` | Main test runner and coordinator | All |
| `test-suite.js` | Comprehensive validation suite | 4.1, 4.2, 4.3, 4.4, 6.3 |
| `test-contrast-analysis.js` | Detailed contrast analysis | 4.1, 4.2, 4.3, 4.4 |
| `test-semantic-validation.js` | Dark theme validation | 6.3 |
| `test-light-validation.js` | Light theme validation | 6.3 |
| `test-installation-activation.js` | Installation and activation testing | 1.1, 1.2, 1.3, 6.4 |
| `test-vscode-integration.js` | VS Code integration and persistence | 1.1, 1.2, 1.3, 6.4 |
| `test-manual-installation.js` | Manual installation and packaging | 1.1, 1.2, 1.3, 6.4 |

### Test Configuration

| File | Purpose |
|------|---------|
| `test-config.json` | Test configuration and standards |
| `test-report.json` | Generated test results report |

### Syntax Test Files

The test suite automatically generates test files for various programming languages:

- `test-syntax.js` - JavaScript syntax highlighting test
- `test-syntax.ts` - TypeScript syntax highlighting test  
- `test-syntax.html` - HTML syntax highlighting test
- `test-syntax.css` - CSS syntax highlighting test
- `test-syntax.json` - JSON syntax highlighting test
- `test-syntax.md` - Markdown syntax highlighting test

## Test Details

### 1. Theme JSON Structure Validation

**Purpose**: Ensures theme files have valid JSON structure and required properties

**Tests**:
- JSON parsing validation
- Required properties check (`name`, `type`, `colors`, `tokenColors`)
- Theme type validation (`dark` or `light`)
- Semantic highlighting configuration
- Workbench colors count (minimum 100)
- Token colors count (minimum 30)

**Pass Criteria**: All required properties present, valid JSON, proper configuration

### 2. Color Format Compliance

**Purpose**: Validates all colors use proper hex format

**Tests**:
- Workbench color format validation
- Token color format validation  
- Semantic token color format validation
- Alpha channel support validation

**Pass Criteria**: All colors match regex `^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$`

### 3. Syntax Highlighting Coverage

**Purpose**: Ensures comprehensive syntax highlighting for supported languages

**Tests**:
- Essential scope coverage validation
- Language-specific highlighting rules
- Test file generation for multiple languages
- Syntax rule completeness check

**Pass Criteria**: All essential scopes covered, comprehensive language support

### 4. Accessibility Compliance

**Purpose**: Validates contrast ratios meet WCAG AA accessibility standards

**Tests**:
- Main editor contrast calculation (background vs foreground)
- Syntax color contrast validation
- Minimum contrast ratio enforcement (3:1 minimum, 4.5:1 preferred)
- Accessibility compliance reporting

**Pass Criteria**: 
- Main editor contrast ≥ 4.5:1 (AA compliant)
- All syntax colors ≥ 3:1 (minimum readable)
- No colors below accessibility thresholds

### 5. Theme Loading Functionality

**Purpose**: Validates VS Code extension configuration and theme loading

**Tests**:
- Package.json theme configuration validation
- Theme file path verification
- UI theme mapping validation (`vs-dark` for dark, `vs` for light)
- VS Code engine compatibility check

**Pass Criteria**: Proper extension configuration, valid file paths, correct mappings

### 6. Cross-theme Consistency

**Purpose**: Ensures consistency between dark and light theme variants

**Tests**:
- Accent color consistency validation
- Workbench structure consistency (≥90%)
- Semantic token consistency (≥90%)
- Theme variant validation

**Pass Criteria**: High consistency between themes, shared accent colors

### 7. Installation and Activation Testing

**Purpose**: Validates extension installation, theme selection, activation, and switching

**Tests**:
- Extension installation process validation
- Theme selection and activation simulation
- Theme persistence across VS Code restarts
- Theme switching between Apollo Dark and Apollo Light
- Extension metadata and configuration validation
- Theme file accessibility and permissions

**Pass Criteria**: 
- Extension can be packaged and installed
- Themes are properly registered and selectable
- Theme switching works smoothly between variants
- Settings persist across VS Code sessions

### 8. VS Code Integration Testing

**Purpose**: Tests VS Code specific integration features and workspace configuration

**Tests**:
- Theme settings persistence simulation
- Workspace theme configuration validation
- Automatic theme switching based on system preferences
- Extension activation and lifecycle simulation
- Theme preference validation and migration

**Pass Criteria**:
- Theme settings persist correctly in workspace configuration
- Workspace settings override user preferences appropriately
- Auto theme switching is properly supported
- Extension integrates seamlessly with VS Code theme system

### 9. Manual Installation Testing

**Purpose**: Validates manual installation process including VSIX packaging

**Tests**:
- Pre-installation validation (extension structure, metadata)
- Extension packaging with vsce validation
- Installation simulation (multiple methods)
- Post-installation validation (theme availability, switching)
- Extension uninstallation process simulation

**Pass Criteria**:
- Extension structure meets VS Code requirements
- Package can be created and distributed
- Installation process works through multiple methods
- Themes are available and functional after installation

## Accessibility Standards

The test suite enforces the following accessibility standards:

### Contrast Ratios

| Element Type | Minimum Ratio | Preferred Ratio | Standard |
|--------------|---------------|-----------------|----------|
| Main Editor Text | 4.5:1 | 7:1 | WCAG AA |
| Large Text | 3:1 | 4.5:1 | WCAG AA |
| Syntax Highlighting | 3:1 | 4.5:1 | WCAG AA |

### Color Requirements

- All colors must be valid hex format
- No colors below 3:1 contrast ratio
- Main editor text must meet 4.5:1 for AA compliance
- Support for high contrast mode compatibility

## Test Results

### Success Criteria

A successful test run requires:

- ✅ All JSON files parse correctly
- ✅ All colors have valid hex format
- ✅ All essential syntax scopes covered
- ✅ Main editor contrast ≥ 4.5:1
- ✅ All syntax colors ≥ 3:1 contrast
- ✅ Proper VS Code extension configuration
- ✅ High cross-theme consistency (≥90%)

### Test Output

The test suite provides:

- **Real-time progress**: Live test execution feedback
- **Detailed results**: Pass/fail status for each test
- **Accessibility report**: Contrast ratios and compliance status
- **Summary statistics**: Overall success rate and test counts
- **JSON report**: Machine-readable test results in `test-report.json`

### Example Output

```
🚀 Apollo Theme Comprehensive Test Suite
=========================================

📋 Test 1: Theme JSON Structure Validation
✅ apollo-dark-color-theme.json: All required properties present
✅ apollo-light-color-theme.json: Valid theme type (light)

🎨 Test 2: Color Format Compliance  
✅ apollo-dark-color-theme.json: All colors have valid format

♿ Test 4: Contrast Ratio Accessibility
✅ Apollo Dark: Main editor contrast 16.73:1 (AA compliant)
✅ Apollo Light: All syntax colors meet minimum contrast (100.0%)

📊 Test Summary
===============
✅ Passed: 33
❌ Failed: 0
📈 Success Rate: 100.0%

🎉 All tests passed! Apollo theme is ready for distribution.
```

## Continuous Integration

The test suite is designed for CI/CD integration:

```bash
# Exit code 0 on success, 1 on failure
npm test
echo $? # 0 = success, 1 = failure
```

### GitHub Actions Example

```yaml
- name: Run Apollo Theme Tests
  run: |
    cd apollo-theme
    npm test
```

## Troubleshooting

### Common Issues

**JSON Parse Errors**:
- Check theme files for valid JSON syntax
- Ensure no trailing commas or syntax errors

**Color Format Failures**:
- Verify all colors use hex format (#RRGGBB or #RRGGBBAA)
- Check for invalid color values or typos

**Contrast Failures**:
- Review color choices for accessibility compliance
- Use lighter colors on dark backgrounds, darker on light
- Test with accessibility tools for verification

**Missing Test Files**:
- Ensure all theme files exist in `themes/` directory
- Check file paths in package.json contributions

### Getting Help

If tests fail:

1. Review the detailed test output for specific failures
2. Check the generated `test-report.json` for detailed analysis
3. Verify theme files against the Apollo color palette
4. Test manually in VS Code to confirm issues
5. Run individual test suites to isolate problems

## Contributing

When contributing to the Apollo theme:

1. **Always run tests** before submitting changes
2. **Ensure 100% pass rate** for all test suites
3. **Add new tests** for new features or requirements
4. **Update documentation** if test behavior changes
5. **Verify accessibility** compliance for any color changes

The test suite ensures the Apollo theme maintains high quality, accessibility, and consistency standards across all supported platforms and VS Code versions.