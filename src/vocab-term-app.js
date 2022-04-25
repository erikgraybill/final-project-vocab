import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/vocab-term/vocab-term.js";


export class VocabTermApp extends LitElement {
    static get tag() {
        return 'vocab-term-app'
    }

    static get properties() {
		return {
            addEnd: { type: String },
            getEnd: { type: String },
            removeEnd: { type: String },
            searchEnd: { type: String },
            term: { type: String },
            def: { type: String },
            links: { type: Array },
            wordId: {},
            renderType: { type: String },
            words: { type: Array },
            glossary: {},
		}
	}

	constructor() {
		super();
        this.addEnd = '/api/addWord';
        this.getEnd = '/api/getWords';
        this.removeEnd = '/api/removeWord';
        this.searchEnd = '/api/processWords'; 
	    this.term = '';
        this.def = '';
        this.links = [];
        this.wordId = 0;
        this.renderType = 'term';
        this.words = [];
        this.glossary = [];
	}

    addTerm(word) {
        var queryString = Object.keys(word).map(key => key + '=' + word[key]).join('&');
        console.log(queryString.toString);
        fetch(`${this.addEnd}?${queryString}`).then(res => res.json()).then((data) => {
            console.log(data);
        });
    }

    deleteTerm(e) {
        const wordId = e.target.getAttribute('data-id');
        var queryString = `wordId=${wordId}`;
        fetch(`${this.removeEnd}?${queryString}`).then(res => res.json()).then((data) => {
            console.log(data);
        });
    }

    async searchTerms(input) {
        var queryString = `paragraph=${input}`;
        await fetch(`${this.searchEnd}?${queryString}`).then(res => res.json()).then((data) => {
            this.words = [];
            for(const item of data) {
                const vocab = {
                    term: item["Word"],
                    def: item["Definition"],
                    links: item["Links"],
                };
                this.words.push(vocab);
            }
        });
      
        console.log(this.words);
        this.renderType = 'list';
        this.requestUpdate(this.renderType, 'term');            
    }

    viewTerms() {
        fetch(this.getEnd).then(res => res.json()).then((data) => {
            this.words = [];
            console.log(data);
            for(const item of data) {
                const vocab = {
                    term: item["Word"],
                    def: item["Definition"],
                    links: item["Links"],
                };
                this.words.push(vocab);
            }
        });
        this.renderType = 'list'
        this.requestUpdate(this.renderType, 'term');
    }

    processTerms() {

    }

    renderResult() {
        if (this.renderType === 'term') {
            return html`
                ${this.words.map(
                    item => html`
                    <vocab-term>
                        <details>
                        <summary>${item.term}</summary>
                        <p slot="information">${item.def}</p>
                        <ul class="links">
                            <li><a href="${item.links}">${item.links}</a></li>
                        </ul>
                        </details>
                    </vocab-term>
                `)}
            `
        }
        else {
            return html`
                <dl>
                    ${this.words.map(
                        item => html`
                        <dt>${item.term}</dt>
                        <dd>${item.def}</dd>
                        <dd>${item.links}</dd>
                        <script type="module">
                            import "./src/vocab-term-app.js";
                        </script>
                        <button @click="${this.deleteTerm}" data-id="${item.wordId}">Delete this word</button>
                        <br>
                    `)}
                </dl>
            `
        }
    }

    render() {
        return html`${this.renderResult()}` 
    }
}
customElements.define(VocabTermApp.tag, VocabTermApp);