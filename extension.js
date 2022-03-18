// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log("Congratulations, your extension Zap is now active!");

  // vscode.window.createTreeView('ftpExplorer', {
  //   treeDataProvider: new FtpTreeDataProviderea(),
  // });

  // The command has been defined in the package.json file
  // Now provide the implementation of the c  ommand with  registerCommand
  // The commandId parameter must match the command field in package.json

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "shayankamandi.extention.panel.registration",
      () => {
        return {
          id: "extention",
          title: "Zap",
          description:
            "ZAP is Zigbee Cluster Library configuration tool and generator. It allows users to configure their ZCL application using web-like interface and then generate the required artifacts for this application, based upon the templates inside a given ZCL SDK.",
          actions: [
            {
              title: "Binary Path",
              command: "vscode-binary-path",
              data: "Just Some text",
              placeHolder: "binary...",
              type: "text",
            },
            {
              title: "Enable",
              command: "vscode-extension-panel.panel.test",
              data: true,
              type: "checkbox",
            },

            {
              title: "Run",
              command: "zap-run-binary",
              data: "Just Binary",
              type: "button",
            },
          ],
        };
      }
    )
  );

  let disposable = vscode.commands.registerCommand(
    "extention.zap",
    function () {
      vscode.window.showInformationMessage("Zap welcome to you!");
      vscode.window.setStatusBarMessage("Zap");
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
