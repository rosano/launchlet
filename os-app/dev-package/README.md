# Launchlet package

The Launchlet package can be added to your own project as a module to quickly present a 'Jump to' functionality.

## Setup

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
Launchlet.LCHSingletonCreate({
  LCHOptionRecipes: [{
    LCHRecipeName: 'Alfa',
    LCHRecipeCallback () {
      alert('Alfa');
    },
  }],
  LCHOptionMode: Launchlet.LCHModeCommit,
});
```

### Preview Mode

```javascript
Launchlet.LCHSingletonCreate({
  LCHOptionRecipes: [{
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
  LCHOptionMode: Launchlet.LCHModePreview,
});
```

### Pipe Mode

```javascript
Launchlet.LCHSingletonCreate({
  LCHOptionRecipes: [{
    LCHRecipeName: 'Delta',
    LCHRecipeCallback () {
      alert('Delta');
    },
  }],
  LCHOptionMode: Launchlet.LCHModePipe,
});
```

### If you have keyboard shortcuts on the page

Ignore `keydown` events if Launchlet is active:

```javascript
window.addEventListener('keydown', function (event) {
  if (Launchlet.LCHSingletonExists()) {
    return;
  }

  // ...
});
```

## API

### Launchlet.LCHSingletonCreate

Creates a singleton instance of the launcher. Destroys existing instance if there is one. Takes an optional configuration object.

#### Options

- LCHOptionRecipes (array) – `[]`
    - *Recipe* objects

- LCHOptionMode (identifier) – `Launchlet.LCHModeCommit`
    - `Launchlet.LCHModeCommit`
    - `Launchlet.LCHModePreview`
    - `Launchlet.LCHModePipe`

- LCHOptionIncludePageRecipes (boolean) – `false`

- LCHOptionRunAutomaticRecipes (boolean) – `false`

- LCHOptionCompletionHandler (function) – `undefined`

- LCHOptionLanguage (string) – `'en'`
    - `'en'`
    - `'fr'`
    - `'es'`

### Launchlet.LCHSingletonExists

Returns true if there is a singleton instance of the launcher.

### Launchlet.LCHSingletonDestroy

Destroys a singleton instance of the launcher.

### Launchlet.LCHTasksRun

Runs each `Task` that matches the current URL unless `LCHRecipeIsExcluded` returns true.
