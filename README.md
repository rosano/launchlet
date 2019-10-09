<a href="https://launchlet.dev"><img src="https://launchlet.dev/logo.svg" style="width: 48px; height: 48px; padding-right: 5px; "></a>

# Launchlet

_Generalized interface for keyboard-based interaction_

Launchlet is a simple way to add a name to snippets of code and run it. Inspired by [Quicksilver](https://qsapp.com/), it functions primarily via mouseless interaction and lets you access your [Recipes](https://launchlet.dev/guide) with a few keyboard strokes. You can also use it to customize websites in the same way as 'userscripts' or 'userstyles'.

You can run Launchlet as a [bookmarklet], [browser extension], or as a [module] in your own project to add a 'jump to' functionality.

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

Testing is generally straight-forward and pleasant but it takes some setup.

Restart the test runner when creating new files so that they will be included (specifically test files, and localization files).

### Setup

I use the same bash scripts across several projects to watch source files for changes and then run the tests. There is a modified (hopefully more cross-platform) version on [gist](https://gist.github.com/rosano/9acc5fcaa4c91acc8a958740c771d6e8).

Save the contents of that file as *test.sh* in the same directory as this file and then `npm test` should be able to find it.

### Run unit tests

```
npm test
```

### Run UI tests

```
npm test ui
```

To filter tests by folder:

```
ROCO_UI_TESTS_MATCH=launcher npm test ui
```

If you know how to fix UI tests that fail randomly because of timing/WebSocket/timeout issues please let me know.

## License

The code is released under a [Hippocratic License](https://firstdonoharm.dev), modified to exclude its use for surveillance capitalism and also to require large for-profit entities to purchase a paid license.

## Questions

Feel free to ask questions tagged with _launchlet_ on [Stack Overflow](https://stackoverflow.com/) or [Super User](https://superuser.com/).

Let's chat on [Mastodon](https://merveilles.town/@rosano).