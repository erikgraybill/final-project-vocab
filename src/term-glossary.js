import { LitElement, html, css } from 'lit';
import '@lrnwebcomponents/vocab-term/vocab-term.js';


export class TermGlossary extends LitElement {
    static get tag() {
        return 'term-glossary'
    }

    static get properties() {
        return {
            term: {},
        }
    }

    constructor() {
        super();
        this.term = "";
    }

    async getData() {
        fetch();
    }

    async searchData() {
        fetch();
    }

    render() {
        return html`
            <vocab-term>
                <details>
                <summary>Coffee</summary>
                <p slot="information">Bean juice made into warm beverage.</p>
                <ul class="links">
                    <li><a href="https://www.starbucks.com/">Link to starbucks information</a></li>
                </ul>
                </details>
            </vocab-term>
        `;
    }
}
customElements.define(TermGlossary.tag, TermGlossary);