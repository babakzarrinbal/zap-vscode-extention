// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
var path = require("path");
const { exec } = require("child_process");
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
      if (path.split("/").pop().toLowerCase() === "package.json") {
        path = path.split("/")
        path.pop()
        path.join("/");
      }
      path = path.slice(-1) === "/" ? path.slice(0,-1) : path ;
      let json;
      try {
        json = require(path+"/package.json");
      } catch (e) {
        return vscode.window.showInformationMessage("can't load package.json");
      }
      let items=  [];
  
      for (let key of Object.keys(json.scripts)){
        items.push({ 
          label: key, 
          description: key});
      }
      
      vscode.window.showQuickPick(items).then(selection => {
        // the user canceled the selection
        vscode.window.showInformationMessage(
          "running commands: ",
          selection.label
        );
        let channel = vscode.window.createOutputChannel(selection.label);
        let a = exec('pwd', {
          cwd: path
        }, function(error, stdout, stderr) {
          
          channel.appendLine(error.toString())
        });
        a.on('message',m=>channel.append(m.toString()))
      });

    }
  );

  let disposable = vscode.commands.registerCommand(
    "extention.zap",
    function (script) {
      vscode.window.showInformationMessage("adding commands: ", script);
    }
  );

  // context.subscriptions.push(disposable,);
  context.subscriptions.push(getconfig);
  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
