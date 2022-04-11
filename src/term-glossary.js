import { LitElement, html, css } from 'lit';
import '@lrnwebcomponents/vocab-term/vocab-term.js';


export class TermGlossary extends LitElement {
    static get tag() {
        return 'term-glossary'
    }

    static get properties() {
        return {
            term: {},
            definition: {},
            links: {},
            endpoint: {},
            glossary: {},
        }
    }

    constructor() {
        super();
        this.term = '';
        this.definition = '';
        this.links = [];
        this.endpoint = '';
        this.glossary = [];
    }

    async addWord() {
        html` 
        <vocab-term>
            <details>
                <summary>${this.term}</summary>
                <p slot="information">${this.definition}</p>
                <ul class="links">
                    <!-- <li><a href="${this.links}">Link to information</a></li> -->
                </ul>
            </details>
        </vocab-term>
        `
    }

    async getData() {
        fetch('').then(resp => {
            if (resp.ok) {
              return resp.json();
            }
            return false;
        }).then(data => {
            this.glossary = [];
            for (let i = 0; i < data.collection.items.length; i++) {
                const results = {
                    term: data.collection.items[i].data[0].summary,
                    definition: data.collection.items[i].data[0].information,
                    links: data.collection.items[i].data[0].links,
                };
                this.glossary.push(results);
            }
        });
    }

    async searchData() {
        fetch('').then();
    }

    updated(changedProperties) {
		changedProperties.forEach((old, propName) => {
			if (propName === '') {
				this.getData(this[propName]); 
			}
		});
	}

    render() {
        return html`
            <dl>
                ${this.glossary.map(
                    item => html`
                        <dt>${this.term}</dt>
                        <dd>${this.definition}</dd>
                        <dd>${this.links}</dd>
                    `
                )}
            </dl>
        `;
    }
}
customElements.define(TermGlossary.tag, TermGlossary);