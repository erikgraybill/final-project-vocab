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
            removeEnd: { type: String },
            searchEnd: { type: String },
			term: { type: String },
            def: { type: String },
            links: { type: Array },
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
        this.searchEnd = '/api/getWord'; // '/api/processWords';
		this.term = '';
        this.def = '';
        this.links = [];
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

    deleteTerm(word) {
        var queryString = `word=${word}`;
        fetch(`${this.removeEnd}?${queryString}`).then(res => res.json()).then((data) => {
            console.log(data);
        });
    }

    async getTerms() {
        // await fetch(this.getEnd).then(res => res.json()).then((data) => {
        //     this.words = [];
        //     console.log(data);
        //     for(const item of data) {
        //         // console.log(item);
        //         const vocab = {
        //             term: item["Word"],
        //             def: item["Definition"],
        //             links: item["Links"],
        //         };
        //         this.words.push(vocab);
        //     }
        // });
        // return this.words;
    }

    async searchTerms(user) {
        const search = user.split(" ");
        console.log(search);
        this.words = [];
        // var queryString = `paragraph=${user}`;
        // await fetch(`${this.searchEnd}?${queryString}`).then(res => res.json()).then((data) => {
        //     this.glossary = [];
        //     console.log(data);
        //     for(const item of data) {
        //         // console.log(item);
        //         const vocab = {
        //             term: item["Word"],
        //             def: item["Definition"], 
        //             links: item["Links"],
        //         };
        //         this.glossary.push(vocab);
        //     }
        // });

        await fetch(this.getEnd).then(res => res.json()).then((data) => {
            this.glossary = [];
            // console.log(data);
            for(const item of data) {
                // console.log(item);
                const vocab = {
                    term: item["Word"],
                    def: item["Definition"],
                    links: item["Links"],
                };
                this.glossary.push(vocab);
            }
        });        
        // const glossary = this.getTerms().value;
        // console.log(this.glossary); 
        for(const word of this.glossary) {
            if(search.includes(word.Word)) {
                this.words.push(word);
            }
        }
        // this.words = this.glossary.filter(el => search.includes(el.Word));
        console.log(this.words);

        // for(const word of search) {
        //     console.log(word);
        //     var queryString = `word=${word}`;
        //     fetch(`${this.searchEnd}?${queryString}`).then(res => res.json()).then((data) => {
        //         console.log(data);
        //         for(const item of data) {
        //             const vocab = {
        //                 term: item["Word"],
        //                 def: item["Definition"],
        //                 links: item["Links"],
        //             };
        //             this.words.push(vocab);
        //         }
        //     })
        // }
        this.renderType = 'term';
        return this.words; 
    }

    viewTerms() {
        fetch(this.getEnd).then(res => res.json()).then((data) => {
            this.words = [];
            console.log(data);
            for(const item of data) {
                // console.log(item);
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