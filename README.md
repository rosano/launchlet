<a href="https://launchlet.dev"><img src="https://launchlet.dev/identity.svg" width="64"></a>

# Launchlet

_Generalized interface for keyboard-based interaction_

<a href="https://launchlet.dev">Launchlet</a> is a simple way to add a name to snippets of code and run it. Inspired by [Quicksilver](https://qsapp.com/), it functions primarily via mouseless interaction and lets you access your [Recipes](https://launchlet.dev/guide) with a few keyboard strokes. You can also use it to personalize websites with custom CSS or JavaScript.

You can run Launchlet as a [bookmarklet](https://launchlet.dev/compose), [browser extension](https://github.com/launchlet/launchlet-extension), or as a [module](https://github.com/launchlet/launchlet/tree/master/os-app/dev-package) in your own project to add a 'jump to' functionality.

There is also an app where you can compose a launcher personalized with your own Recipes.

<a href="https://launchlet.dev/compose"><img alt="Open app" src="http://rosano.s3.amazonaws.com/public/_RCSAppButton.svg" /></a>

## Architecture

The project is a large collection of mostly small modules and functions that are put together using [Svelte](https://svelte.dev) and [Rollup](https://rollupjs.org). With the exception of a few 'global' or 'magic' things such as the localization function `OLSKLocalized`, most resources used by a module should be in the same folder or referenced by path name.

Routing, rendering markdown content, and serving pages is done via a Node.js server (usually configured in the *controller.js* files).

## Development Setup

Install [Node.js and npm](https://nodejs.org/en/download/), then:

```
npm i --no-save
```

## Running

### Start the Rollup process to build and reload automatically

```
npm run watch
```

### Start the Node.js server to view in the browser

```
npm start
```

It should be accessible at <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>.

## Testing

<div style="border: 1px black solid; padding: 10px;">Restart the test runner when creating new files so that they will be included (specifically test files, and localization files).</div>

### Run logic tests

```
npm test
```

### Run interface tests

```
npm test ui
```

To filter ui test paths by string:

```
npm test ui match=ResultList
```

To filter ui test paths by JavaScript regular expressions:

```
npm test ui match='/(guide|vitrine)/'
```

## License

The code is released under a [Hippocratic License](https://firstdonoharm.dev), modified to exclude its use for surveillance capitalism and also to require large for-profit entities to purchase a paid license.

## Questions

Feel free to ask questions on [Mastodon](https://merveilles.town/@rosano).
