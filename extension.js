// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
var path = require("path");
const workspace = vscode.workspace;
const window = vscode.window;
var spawn = require("child_process").spawn;
const fs = require("fs");
const p = require("path");

// const btn = json.contributes.viewsWelcome(view: string; context:"\n[Open File](command:workbench.action.files.openLocalFile)\n" );

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // implementing webview for the extension
  var thisProvider = {
    resolveWebviewView: function (thisWebview, thisWebviewContext, thisToke) {
      thisWebview.webview.options = {
        enableScripts: true,
        enableCommandUris: true,
      };
      thisWebview.webview.html = `<!doctype><html>
      <head>
        <script>
        btnClick = function(){
          vscode.sendMessage("Hello from the webview!");
        }
        </script>
      </head>
      <body>
      <div id="root">
      <div style="display:flex;flex-direction:column;">
      <div class="row" style="display:flex;flex-direction:row">
      <label style="flex-grow:1">zap-server</label>
      <input type="checkbox" id="checkbox" name="checkbox" value="checkbox" checked>  
     
      </div>
      <div class="row" style="display:flex;flex-direction:row">
      <label style="flex-grow:1">zap-devserver</label>
      <input type="checkbox" id="checkbox" name="checkbox" value="checkbox" checked>  
     
      </div>
      <div class="row" style="display:flex;flex-direction:row">
      <label style="flex-grow:1">zap-dev</label>
      <input type="checkbox" id="checkbox" name="checkbox" value="checkbox" checked>  
     
      </div>
      <div class="row" style="display:flex;flex-direction:row">
      <label style="flex-grow:1">build</label>
      <input type="checkbox" id="checkbox" name="checkbox" value="checkbox" checked>  
     
      </div>
      <div class="row" style="display:flex;flex-direction:row">
      <label style="flex-grow:1">test</label>
      <input type="checkbox" id="checkbox" name="checkbox" value="checkbox" checked>  
     
      </div>
      <div class="row" style="display:flex;flex-direction:row">
      <button id="btn" type="button" onclick="btnClick()">change zap folder</button>
      </div>
      </div>
      </div>
      </body>  
      </html>`;
      // thisWebview.onDidReceiveMessage((message) => {
      //   console.log(message);
      // });
    },
  };
  const webview = vscode.window.registerWebviewViewProvider(
    "zapscriptsview",
    thisProvider
  );
  // vscode.messa;
  // @ts-ignore

  setInterval(() => {}, 3000);
  context.subscriptions.push(webview);
  vscode.window.showInformationMessage("zap Extention activated! ");

  let getconfig = vscode.commands.registerCommand(
    "extention.zapopenPackageJsonFile",
    function () {
      let path = workspace.getConfiguration("zap").get("packageJsonFilePath");
      path = path.replaceAll("\\", "/");
      if (path.split("/").pop().toLowerCase() === "package.json") {
        path = path.split("/");
        path.pop();
        path.join("/");
      }
      path = path.slice(-1) === "/" ? path.slice(0, -1) : path;
      let json;
      try {
        json = require(path + "/package.json");
      } catch (e) {
        return window.showInformationMessage("can't load package.json");
      }
      let items = [];

      //  console.log(Object.keys(json.view.);
      // console.log(Object.keys(json.viewsWelcome.zapextension.zap));
      for (const key of Object.keys(json.scripts)) {
        items.push({
          label: key,
          description: json.scripts[key],
        });
      }

      window.showQuickPick(items).then((selection) => {
        // the user canceled the selection
        window.showInformationMessage("running commands: ", selection.label);

        let channel = window.createOutputChannel(selection.label);

        let runningcommand = spawn("npm run " + selection.label, {
          shell: true,
          cwd: path,
        });
        vscode.commands.executeCommand(
          "simpleBrowser.show",
          workspace.getConfiguration("zap").get("serverAddress")
        );

        runningcommand.stdout.setEncoding("utf8");
        runningcommand.stdout.on("data", (m) => {
          channel.appendLine(m.toString());
        });
        runningcommand.stderr.on("data", (m) => {
          channel.appendLine(m.toString());
        });
        runningcommand.stderr.setEncoding("utf8");
        runningcommand.stderr.on("exit", (m) => {
          channel.appendLine(m.toString());
        });
        runningcommand.on("close", () => console.log("closed"));
        channel.appendLine("Running " + selection.label);
        channel.show();
      });

      //    window.registerTreeDataProvider('zap-sidebar', new r());
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
