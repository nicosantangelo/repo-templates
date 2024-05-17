# Template for web stack tech

Before you start:

```bash
# NodeJS

# Install nodejs manually
$ brew install nodejs # or using your package manager of choice.

# OR

# If you want to use a version manager, you can try NVM: https://github.com/nvm-sh/nvm
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash # installs NVM (Node Version Manager)
$ nvm install node # download and install Node.js

# Package manager

$ npm install -g yarn
```

## Table of contents

1. [website](#website)
2. [scripts](#scripts)
3. [Zendesk Private Apps](#zendesk-private-apps)
4. [Chrome Extensions](#chrome-extensions)

## website

**Create and install dependencies**

```bash
$ yarn create vite website-template --template react-ts
$ cd website-template

$ yarn # install dependencies
```

**Formatter config**

```bash
$ yarn add -D eslint-config-prettier@^9.1.0 eslint-plugin-prettier@^5.1.3
$ yarn add -D -E prettier@3.2.5

$ vim .eslintrc.cjs
# add `plugin:prettier/recommended` to the `extends` array

$ yarn lint --fix
$ yarn lint # should run whitout issues
```

**Tests**

```bash
$ yarn add -D vitest@^1.6.0 jest-environment-jsdom@^29.7.0
$ vim package.json
# add "test": "vitest --jsdom" to the `scripts` key

# Create a test
$ mkdir tests
$ cat > tests/demo.test.ts << EOF
import { expect, test } from "vitest";

test("adds 1 + 2 to equal 3", () => {
  expect(1 + 2).toBe(3);
});
EOF

$ yarn test
```

**Run**

```bash
$ yarn dev
```

### scripts

```bash
$ mkdir scripts

# Script file
$ cat > main.ts << EOF
const sum = (n1: number, n2: number): number => n1+n2
function say(things: string): void {
	console.log(things)
}
say('The sum (1+2) is: ' + sum(1, 2).toString())
EOF

# Package manger file
$ cat > package.json << EOF
{
  "type": "module",
  "name": "NAME_HERE",
}
EOF

# Install typescript
$ yarn add typescript
$ cat > tsconfig.json << EOF
EOF # Copy the contents of ./scripts/tsconfig.json, redacted here for brevity

# Ignore
$ cat > .gitignore << EOF
.DS_Store
*.js
node_modules
EOF

# Compile
$ yarn tsc # --watch

# Run
$ node main.js # "The sum (1+2) is: 3"
```

## Zendesk Private apps

This is a modified version of the [website](#webiste) section. A Zendesk Extension is an iframe that runs inside Zendesk's UI and has access to their globally injected API `window.ZAFClient`.
They have their own extension builder but it only supports Javascript, and the React altenrative is **very** outdated.

Taking advange of the fact that vite's output is just an html, js and css file, we can easily build an extension using modern tools and a better the same bundler we use for websites. We just need to tweek a few things to make it work with what Zendesk is expecting, namelyhave a `manifest.json` file and an `assets` folder on the built website.

```
$ yarn create vite zendesk-extension --template react-ts
$ # Follow all steps from the website section
```

**Manifest**

A [Zendesk Manifest](https://developer.zendesk.com/documentation/apps/app-developer-guide/manifest/) looks like this

```json
{
  "name": "Extension Name",
  "author": {
    "name": "Muun Team",
    "email": "hello@muun.com",
    "url": "https://muun.com"
  },
  "defaultLocale": "en",
  "private": true,
  "location": {
    "support": {
      "ticket_sidebar": {
        "url": "assets/index.html",
        "flexible": true
      }
    }
  },
  "version": "1.0.0",
  "frameworkVersion": "2.0"
}
```

The important part is that in the [`location`](https://developer.zendesk.com/documentation/apps/app-developer-guide/manifest/#location) key, no matter where you put your extension, the html must live inside an `assets` folder (like `assets/index.html`). So, to fix this:

```bash
$ yarn add -D @zendesk/zcli@^1.0.0-beta.42
$ vim public/manifest.json # Create your manifest.json here, you can copy the one above to begin
$ vim package.json
# Add the following scripts to your package.json:
#   "serve": "npx @zendesk/zcli apps:server ./dist",
#   "build-zendesk-index": "sed -e 's@/assets/@./@g' dist/index.html > dist/assets/index.html && rm dist/index.html",
#   "build": "tsc && vite build && npm run build-zendesk-index",
# serve requires a build
```

**Extra**
The repo also has a `src/helpers/zendesk` folder with a few utilities to use Zendesk's client/API and to be able to run and iterate your app safely using `yarn dev`.
To run it on Zendesk without actually deploying it you'll need to first build the app with `yarn build`, run `yarn serve` and then add `?zcli_apps=true` to the end of your Zendesk URL. More [info here](https://developer.zendesk.com/documentation/apps/getting-started/using-zcli/#testing-your-zendesk-app-locally).

## Chrome Extensions

For Chrome extensions we leverage vitejs using [plasmo](https://github.com/PlasmoHQ/plasmo) which does most of the heavy lifting to accomodate for the different files an extension can have (like content scripts, background processes and popups).

The [docs](https://docs.plasmo.com/framework) do a good job on explaining the dev workflow. The only two things we do differently are:

- Using `yarn` instead of `pnpm`
- Using the [`--with-src`](https://docs.plasmo.com/framework/customization/src#--with-src) flag so the project looks like the other projects we build

```bash
yarn create plasmo chrome-extension --with-src
```
