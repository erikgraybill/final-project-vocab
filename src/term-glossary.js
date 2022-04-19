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
        fetch(this.getEnd).then(res => res.json()).then(data => {
            this.glossary = [];
            console.log(data);
            for(const item of data) {
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
    searchTerms(input) {
        this.words = input.split(" ");
        // search db for match
        fetch(this.getEnd).then(res => res.json()).then((data) => {
            this.glossary = [];
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
            console.log(this.glossary);
        }); 
     
        const filteredArray = this.glossary.filter(this.words.includes(item.Word));
        
        // replace found terms with vocab-term tag
        // html` 
        // <vocab-term >
        //     <details>
        //         <summary>${this.term}</summary>
        //         <p slot="information">${this.def}</p>
        //         <ul class="links">
        //             <li><a href="${this.links[0]}">Link to more information</a></li>
        //         </ul>
        //     </details>
        // </vocab-term>
        // `
    }

    render() {
        return html`
            ${this.glossary.map(
                item => html`
                    <dl>
                        <dt>${item.term}</dt>
                        <dd>${item.def}</dd>
                        <dd>${item.links}</dd>
                    </dl>
                `
            )}
       `
    }
}
customElements.define(TermGlossary.tag, TermGlossary);