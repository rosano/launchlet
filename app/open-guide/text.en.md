# Launchlet Guide

<div class="LCHGuideNotice">

This document is a work-in-progress. Feel free to ask questions tagged with *launchlet* on [Stack Overflow](https://stackoverflow.com) or [Super User](https://superuser.com/).

</div>

## Recipes: A Thinking Tutorial

A *Recipe* is a format for expressing how functions will run in Launchlet.

### Command

A *Command* is the simplest kind of *Recipe*. It has a `LCHDocumentName` and `LCHDocumentCallbackBody`:

LCHGuideTokenExampleCommandV1

This can be run by Launchlet directly as it has no input.

### Procedure

A *Procedure* has a `LCHDocumentSignature` and `LCHDocumentCallbackBody`, and optionally `LCHDocumentCallbackArgs`:

LCHGuideTokenExampleProcedure

This can be called from any other *Recipe* using the API `this.api['Greet']` or `this.api.Greet`. In this way, the previous example could be changed to:

LCHGuideTokenExampleCommandV2

### Pipe mode: Subject

A *Subject* has a `LCHDocumentName`, `LCHDocumentOutputType` and `LCHDocumentCallbackBody`:

LCHGuideTokenExampleSubject

In Pipe mode, this can be used as input for any *Action* that takes a `String`.

### Pipe mode: Action

An *Action* has a `LCHDocumentName`, `LCHDocumentInputTypes` and `LCHDocumentCallbackBody`:

LCHGuideTokenExampleAction

In Pipe mode, this can be used on any *Subject* that returns a `String`. Although a *Recipe* can have multiple inputs, an *Action* will generally have only one.

* * *

## Safety

Running arbitrary JavaScript can be dangerous, and this project comes with no guarantees of safety from malicious code, but there are a few things that the composer will try to flag and ignore:
- dynamic code such as `eval` or `new Function()`
- stateful code that calls `document.cookie`, `localStorage`, `sessionStorage`, `XMLHttpRequest`, `fetch`

Anyone with security expertise and ideas on how to improve safety in the project is welcome to add a [GitHub Issue].

It is best to run code that is concise and easy to read.

* * *

## Recipes from the current page

Optionally, Launchlet can include Recipes from any page that sets `LCHPageRecipes` on the `window` object to an `Array`. This allows pages to expose their functionality in a way that is accessible to 3rd parties:

<pre class="LCHGuideExample"><code>window.LCHPageRecipes = [LCHGuideTokenExamplePageRecipe];</code></pre>

For example, when running Launchlet on <a href="https://rosano.ca" target="_blank">rosano.ca</a>, it is possible to choose a 'Send a message' *Command* that originates from the page.

* * *

## What is remoteStorage?

[remoteStorage](https://remotestorage.io) is an incredible open-source technology for synchronizing data between multiple devices and making it available offline.

It allows the same data to be used in different ways by multiple apps. You could think of it as a USB key for your documents that you can plug into websites to work on your stuff.

If you don't have one, it also works with Dropbox and Google Drive. You can also get one for free from [5apps](https://5apps.com/storage/).
