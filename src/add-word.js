import { LitElement, html, css } from 'lit';

export class AddWordForm extends LitElement {
    static get tag() {
        return 'add-word'
    }

    static get properties() {
		return {
			endpoint: { type: String },
			term: { type: String },
            def: { type: String },
            links: { type: Array }
		}
	}

	constructor() {
		super();
        this.endpoint = '/api/vocab';
		this.term = '';
        this.def = '';
        this.links = [];
	}

    async getData() {
        
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
customElements.define(AddWordForm.tag, AddWordForm);