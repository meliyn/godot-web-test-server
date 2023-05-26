# Godot Web Test Server

To create a test localhost server to serve Godot Engine 4's HTML5 export!

## Why?

It's because Godot 4 requires SharedArrayBuffer, which requires some headers. Therefore, I created this so I can just run this and test it.

## Installation

```bash
deno install -Af https://raw.githubusercontent.com/meliyn/godot-web-test-server/main/godot-web-test-server.ts
```

## Usage

```text
Usage: godot-web-test-server serve [options]

Options:
  -d, --baseDir <dir>  Base Directory (default: cwd)
  -i, --index <name>   Index (default: "index.html")
  -p, --port <port>    Port (default: "8080")
  -h, --help           display help for command
```

Example:

```bash
godot-web-test-server serve -d ./build/ -i "My Game.html" -p 3000
```
