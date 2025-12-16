---
  id: voiden-cli
  title: Command Line Interface
  sidebar_label: CLI
---
#  <div style={{display:"flex",alignItems:"center"}}> CLI<small style={{alignSelf:"start",fontSize:"12px",marginLeft:"10px",padding:"5px",background:"#8a5cf67d",display:"flex",alignItems:"cetner",gap:"5px",borderRadius:"10px"}}><img src="/img/flask-conical.svg" width="14" /> Beta only</small></div>
> **Note:** This feature is currently in **Beta**.

## Overview
The **Voiden CLI** (Command Line Interface) provides a fast, efficient, and developer-friendly way to interact with Voiden directly from the terminal. It allows users to manage Voiden projects, execute workflows, and automate tasks without relying on a graphical interface.

Designed for productivity and consistency, the Voiden CLI integrates seamlessly into modern development environments and fits naturally into scripts, CI/CD pipelines, and version-controlled workflows.

---

## Why the Voiden CLI Is Important

The Voiden CLI plays a key role in improving developer experience and operational efficiency.

### Key Benefits

- **Speed and Efficiency**  
- **Automation Ready**  
- **Consistency Across Environments**  
- **Version Control Friendly**  
- **Developer-Centric**  

---
### How To Install CLI In Voiden

![install-cli](/img/developer-tools/install-cli.gif)

---
# How to open

Just open the terminal and type the simple command `voiden` to launch Voiden

![open-voiden](/img/developer-tools/open-voiden.gif)

## CLI Options and Usage

This section documents the available command-line options and common usage patterns for the Voiden CLI.


### Options

- `-v`, `--version`  
  Displays the currently installed Voiden CLI version.

- `-h`, `--help`  
  Shows the help message with available commands and options.

- `path`  
  Opens a specified file or directory in Voiden. The path can be absolute or relative to the current working directory.

---
## Example of Voiden CLI

```bash
voiden                 # Open Voiden
voiden ~/Documents     # Open Documents directory
voiden myproject       # Open myproject from current directory
voiden file.txt        # Open files as tabs
voiden -v              # Show version
voiden --version       # Show version
voiden -h              # Show this help
voiden --help          # Show this help
```
---

## Summary
The Voiden CLI offers a powerful yet approachable way to interact with Voiden. By combining speed, automation, and consistency, it enables developers to work more efficiently while maintaining full control over their workflows—all from the command line.