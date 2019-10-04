# Launchlet package

The Launchlet package can be added to your own project as a module to quickly present a 'Preview to' functionality.

## Installing

https://unpkg.com/launchlet/__compiled/launchlet.js
https://unpkg.com/launchlet/__compiled/launchlet.css

```
npm install launchlet
```

```html
<link rel="stylesheet" href="https://launchlet.dev/launchlet.css" />
<script src="https://launchlet.dev/launchlet.js"></script>

```

## Usage

### Commit Mode

```javascript
Launchlet.LRTSingletonCreate({
  LRTOptionRecipes: [{
    LCHRecipeName: 'Alfa',
    LCHRecipeCallback () {
      alert('Alfa');
    },
  }],
  LRTOptionMode: Launchlet.LRTModeCommit,
});
```

### Preview Mode

```javascript
Launchlet.LRTSingletonCreate({
  LRTOptionRecipes: [{
    LCHRecipeName: 'Bravo',
    LCHRecipeCallback () {
      console.log('Bravo');
    },
  }, {
    LCHRecipeName: 'Charlie',
    LCHRecipeCallback () {
      console.log('Charlie');
    },
  }],
  LRTOptionMode: Launchlet.LRTModePreview,
});
```

### Pipe Mode

```javascript
Launchlet.LRTSingletonCreate({
  LRTOptionRecipes: [{
    LCHRecipeName: 'Delta',
    LCHRecipeCallback () {
      alert('Delta');
    },
  }],
  LRTOptionMode: Launchlet.LRTModePipe,
});
```

### If you have keyboard shortcuts on the page

Ignore `keydown` events if Launchlet is active:

```javascript
window.addEventListener('keydown', function (event) {
  if (Launchlet.LRTSingletonExists()) {
    return;
  }

  // ...
});
```

## API

### Launchlet.LRTSingletonCreate

Creates a singleton instance of the launcher. Destroys existing instance if there is one. Takes an optional configuration object.

#### Options

- LRTOptionRecipes (array) – `[]`
    - *Recipe* objects

- LRTOptionMode (identifier) – `Launchlet.LRTModeCommit`
    - `Launchlet.LRTModeCommit`
    - `Launchlet.LRTModePreview`
    - `Launchlet.LRTModePipe`

- LCHOptionIncludePageRecipes (boolean) – `false`

- LRTOptionRunTasks (boolean) – `false`

- LRTOptionCompletionHandler (function) – `undefined`

- LRTOptionLanguage (string) – `'en'`
    - `'en'`
    - `'fr'`
    - `'es'`

### Launchlet.LRTSingletonExists

Returns true if there is a singleton instance of the launcher.

### Launchlet.LRTSingletonDestroy

Destroys a singleton instance of the launcher.

### Launchlet.LRTTasksRun

Runs each `Task` that matches the current URL unless `LCHRecipeIsExcluded` returns true.
