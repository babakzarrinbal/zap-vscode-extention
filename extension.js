// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension Zap is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extention.zap', function () {
		
		vscode.window.showInformationMessage('Zap welcome to you!');
		
		context.subscriptions.push(vscode.commands.registerCommand('zap.panel.registration', () => {
			return {
				id: 'zap',
				title: 'ZAP actions',
				description: 'Actions for testing purposes only.',
				actions: [{
					title: 'Click me!',
					command: 'vscode-extension-panel.panel.test',
					data: true,
					type: "checkbox"
				}, {
					title: 'Action 2',
					command: 'vscode-extension-panel.panel.test',
					data: 'Just extra text',
					type: "button"
				}]
			};
		})
	);
	});
	

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}


