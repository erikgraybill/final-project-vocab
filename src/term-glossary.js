import { LitElement, html, css } from 'lit';
import '@lrnwebcomponents/vocab-term/vocab-term.js';


export class TermGlossary extends LitElement {
    static get tag() {
        return 'term-glossary'
    }

    static get properties() {
        return {
            term: { type: String },
            definition: { type: String },
            links:  {type: Array },
            endpoint: { type: String },
            searchEnd: { type: String},
            glossary: {},
        }
    }

    constructor() {
        super();
        this.term = '';
        this.definition = '';
        this.links = [];
        this.endpoint = '/api/getWords';
        this.searchEnd = '/api/getWord';
        this.glossary = [];
    }

    // query db for all terms
    async getData() {
        fetch(this.endpoint).then(resp => {
            if (resp.ok) {
              return resp.json();
            }
            return false;
        }).then(data => {
            this.glossary = [];
            for (let i = 0; i < data.length; i++) {
                const results = {
                    term: data[i].Word,
                    definition: data[i].Definition,
                    links: data[i].Links,
                };
                this.glossary.push(results);
            }
        });
    }

    // can be moved to separate file
    // gathers data from processing block, sends to db to find matches
    async searchData() {
        // search db for match
        fetch(`${this.searchEnd}?word=${term}`).then();
        // replace found terms with vocab-term tag
        html` 
        <vocab-term>
            <details>
                <summary>${this.term}</summary>
                <p slot="information">${this.definition}</p>
                <ul class="links">
                    <li><a href="${this.links[0]}">Link to more information</a></li>
                </ul>
            </details>
        </vocab-term>
        `
    }

    // updated(changedProperties) {
	// 	changedProperties.forEach((old, propName) => {
	// 		if (propName === '') {
	// 			this.getData(this[propName]); 
	// 		}
	// 	});
	// }

    render() {
        return html`
            ${this.glossary.map(
                item => html`
                    <dl>
                        <dt>${item.term}</dt>
                        <dd>${item.definition}</dd>
                        <dd>${item.links}</dd>
                    </dl>
                `
            )}
        `}
    ;
}
customElements.define(TermGlossary.tag, TermGlossary);