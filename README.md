<a href="https://launchlet.dev"><img alt="Project logo" src="https://static.rosano.ca/launchlet/identity.svg" width="64" /></a>

# [Launchlet](https://launchlet.dev)

_Customize the web with JavaScript or CSS_

<a href="https://launchlet.dev">Launchlet</a> is a simple way to add a name to snippets of code and run it. Inspired by [Quicksilver](https://qsapp.com/), it functions primarily via mouseless interaction and lets you access your Recipes with a few keyboard strokes. You can also use it to personalize websites with custom CSS or JavaScript. Read the <a href="https://launchlet.dev">guide</a> for more details.

You can run Launchlet as a [bookmarklet](https://launchlet.dev/compose), [browser extension](https://github.com/launchlet/launchlet-extension), or as a [module](https://github.com/launchlet/launchlet/tree/master/os-app/dev-package) in your own project to add a 'jump to' functionality.

There is also an app where you can compose a launcher personalized with your own Recipes.

<a href="https://launchlet.dev/compose"><img alt="Open app" src="http://static.rosano.ca/_shared/_RCSAppButton.svg" /></a>

## Architecture

The project follows a [Universal folder structure](https://rosano.hmm.garden/01f71kp52knc5nnv08qr9kzj3m) and is a large collection of mostly small modules or functions that are put together using [Svelte](https://svelte.dev) and [Rollup](https://rollupjs.org). With the exception of a few 'global' or 'magic' things such as the localization function `OLSKLocalized`, most resources used by a module should be in the same folder or referenced by path name.

Routing, rendering markdown content, and serving pages is done via a Node.js server (usually configured in the *controller.js* files).

## Development Setup

(For a deeper dive, watch [the tutorial](https://rosano.hmm.garden/01f62t5yseb053m024v1mczbzy)).

Install [Node.js and npm](https://nodejs.org/en/download/), then:

```
npm run setup
```

This should create an `.env` file if there is none. If you encounter errors referring to this file, you can find missing variables in `.env-sample`.

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

See [Testing logic and interfaces](https://rosano.hmm.garden/01f7v3hk3txz5d0v9ms467x8bz) for a tutorial.

### Run logic tests

```
npm test
```

### Run interface tests

```
npm test ui
```

To filter interface test paths by string:

```
npm test ui match=ResultList
```

To filter interface test paths by JavaScript regular expressions:

```
npm test ui match='/(guide|vitrine)/'
```

## ❤️

Help me keep creating projects that are public, accessible for free, and open-source.

<a href="https://rosano.ca/back"><img alt="Become a backer" src="https://static.rosano.ca/_shared/_RCSBackButton.svg" /></a>

## License

The code is released under a [Hippocratic License](https://firstdonoharm.dev), modified to exclude its use for surveillance capitalism and also to require large for-profit entities to purchase a paid license.

## Questions

Feel free to reach out on [Mastodon](https://mastodon.online/@rosano) or [Twitter](https://twitter.com/rosano).
