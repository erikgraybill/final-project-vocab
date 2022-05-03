import { LitElement, html, css, render } from 'lit';
import "@lrnwebcomponents/vocab-term/vocab-term.js";
//import '@lrnwebcomponents/accent-card.js';


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
            processInput: { type: String },
            processOutput: { type: String },
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
        this.processInput = '';
        this.processOutput = '';
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
        this.processInput = input;
        await fetch(`${this.searchEnd}?${queryString}`).then(res => res.json()).then((data) => {
            this.words = [];
            for(const item of data) {
                const vocab = {
                    term: item["Word"],
                    def: item["Definition"],
                    links: item["Links"],
                };
                this.processInput = this.processInput.replaceAll(vocab.term, this.replaceTerm(vocab));
                this.words.push(vocab);
            }
            this.shadowRoot.querySelector('#inputhere').innerHTML = this.processInput;
        });
        this.processOutput = input;
        console.log(this.words);
        this.renderType = 'process';
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
                    wordId: item["WordId"],
                };
                this.words.push(vocab);
            }
            this.sortTerms(this.words);
        });
        this.renderType = 'list';
        this.requestUpdate();
    }

    sortTerms(list){
        list.sort(function(a, b){
            var wordA = a.term.toLowerCase(), wordB = b.term.toLowerCase();
            if (wordA < wordB) //sort string ascending
             return -1;
            if (wordA > wordB)
             return 1;
            return 0; //default return value (no sorting)
           });
    }

    replaceTerm(word) {
        return `
            <vocab-term>
                <details>
                <summary>${word.term}</summary>
                <p slot="information">${word.def}</p>
                <ul class="links">
                    <li><a href="${word.links}">${word.links}</a></li>
                </ul>
                </details>
            </vocab-term>
        `
    }

    renderResult(renderType) {
        if (renderType === 'term') {
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
        else if (renderType === 'process') {
            return html`
                <div>
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
                </div>`
        }
        else {
            return html`
                <dl>
                    ${this.words.map(
                        item => html`
                        <dt>${item.term}</dt>
                        <left>
                        <dd>${item.def}</dd>
                        <dd>${item.links}</dd></left>
                        <button @click="${this.deleteTerm}" data-id="${item.wordId}">Delete this word</button>
                        </br>
                    `)}
                </dl>
            `
        }
    }

    render() {
        return html`${this.renderResult(this.renderType)}<div id="inputhere"></div>`
    }
}
customElements.define(VocabTermApp.tag, VocabTermApp);