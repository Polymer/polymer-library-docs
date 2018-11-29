/*
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { scroll } from '@polymer/app-layout/helpers/helpers.js';

class PwFooter extends PolymerElement {
  static get template() {
    return html`
    <style include="iron-flex iron-flex-alignment">
      :host {
        display: block;
      }

      a {
        color: #333;
        text-decoration: none;
      }

      .footer-links {
        /* background: #263238;  /* blue-grey-900 */ 
        background: white;
        padding: 30px 10px;
      }

      .footer-links > * {
        margin: 10px;
      }

      .footer-links .title {
        font-family: 'Roboto Slab', 'Roboto', 'Noto', sans-serif;
        color: black; 
        border-top: 1px solid #707375;
        padding-top: 10px;
        font-size: 13px;
      }

      .footer-links a {
        text-decoration: none;
        /* color: #979797; */
        display: block;
        font-size: 11px;
        line-height: 20px;
      }

      .copyright {
        background: white;
        color: black;
        padding: 10px;
      }
      
      .copyright div {
        font-size: 16px;
      }

      .copyright span.additional-text {
        font-size: 11px;
      }

      span.attribution a {
        color: #1e88e5;
      }

      .copyright img {
        padding-left: 10px;
        height: 20px;
      }

      .copyright * {
        vertical-align: middle;
      }

      @media (max-width: 767px) {
        .footer-media-links a {
          min-width: 24px;
          padding-left: 15px;
          padding-right: 15px;
        }

        .footer-media-links a span{
          display: none;
        }
      }

      @media (max-width: 479px) {
        .copyright.layout.horizontal {
          flex-direction: column;
          padding: 20px 10px;
        }

        .copyright > * {
          flex: 0 0 auto;
        }

        .copyright .additional-text {
          display: none;
        }
      }
    </style>

    <footer>        
      <div class="copyright layout horizontal">
        <div class="flex">
          Brought to you by <a href="https://www.polymer-project.org">The Polymer Project</a>.  
          <span class="additional-text">Copyright 2018 The Polymer Project Authors. 
          Code licensed under the
          <a target="_blank" href="http://polymer.github.io/LICENSE.txt">BSD License</a>. 
          Documentation licensed under CC BY 3.0.
          </span>
        </div>
        <div>
          <a href="https://www.github.com/polymer/polymer" rel="noopener" target="_blank"><iron-icon icon="social-icons:github"></iron-icon></a>
          <a href="https://www.twitter.com/polymer" rel="noopener" target="_blank"><iron-icon icon="social-icons:twitter"></iron-icon></a> 
          <a href="https://groups.google.com//forum/#!forum/polymer-dev" rel="noopener" target="_blank"><iron-icon icon="communication:email"<iron-icon></iron-icon></a>
        </div>
      </div>
    </footer>
    `;
  }

  _smoothScrollToTop(event) {
    event.preventDefault();
    scroll({ top: 0, behavior: 'smooth' });

    // Kick focus back to the page
    // User will start from the top of the document again
    event.target.blur();
  }
}

customElements.define('pw-footer', PwFooter);
