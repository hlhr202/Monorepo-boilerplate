# Monorepo Boilerplate

This is a showcase of monorepo that accelerate building speed.

## Prerequest
- nvm
- node 16+
- npm 7+

## Install
```bash
npm ci
```

## Build packages
```bash
npm run build:packages packages/common-1
```

Here you can pass multiple packages to build:packages command. eg.
```bash
npm run build:packages packages/common-1 packages/common-2
```

## Serve
```bash
npm run serve
```

## Build main project
```bash
npm run build
```