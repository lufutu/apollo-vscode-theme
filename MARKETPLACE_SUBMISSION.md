# VS Code Marketplace Submission Guide

## Prerequisites

### 1. Create Visual Studio Marketplace Publisher Account

1. Go to https://marketplace.visualstudio.com/manage
2. Sign in with your Microsoft account (create one if needed)
3. Click "Create publisher"
4. Publisher ID: `lufutu` (must match package.json)
5. Publisher display name: Your preferred display name
6. Fill in other required details

### 2. Get Personal Access Token

1. Go to https://dev.azure.com/
2. Sign in with the same Microsoft account
3. Click on your profile → "Personal access tokens"
4. Click "New Token"
5. Name: "VS Code Extensions"
6. Organization: Select your organization
7. Scopes: Select "Custom defined" → "Marketplace" → "Manage"
8. Click "Create"
9. **IMPORTANT**: Copy and save the token immediately (you won't see it again)

## Publishing Steps

### 1. Login to vsce

```bash
cd apollo-theme
npx vsce login lufutu
```

Enter your Personal Access Token when prompted.

### 2. Publish to Marketplace

```bash
npm run publish
```

Or manually:

```bash
npx vsce publish
```

### 3. Alternative: Manual Upload

If automatic publishing fails:

1. Go to https://marketplace.visualstudio.com/manage/publishers/lufutu
2. Click "New extension"
3. Upload the `apollo-theme-1.0.0.vsix` file
4. Fill in any additional metadata
5. Click "Upload"

## Pre-Publication Checklist

✅ **Package Information**
- Name: apollo-theme
- Publisher: lufutu
- Version: 1.0.0
- Repository: https://github.com/lufutu/apollo-vscode-theme

✅ **Required Files**
- README.md (comprehensive documentation)
- CHANGELOG.md (version history)
- package.json (proper metadata)
- Icon (assets/icon.png)
- Theme files (apollo-dark-color-theme.json, apollo-light-color-theme.json)

✅ **Theme Validation**
- Both themes tested and working
- Proper syntax highlighting
- Good contrast ratios
- Semantic token support

⚠️ **Missing (Optional)**
- LICENSE file (recommended for open source)

## Post-Publication

### 1. Verify Publication

1. Visit https://marketplace.visualstudio.com/items?itemName=lufutu.apollo-theme
2. Test installation from marketplace
3. Verify themes work correctly

### 2. Update Repository

After successful publication, update your GitHub repository:

```bash
git add .
git commit -m "Update package.json with marketplace publisher info"
git push origin main
```

### 3. Create GitHub Release

1. Go to https://github.com/lufutu/apollo-vscode-theme/releases
2. Click "Create a new release"
3. Tag: v1.0.0
4. Title: "Apollo Theme v1.0.0"
5. Description: Copy from CHANGELOG.md
6. Attach the .vsix file
7. Click "Publish release"

## Troubleshooting

### Common Issues

1. **Publisher not found**: Ensure you've created the publisher account with ID "lufutu"
2. **Authentication failed**: Verify your Personal Access Token has "Marketplace: Manage" permissions
3. **Package validation failed**: Run `npx vsce package` to check for issues
4. **Icon not found**: Ensure assets/icon.png exists and is referenced correctly in package.json

### Support

- VS Code Extension API: https://code.visualstudio.com/api
- Publishing Guide: https://code.visualstudio.com/api/working-with-extensions/publishing-extension
- Marketplace Issues: https://github.com/microsoft/vscode-vsce

## Next Steps After Publication

1. **Monitor Downloads**: Check marketplace analytics
2. **User Feedback**: Respond to reviews and issues
3. **Updates**: Use `vsce publish patch/minor/major` for version updates
4. **Promotion**: Share on social media, dev communities

## Commands Summary

```bash
# Login to marketplace
npx vsce login lufutu

# Package extension
npm run package

# Publish to marketplace
npm run publish

# Publish specific version
npx vsce publish patch  # 1.0.1
npx vsce publish minor  # 1.1.0
npx vsce publish major  # 2.0.0
```