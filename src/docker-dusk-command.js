const vscode = require('vscode');
const RemoteDuskCommand = require('./remote-dusk-command');

module.exports = class DockerDuskCommand extends RemoteDuskCommand {
    get paths() {
        return this.config.get("docker.paths");
    }

    get dockerCommand() {
        if (this.config.get("docker.command")) {
            return this.config.get("docker.command");
        }

        const msg = "No better-dusk.docker.command was specified in the settings";
        vscode.window.showErrorMessage(msg);

        throw msg;
    }

    wrapCommand(command) {
        if (vscode.workspace.getConfiguration("better-dusk").get("ssh.enable")) {
            return super.wrapCommand(`${this.dockerCommand} ${command}`);
        }
        return `${this.dockerCommand} ${command}`;
    }
}
