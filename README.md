<a href="https://launchlet.dev"><img src="https://launchlet.dev/identity.svg" width="64"></a>

# Launchlet

_Generalized interface for keyboard-based interaction_

Launchlet is a simple way to add a name to snippets of code and run it. Inspired by [Quicksilver](https://qsapp.com/), it functions primarily via mouseless interaction and lets you access your [Recipes](https://launchlet.dev/guide) with a few keyboard strokes. You can also use it to customize websites in the same way as 'userscripts' or 'userstyles'.

You can run Launchlet as a bookmarklet, [browser extension](https://github.com/launchlet/launchlet-extension), or as a [module](https://github.com/launchlet/launchlet/tree/master/os-app/dev-package) in your own project to add a 'jump to' functionality.

## Architecture

The project is a large collection of mostly small modules and functions that are put together using [Svelte](https://svelte.dev) and [Rollup](https://rollupjs.org). With the exception of a few 'global' or 'magic' things such as the localization function `OLSKLocalized`, most resources used by a module should be in the same folder or referenced by path name.

Routing, rendering markdown content, and serving pages is done via a Node.js server (usually configured in the *controller.js* files).

## Installing

```
npm install --no-save
```

## Running

### Start the Rollup build/reload process

```
npm run svelte-build-watch
```

### Start the node server

```
npm start
```

It should be accessible at <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>.

## Testing

Restart the test runner when creating new files so that they will be included (specifically test files, and localization files).

### Setup

Install mocha and supervisor

```
npm install -g mocha supervisor
```

### Run unit tests

```
npm test
```

### Run interface tests

```
npm test ui
```

To filter test paths by string:

```
npm test ui -- --olsk-match=ResultList
```

To filter test paths by regular expressions:

```
npm test ui -- --olsk-match='/resultlist/i'
```

## License

The code is released under a [Hippocratic License](https://firstdonoharm.dev), modified to exclude its use for surveillance capitalism and also to require large for-profit entities to purchase a paid license.

## Questions

Feel free to ask questions tagged with _launchlet_ on [Super User](https://superuser.com/) or [Stack Overflow](https://stackoverflow.com/).

Let's chat on [Mastodon](https://merveilles.town/@rosano).
