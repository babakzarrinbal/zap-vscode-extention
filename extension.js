// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const json = require("./package.json");
var path = require("path");

       // const btn = json.contributes.viewsWelcome(view: string; context:"\n[Open File](command:workbench.action.files.openLocalFile)\n" );

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

  console.log("Congratulations, your extension Zap is now active!");




  
  let disposable = vscode.commands.registerCommand(
    "extention.zap",
    function () {
      var currentlyOpenTabfilePath = vscode.window.activeTextEditor.document.uri.fsPath;
      var currentlyOpenTabfileName = path.basename(currentlyOpenTabfilePath);
      console.log(currentlyOpenTabfileName);
      console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiii");
      
      // const pathh = json.contributes.viewsWelcome;
      // const a = vscode.commands.executeCommand("markdown.showPreview", vscode.Uri.file(pathh));
      // console.log(a);
    
    }

  );

  

  context.subscriptions.push(disposable, );
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
