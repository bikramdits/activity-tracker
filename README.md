# APPNAME
Clone this repository:
An IDE or text editor like VS Code
Node version 20.13.1

## Start the application

Run `npx nx serve auth` to start the development server.

## Build for production

Run `npx nx build auth` to build the application. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

## Running tasks

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many --target=serve
```


```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`.

## Explore the project graph

Run `npx nx graph` to show the graph of the workspace.

