// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
var path = require("path");

// const btn = json.contributes.viewsWelcome(view: string; context:"\n[Open File](command:workbench.action.files.openLocalFile)\n" );

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let getconfig = vscode.commands.registerCommand(
    "extention.zapopenPackageJsonFile",
    function () {
      let path = vscode.workspace
        .getConfiguration("zap")
        .get("packageJsonFilePath");
      path = path.replaceAll("\\", "/");
      console.log(path);
      if (path.split("/").pop().toLowerCase() !== "package.json") {
        path = path.slice(-1) === "/" ? path : path + "/";
        path = path + "/package.json";
      }
      let json;
      try {
        json = require(path);
      } catch (e) {
        return vscode.window.showInformationMessage("can't load package.json");
      }
      vscode.window.showInformationMessage("adding commands: ", Object.keys(json.scripts).join(", "));
    }
  );

  let disposable = vscode.commands.registerCommand(
    "extention.zap",
    function () {
      var currentlyOpenTabfilePath =
        vscode.window.activeTextEditor.document.uri.fsPath;
      var currentlyOpenTabfileName = path.basename(currentlyOpenTabfilePath);
      console.log(currentlyOpenTabfileName);

      // const pathh = json.contributes.viewsWelcome;
      // const a = vscode.commands.executeCommand("markdown.showPreview", vscode.Uri.file(pathh));
      // console.log(a);
    }
  );

  // context.subscriptions.push(disposable,);
  context.subscriptions.push(getconfig,);
  context.subscriptions.push(disposable,);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
