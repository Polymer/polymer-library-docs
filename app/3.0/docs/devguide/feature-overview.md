---
subtitle: Feature Overview
title: Polymer library
---

## Notice: Not under active development {#support-notice}

**The Polymer library is no longer under active development.** Only very select changes are being made to the code at this point, and newly-reported bugs are unlikely to be fixed unless they represent critical security issues.

**Polymer has been superseded by <a href="https://lit.dev">Lit</a>, a smaller, faster, next-generation web components library.**  Thanks to the interoperability of web components, elements built with Polymer 3.0 and Lit  can be mixed and matched in the same application. You can upgrade a Polymer project to Lit one element at a time. 

*   For information on upgrading, see <a href="https://lit.dev/articles/lit-for-polymer-users/">Lit for Polymer users</a>.

*   For help with existing Polymer library apps or getting up to speed on Lit, we recommend joining the <a href="https://lit.dev/discord/">Lit Discord server</a>.

## Feature overview

The Polymer library provides a set of features for creating custom elements. These features are
designed to make it easier and faster to make custom elements that work like standard DOM elements.
Similar to standard DOM elements, Polymer elements can be:

* Instantiated using a constructor or `document.createElement`.
* Configured using attributes or properties.
* Populated with internal DOM inside each instance.
* Responsive to property and attribute changes.
* Styled with internal defaults or externally.
* Responsive to methods that manipulate its internal state.

A basic Polymer element definition looks like this:

```js
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

// Define the element's API using an ES2015 class
class XCustom extends PolymerElement {

  // Define optional shadow DOM template
  static get template() { 
    return html`
      <style>
        /* CSS rules for your element */
      </style>

        <!-- shadow DOM for your element -->

      <div>[[greeting]]</div> <!-- data bindings in shadow DOM -->
    `;
  }

  // Declare properties for the element's public API
  static get properties() {
    return {
      greeting: {
        type: String
      }
    }
  }

  constructor() {
    super();
    this.greeting = 'Hello!';
  }

  // Add methods to the element's public API
  greetMe() {
    console.log(this.greeting);
  }

}

// Register the x-custom element with the browser
customElements.define('x-custom', XCustom);
```

This guide divides the features into the following groups:

*   [Custom elements](custom-elements). Registering an
    element associates a class with a custom element name. The
    element provides callbacks to manage its lifecycle. Polymer also lets you declare properties,
    to integrate your element's property API with the Polymer data system.

*   [Shadow DOM](shadow-dom). Shadow DOM provides a local, encapsulated DOM tree for your element.
    Polymer can automatically create and populate a shadow tree for your element from a DOM
    template.

*   [Events](events). Polymer provides a declarative syntax for attaching event listeners to
    shadow DOM children. It also provides an optional library for handling gesture events.

*   [Data system](data-system). The Polymer data system provides data binding to properties and
    attributes; property observers; and computed properties.


If you're upgrading an existing 2.x element to 3.x, see the
[Upgrade guide](/3.0/docs/upgrade) for advice.

If you're looking for the latest changes in this release, see the
[Release notes](/3.0/docs/release-notes).
