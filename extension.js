// Apollo Theme Extension
// This extension contributes color themes and doesn't require activation logic

const vscode = require('vscode');

/**
 * This method is called when the extension is activated
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    // Theme extensions typically don't need activation logic
    // The themes are automatically available through the contributes.themes configuration
    console.log('Apollo Theme extension is now active');
}

/**
 * This method is called when the extension is deactivated
 */
function deactivate() {
    // No cleanup needed for theme extensions
}

module.exports = {
    activate,
    deactivate
};