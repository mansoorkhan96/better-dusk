# Better Dusk

Better Dusk is the most popular, cleanest, and fastest Laravel Dusk test runner for VS Code.

![Demo GIF](demo.gif)

## Run a test method:
- Place your cursor in/on the method you want to run
- Open the command menu: `cmd+shift+p`
- Select: `Better Dusk: run`

## Run a test file:
- Open the command menu: `cmd+shift+p`
- Select: `Better Dusk: run-file`

## Run the entire suite:
- Open the command menu: `cmd+shift+p`
- Select: `Better Dusk: run suite`

## Run the previous test:
- Open the command menu: `cmd+shift+p`
- Select: `Better Dusk: run previous`

## Features:
- Color output!
- Run individual methods by placing your cursor anywhere in/on the method
- Test failures are displayed in the "Problems" panel for quick access

> Note: this plugin registers "tasks" to run dusk, not a command like other extensions. This makes it possible to leverage the problem output and color terminal.

Keybindings:
```
{
    "key": "cmd+k cmd+r",
    "command": "better-dusk.run"
},
{
    "key": "cmd+k cmd+f",
    "command": "better-dusk.run-file"
},
{
    "key": "cmd+k cmd+p",
    "command": "better-dusk.run-previous"
}
```

Config:
```
{
    "better-dusk.commandSuffix": null, // This string will be appended to the dusk command, it's a great place to add flags like '--stop-on-failure'
    "better-dusk.binary": null, // A custom dusk binary. Ex: 'dusk', 'php artisan dusk'
    "better-dusk.suiteSuffix": null // Specify options to appended only to the 'run suite' command, for example add options like '--testsuite unit' or '--coverage --coverage-xml'.
}
```

Running tests over ssh (For VMs like Laravel Homestead):
```
{
    "better-dusk.ssh.enable": true,
    "better-dusk.ssh.paths": {
        "/your/local/path": "/your/remote/path"
    },
    "better-dusk.ssh.user": "user",
    "better-dusk.ssh.host": "host",
    "better-dusk.ssh.port": "22",
    "better-dusk.ssh.binary": "putty -ssh"
}
```

Running tests in already running Docker containers:
```
{
    "better-dusk.docker.enable": true,
    "better-dusk.docker.command": "docker exec container-name",
    "better-dusk.docker.paths": {
        "/your/local/path": "/your/remote/path"
    },
}
```

Running tests with Docker Compose, starting up a service and removing the container when finished:
```
{
    "better-dusk.docker.enable": true,
    "better-dusk.docker.command": "docker-compose run --rm service-name",
    "better-dusk.docker.paths": {
        "/your/local/path": "/your/remote/path"
    },
}
```

Running tests with Laravel Sail:
```
{
    "better-dusk.docker.enable": true,
    "better-dusk.docker.command": "docker compose exec -u sail laravel.test",
    "better-dusk.docker.paths": {
        "/your/local/path": "/var/www/html"
    },
    "better-dusk.binary": "php artisan dusk",
}
```

**Note:**
For running Docker over a SSH session just use both options _ssh.enable_ and _docker.enable_ combined.

## Wish List:
- Handling PHP fatal and parser errors
- A sidebar panel for managing errors
- Re-run failures
