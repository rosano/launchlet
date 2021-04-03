<div class="OLSKDecorNotice">

This document is a work-in-progress. Feel free to reach out on [Mastodon](https://merveilles.town/@rosano) or [Twitter](https://twitter.com/rosano).

</div>

Launchlet is a simple way to run customize web sites with JavaScript and CSS.

Inspired by [Quicksilver](https://qsapp.com), it lets you run commands via the keyboard.

# Recipes: A Thinking Tutorial

A *Recipe* is a format for expressing how functions will run in Launchlet.

## Command

A *Command* is the simplest kind of *Recipe*. It has a `LCHDocumentName` and `LCHDocumentCallbackBody`:

LCHGuideTokenExampleCommandV1

This can be run by Launchlet directly as it has no input.

## Procedure

A *Procedure* has a `LCHDocumentSignature` and `LCHDocumentCallbackBody`, and optionally `LCHDocumentCallbackArgs`:

LCHGuideTokenExampleProcedure

This can be called from any other *Recipe* using the API `this.api['Greet']` or `this.api.Greet`. In this way, the previous example could be changed to:

LCHGuideTokenExampleCommandV2

## Pipe mode: Subject

A *Subject* has a `LCHDocumentName`, `LCHDocumentOutputType` and `LCHDocumentCallbackBody`:

LCHGuideTokenExampleSubject

In Pipe mode, this can be used as input for any *Action* that takes a `String`.

## Pipe mode: Action

An *Action* has a `LCHDocumentName`, `LCHDocumentInputTypes` and `LCHDocumentCallbackBody`:

LCHGuideTokenExampleAction

In Pipe mode, this can be used on any *Subject* that returns a `String`. Although a *Recipe* can have multiple inputs, an *Action* will generally have only one.

# Safety

Running arbitrary JavaScript can be dangerous, and this project comes with no guarantees of safety from malicious code, but there are a few things that the composer will try to flag and ignore:
- dynamic code such as `eval` or `new Function()`
- stateful code that calls `document.cookie`, `localStorage`, `sessionStorage`, `XMLHttpRequest`, `fetch`

Anyone with security expertise and ideas on how to improve safety in the project is welcome to add a [GitHub Issue](https://github.com/launchlet/launchlet/issues).

It is best to run code that is concise and easy to read.

# Recipes from the current page

Optionally, Launchlet can include Recipes from any page that sets `LCHPageRecipes` on the `window` object to an `Array`. This allows pages to expose their functionality in a way that is accessible to 3rd parties:

<pre class="OLSKDecorGlossary"><code>window.LCHPageRecipes = [LCHGuideTokenExamplePageRecipe];</code></pre>

For example, when running Launchlet on <a href="https://rosano.ca" target="_blank">rosano.ca</a>, it is possible to choose a 'Send a message' *Command* that originates from the page.

# Built-in Recipes

## LCHCopyToClipboard(text)

Copy input to clipboard.

Returns promise.

# Shortcuts

<div class="OLSKDecorNotice">

*AccessKey* refers to a one or more shortcut keys followed by a single character. Usually it's `Alt` on Windows or `Control+Alt` on macOS, but it changes [based on your browser and operating system](https://www.w3schools.com/tags/att_global_accesskey.asp#table2).

*Launcher* refers to the app's command runner: press `Alt+Enter`, type the command, then press `Enter` to run.

</div>

| List of recipes ||
:--- | ---
| Create new recipe | `AccessKey+n` |
| Select previous or next card, if filter field is focused | `Up` or `Down` |
| Clear filter text and selected card, focus filter field | `Escape` |
| Close, if filter field is focused | `Escape` |
| `LCHComposeLauncherItemCloneText` | Launcher |
| `OLSKTransportLauncherItemImportJSONText` | Launcher |
| `OLSKTransportLauncherItemExportJSONText` | Launcher |

| Global ||
:--- | ---
| `OLSKRemoteStorageLauncherItemOpenLoginLinkText` | Launcher |
| `OLSKServiceWorkerLauncherItemReloadText` | Launcher |
| `OLSKServiceWorkerLauncherItemDebugForceUpdateText` | Launcher |
| Launcher | `Alt+Enter` |

| Global (when cloud is connected) ||
:--- | ---
| `OLSKRemoteStorageLauncherItemCopyLoginLinkText` | Launcher |
| `OLSKFundLauncherItemEnterClueText` | Launcher |
| `OLSKFundLauncherItemClearClueText` | Launcher |
| `OLSKRemoteStorageLauncherItemDebugFlushDataText` | Launcher |

# What are remoteStorage and Fission?

[remoteStorage](https://remotestorage.io) and [Fission](https://fission.codes) are open protocols for synchronizing data between multiple devices. Both take the level of control and flexibility of something like email and bring it to your personal data. You could think of it as a USB key for your documents that you can plug into websites to work on your stuff.

You can get a remoteStorage account for free from [5apps](https://5apps.com/storage/) or [host your own](https://wiki.remotestorage.io/Servers).

You can get a Fission account for free from [Fission Auth](https://auth.fission.codes) or [setup your own server](https://github.com/fission-suite/fission-suite).
