const vscode = require('vscode');
const DuskCommand = require('./dusk-command');
const RemoteDuskCommand = require('./remote-dusk-command.js');
const DockerDuskCommand = require('./docker-dusk-command.js');

var globalCommand;

module.exports.activate = function (context) {
    let disposables = [];

    disposables.push(vscode.commands.registerCommand('better-dusk.run', async () => {
        let command;

        if (vscode.workspace.getConfiguration("better-dusk").get("docker.enable")) {
            command = new DockerDuskCommand;
        } else if (vscode.workspace.getConfiguration("better-dusk").get("ssh.enable")) {
            command = new RemoteDuskCommand;
        } else {
            command = new DuskCommand;
        }

        await runCommand(command);
    }));

    disposables.push(vscode.commands.registerCommand('better-dusk.run-file', async () => {
        let command;

        if (vscode.workspace.getConfiguration("better-dusk").get("docker.enable")) {
            command = new DockerDuskCommand({ runFile: true });
        } else if (vscode.workspace.getConfiguration("better-dusk").get("ssh.enable")) {
            command = new RemoteDuskCommand({ runFile: true });
        } else {
            command = new DuskCommand({ runFile: true });
        }

        await runCommand(command);
    }));

    disposables.push(vscode.commands.registerCommand('better-dusk.run-suite', async () => {
        let command;

        if (vscode.workspace.getConfiguration("better-dusk").get("docker.enable")) {
            command = new DockerDuskCommand({ runFullSuite: true });
        } else if (vscode.workspace.getConfiguration("better-dusk").get("ssh.enable")) {
            command = new RemoteDuskCommand({ runFullSuite: true });
        } else {
            command = new DuskCommand({ runFullSuite: true });
        }

        await runCommand(command);
    }));

    disposables.push(vscode.commands.registerCommand('better-dusk.run-previous', async () => {
        await runPreviousCommand();
    }));

    disposables.push(vscode.tasks.registerTaskProvider('dusk', {
        provideTasks: () => {
            return [new vscode.Task(
                { type: "dusk", task: "run" },
                2,
                "run",
                'dusk',
                new vscode.ShellExecution(globalCommand.output),
                '$dusk'
            )];
        }
    }));

    context.subscriptions.push(disposables);
}

async function runCommand(command) {
    setGlobalCommandInstance(command);

    vscode.window.activeTextEditor
        || vscode.window.showErrorMessage('Better Dusk: open a file to run this command');

    await vscode.commands.executeCommand('workbench.action.terminal.clear');
    await vscode.commands.executeCommand('workbench.action.tasks.runTask', 'dusk: run');
}

async function runPreviousCommand() {
    await vscode.commands.executeCommand('workbench.action.terminal.clear');
    await vscode.commands.executeCommand('workbench.action.tasks.runTask', 'dusk: run');
}

function setGlobalCommandInstance(commandInstance) {
    // Store this object globally for the provideTasks, "run-previous", and for tests to assert against.
    globalCommand = commandInstance;
}

// This method is exposed for testing purposes.
module.exports.getGlobalCommandInstance = function () {
    return globalCommand;
}
