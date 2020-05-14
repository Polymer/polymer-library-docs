---
title: Global settings
---

<!-- toc -->

The `settings` module (`@polymer/polymer/lib/utils/settings.js`) exports setter functions for a few global configuration properties.

Each setting is exposed as a (read-only) property on the module. You can set a property by calling its associated setter. Settings should generally be set before creating any elements.

For example:

```js
// Import settings module
import * as settings from '@polymer/polymer/lib/utils/settings.js';

// Update the setting
settings.setRootPath('/');

// Read the setting
console.log(settings.rootPath);

// Import elements that use Polymer
import 'my-app.js';
```

You can also import individual setters from the module:

```js
import {setRootPath} from '@polymer/polymer/lib/utils/settings.js';
```

## Settings summary

This section lists the available settings. See the linked sections for more detail.

<dl>
<dt>

[`fastDomIf`](#fastdomif) 

</dt>
<dd> 

Enables a faster version of `<dom-if>` with some limitations. 

</dd>
<dt>

[`legacyNoObservedAttributes`](#legacynoobservedattributes)

</dt>
<dd>

An optimization that may improve startup performance for certain apps using legacy elements.

</dd>
<dt>

[`legacyUndefined`](#legacyundefined)

</dt>
<dd>

Reverts to Polymer v1-compatible handling of `undefined` values when calculating computed properties.

</dd>
<dt>

[`legacyWarnings`](#legacywarnings)

</dt>
<dd>

Causes Polymer to warn if a component's template contains bindings to properties that are not listed in that element's [`properties` block](https://polymer-library.polymer-project.org/3.0/docs/devguide/properties).

</dd>
<dt>

[`orderedComputed`](#orderedcomputed)

</dt>
<dd>

Causes Polymer to topologically sort each component's computed properties graph when the class is initialized and uses that order whenever computed properties are run.

</dd>
<dt>

[`passiveTouchGestures`](#setting-passive-touch-gestures)

</dt>
<dd>

If `true`, forces all gesture listeners to be passive. 

</dd>
<dt>

[`removeNestedTemplates`](#removenestedtemplates)

</dt>
<dd>

Removes the child `<template>` elements used by `<dom-if>` and `<dom-repeat>` from the their containing templates. This can improve the performance of cloning your component's template when new instances are created.

</dd>
<dt>

[`rootPath`](#rootpath)

</dt>
<dd>

Sets a global <code>rootPath</code> property that can be used in templates to generate URLs that are relative to the application root.

</dd>
<dt>

[`sanitizeDOMValue`](#sanitizedomvalue)

</dt>
<dd>

Specifies a global callback used to sanitize any value before inserting it into the DOM.

</dd>
<dt>

[`suppressTemplateNotifications`](#suppresstemplatenotifications)

</dt>
<dd>

Causes `<dom-if>` and `<dom-repeat>` not to dispatch `dom-change` events when their rendered content is updated.

</dd>
<dt>

[`useAdoptedStyleSheetsWithBuiltCSS`](#useadoptedstylesheetswithbuiltcss)

</dt>
<dd>

If your application uses [pre-built Shady CSS styles](https://github.com/polymer/polymer-css-build), this setting enables using constructable style sheets, which may improve performance for some apps. 

</dd>
</dl>

There are also a number of polyfill-specific settings. See [Polyfills](/{{{polymer_version_dir}}}/docs/polyfills) for
details.

## fastDomIf

`fastDomIf` <br>
`setFastDomIf(boolean)`

Enables a different implementation of `<dom-if>` that uses its host element's template stamping facilities (provided as part of `PolymerElement`) rather than including its own. This setting can help with performance but comes with a few caveats:

- First, `fastDomIf` requires that every `<dom-if>` is in the shadow root of a Polymer element: you can't use a `<dom-if>` directly in the main document or inside a shadow root of an element that doesn't extend `PolymerElement`.

- Second, because the `fastDomIf` implementation of `<dom-if>` doesn't include its own template stamping features, it doesn't create its own scope for property effects. This means that any properties you were previously setting on the `<dom-if>` will no longer be applied within its template, only properties of the host element are available.

**Should I use it?** This setting is recommended as long as your app doesn't use `<dom-if>` as described in the section above.

## legacyNoObservedAttributes

`legacyNoObservedAttributes` <br>
 `setLegacyNoObservedAttributes(boolean)`

Causes `LegacyElementMixin` not to use the browser's built-in mechanism for informing elements of attribute changes (i.e. `observedAttributes` and `attributeChangedCallback`), which lets Polymer skip computing the list of attributes it tells the browser to observe. Instead, `LegacyElementMixin` simulates this behavior by overriding attribute APIs on the element and calling `attributeChangedCallback` itself.

This setting has similar API restrictions to those of the [custom elements polyfill](https://github.com/webcomponents/polyfills/tree/master/packages/custom-elements). You should only use the element's `setAttribute` and `removeAttribute` methods to modify attributes: using (e.g.) the element's `attributes` property to modify its attributes is not supported with `legacyNoObservedAttributes` and won't properly trigger `attributeChangedCallback` or any property effects.

Components can override the global setting by setting their `_legacyForceObservedAttributes` property to `true`. This property's effects occur at startup; it won't have any effect if modified at runtime and should be set in the class definition.

**Should I use it?** This setting should only be used if startup time is significantly affected by Polymer's class initialization work—for example, if you have a large number of components being loaded but are only instantiating a small subset of them. Otherwise, this setting is **not recommended**.

## legacyUndefined

`legacyUndefined` <br>
`setLegacyUndefined(boolean)`

Reverts how computed properties handle `undefined` values to the Polymer 1 behavior: when enabled, computed properties will only be recomputed if none of their dependencies are `undefined`.

Components can override the global setting by setting their `_overrideLegacyUndefined` property to `true`. This is useful for reenabling the default behavior as you migrate individual components:

```js
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

class MigratedElement extends PolymerElement { /* ... */ }

// All MigratedElement instances will use the default behavior.
MigratedElement.prototype._overrideLegacyUndefined = true;

customElements.define('migrated-element', SomeElement);
```

**Should I use it?** This setting should only be used for migrating legacy codebases that depend on this behavior and is otherwise **not recommended**.
  
## legacyWarnings

  `legacyWarnings` <br>
  `setLegacyWarnings(boolean)`

Causes Polymer to warn if a component's template contains bindings to properties that are not listed in that element's [`properties` block](https://polymer-library.polymer-project.org/3.0/docs/devguide/properties). For example:

```js
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

class SomeElement extends PolymerElement {
  static get template() {
    return html`<span>[[someProperty]] is used here</span>`;
  }

  static get properties() {
    return { /* but `someProperty` is not declared here */ };
  }
}

customElements.define('some-element', SomeElement);
```

Only properties explicitly declared in the `properties` block are [associated with an attribute](https://polymer-library.polymer-project.org/3.0/docs/devguide/properties#property-name-mapping) and [update when that attribute changes](https://polymer-library.polymer-project.org/3.0/docs/devguide/properties#attribute-deserialization). Enabling this setting will show you where you might have forgotten to declare properties.

**Should I use it?** Consider using this feature during development but don't enable it in production.

## orderedComputed

`orderedComputed` <br>
`setOrderedComputed(boolean)`

Causes Polymer to topologically sort each component's computed properties graph when the class is initialized and uses that order whenever computed properties are run.

For example:

```js
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

class SomeElement extends PolymerElement {
  static get properties() {
    return {
      a: {type: Number, value: 0},
      b: {type: Number, computed: 'computeB(a)'},
      c: {type: Number, computed: 'computeC(a, b)'},
    };
  }

  computeB(a) {
    console.log('Computing b...');
    return a + 1;
  }

  computeC(a, b) {
    console.log('Computing c...');
    return (a + b) * 2;
  }
}

customElements.define('some-element', SomeElement);
```

When `a` changes, Polymer's default behavior does not specify the order in which its dependents will run. Given that both `b` and `c` depend directly on `a`, one of two possible orders could occur: [`computeB`, `computeC`] or [`computeC`, `computeB`].

- In the first case—[`computeB`, `computeC`]—`computeB` is run with the new value of `a` and produces a new value for `b`. Then, `computeC` is run with both the new values of `a` and `b` to produce `c`.

- In the second case—[`computeC`, `computeB`]—`computeC` is run first with the new value of `a` and the _current_ value of `b` to produce `c`. Then, `computeB` is run with the new value of `a` to produce `b`. If `computeB` changed the value of `b` then `computeC` will be run again, with the new values of both `a` and `b` to produce the final value of `c`.

However, with `orderedComputed` enabled, the computed properties would have been previously sorted into [`computeB`, `computeC`], so updating `a` would cause them to run specifically in that order.

If your component's computed property graph contains cycles, the order in which they are run when using `orderedComputed` is still undefined.

**Should I use it?** The value of this setting depends on how your computed property functions are implemented. If they are pure and relatively inexpensive, you shouldn't need to enable this feature. If they have side effects that would make the order in which they are run important or are expensive enough that it would be a problem to run them multiple times for a property update, consider enabling it.

## passiveTouchGestures { #setting-passive-touch-gestures }

`passiveTouchGestures` <br>
`setPassiveTouchGestures(boolean)`

Call `setPassiveTouchGestures(true)` to force all [event listeners for gestures](gesture-events) to be passive. Passive event listeners can't call `preventDefault` to prevent the default browser handling, so the browser can handle the native gesture without waiting for the event listener to return.

You must call `setPassiveTouchGestures` before adding any gesture event listeners—for example, by setting it in the application entrypoint, or in the constructor of your main application element (assuming that's always the first element to load).

Using passive touch gestures may improve scrolling performance, but will cause problems if any of the elements in your application depend on being able to call `preventDefault` on a gesture.

Set passive touch gestures from the app shell {.caption}

```js
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {setPassiveTouchGestures} from '@polymer/polymer/lib/utils/settings.js';

class MyApp extends PolymerElement {
  constructor(){
    super();
    // Set passive gestures globally for all elements using Polymer gestures
    setPassiveTouchGestures(true);
    // Set root path globally
    setRootPath("/endpoint/");
    //
  }
}
```

Set passive touch gestures from the app entrypoint {.caption}

```html
<head>
  <script type="module">
    import {setPassiveTouchGestures} from '@polymer/polymer/lib/utils/settings.js';
    setPassiveTouchGestures(true);
  </script>
  <script type="module" src="my-app.js"></script>
  ...
</head>
```


## removeNestedTemplates

`removeNestedTemplates` <br>
`setRemoveNestedTemplates(boolean)`

**What does it do?** This setting causes Polymer to remove the child `<template>` elements used by `<dom-if>` and `<dom-repeat>` from the their containing templates. This can improve the performance of cloning your component's template when new instances are created.

**Should I use it?** This setting is generally recommended.

## rootPath

`rootPath` <br>
`setRootPath(string)`

Sets a global <code>rootPath</code> property that can be used in templates to generate URLs that
are relative to the application root.

## sanitizeDOMValue

`sanitizeDOMValue` <br>
`setSanitizeDOMValue(Function)`

A global callback used to sanitize any value before inserting it into the DOM.
The callback signature is:

```js
function(value, name, type, node) { ... }
```

Where:

-   `value` is the value to sanitize.
-   `name` is the name of an attribute or property (for example, `href`).
-   `type` indicates where the value is being inserted: one of `property`, `attribute`, or `text`.
-   `node` is the node where the value is being inserted.

## suppressTemplateNotifications

`suppressTemplateNotifications` <br>
`setSuppressTemplateNotifications(boolean)`

Causes `<dom-if>` and `<dom-repeat>` not to dispatch `dom-change` events when their rendered content is updated. If you're using lots of `<dom-if>` and `<dom-repeat>` but not listening for these events, this setting lets you disable them and their associated dispatch work.

You can override the global setting for an individual `<dom-if>` or `<dom-repeat>` by setting its `notify-dom-change` boolean attribute:

```js
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

class SomeElement extends PolymerElement {
  static get properties() {
    return {
      visible: {type: Boolean, value: false},
    };
  }

  static get template() {
    return html`
      <button on-click="_toggle">Toggle</button>
      <!-- Set notify-dom-change to enable dom-change events for this particular <dom-if>. -->
      <dom-if if="[[visible]]" notify-dom-change on-dom-change="_onDomChange">
        <template>
          Hello!
        </template>
      </dom-if>
    `;
  }

  _toggle() {
    this.visible = !this.visible;
  }

  _onDomChange(e) {
    console.log("Received 'dom-change' event.");
  }
}

customElements.define('some-element', SomeElement);
```

**Should I use it?** This setting is generally recommended.



## useAdoptedStyleSheetsWithBuiltCSS

`useAdoptedStyleSheetsWithBuiltCSS` <br>
`setUseAdoptedStyleSheetsWithBuiltCSS(boolean)`

If your application uses [pre-built Shady CSS styles](https://github.com/polymer/polymer-css-build) and your browser supports [constructable stylesheet objects](https://wicg.github.io/construct-stylesheets/), this setting causes Polymer to extract all `<style>` elements from your components' templates, join them into a single stylesheet, and share this stylesheet with all instances of the component using their shadow roots' [`adoptedStyleSheets`](https://wicg.github.io/construct-stylesheets/#dom-documentorshadowroot-adoptedstylesheets) array. This setting may improve your components' memory usage and performance depending on how many instances you create and how large their style sheets are.

**Should I use it?** Consider using this setting if your app already uses pre-built Shady CSS styles. Note that position-dependent CSS selectors (e.g. containing `:nth-child()`) may become unreliable for siblings of your components' styles as a result of runtime-detected browser support determining if styles are removed from your components' shadow roots.