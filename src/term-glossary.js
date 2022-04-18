import { LitElement, html, css } from 'lit';
import '@lrnwebcomponents/vocab-term/vocab-term.js';


export class TermGlossary extends LitElement {
    static get tag() {
        return 'term-glossary'
    }

    static get properties() {
        return {
            term: { type: String },
            def: { type: String },
            links:  {type: Array },
            getEnd: { type: String },
            searchEnd: { type: String },
            glossary: { type: Array },
            words: { type: Array }, 
        }
    }

    constructor() {
        super();
        this.term = '';
        this.def = '';
        this.links = [];
        this.getEnd = '/api/getWords';
        this.searchEnd = '/api/getWord';
        this.glossary = [];
        this.words = [];
    }


    // will be moved to main file
    // query db for all terms
    getData() {
        fetch(this.getEnd).then(res => res.json()).then((data) => {
            let glossary = [];
            console.log(data);
            for(const item of data) {
                // console.log(item);
                const vocab = {
                    term: item["Word"],
                    def: item["Definition"],
                    links: item["Links"],
                };
                this.glossary.push(vocab);
            }
            console.log(glossary);
        });
        this.requestUpdate;
    }

    // will be moved to main file 
    // gathers data from processing block, sends to db to find matches
    async searchTerms(input) {
        words = input.split(" ");
        // search db for match
        for(let i = 0; i < this.words.length; i++) {
            fetch(`${this.searchEnd}?word=${words[i].value}`).then(res => res.json()).then(data => {
                console.log(data);
                if (data) {
                    // separate words and terms, replace found terms
                }
            });
        };   
        
        // replace found terms with vocab-term tag
        html` 
        <vocab-term >
            <details>
                <summary>${this.term}</summary>
                <p slot="information">${this.def}</p>
                <ul class="links">
                    <li><a href="${this.links[0]}">Link to more information</a></li>
                </ul>
            </details>
        </vocab-term>
        `
    }

    render() {
        return html`
            <dl>
                ${this.glossary.map(
                    item => html`
                        <dt>${item.term}</dt>
                        <dd>${item.def}</dd>
                        <dd>${item.links}</dd>
                    `
                )}
            </dl>
        `;
    }
}
customElements.define(TermGlossary.tag, TermGlossary);