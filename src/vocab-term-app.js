import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/vocab-term/vocab-term.js";

// @feedback this is not the vocab-term, this is the app
// I have taken the liberty of adding in the import that visualizes
// the term which you copied the stub code for.
// the scope of this element is to save data in a database
// and then query a segment of text and return the possible words that it discovered
export class VocabTermApp extends LitElement {
    static get tag() {
        return 'vocab-term-app'
    }

    static get properties() {
		return {
			addEnd: { type: String },
            getEnd: { type: String },
			term: { type: String },
            def: { type: String },
            links: { type: Array },
            renderType: { type: String },
            words: { type: Array }
		}
	}

	constructor() {
		super();
        this.addEnd = '/api/addWord';
        this.getEnd = '/api/getWords';
		this.term = '';
        this.def = '';
        this.links = [];
        this.renderType = 'term';
        this.words = [];
	}

    addTerm(word) {
        var queryString = Object.keys(word).map(key => key + '=' + word[key]).join('&');
        console.log(queryString);
        fetch(`${this.addEnd}?${queryString}`).then(res => res.json()).then((data) => {
            console.log(data);
        });
    }

    deleteTerm() {

    }

    searchTerms() {
        
    }

    viewTerms() {
        fetch(`${this.getEnd}`).then(res => res.json()).then((data) => {
            console.log(data);
        });
    }

    renderResult() {
        if (this.renderType === 'term') {
            return html`
                ${this.words.map(
                    item => html`
                    <vocab-term>
                        <details>
                        <summary>Coffee ${item.term}</summary>
                        <p slot="information">Bean juice made into warm beverage. ${item.def}</p>
                        <ul class="links">
                            <li><a href="https://www.starbucks.com/">Link to starbucks information ${item.links}</a></li>
                        </ul>
                        </details>
                    </vocab-term>
                `)}
            `;
        }
        else {
            return html`
                <dl>
                    ${this.words.map(
                        item => html`
                        <dt>${item.term}</dt>
                        <dd>${item.def}</dd>
                        <dd>${item.links}</dd>
                    `)}
                </dl>
            `;
        }
    }

    render() {
        
        return html`
            ${this.renderResult()};
        `;
    }
}
customElements.define(VocabTermApp.tag, VocabTermApp);