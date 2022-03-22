import { LitElement, html, css } from 'lit';

export class AddWordForm extends LitElement {
    static get tag() {
        return 'add-word'
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

    render() {
        return html`
            <>
        `;
    }
}
customElements.define(AddWordForm.tag, AddWordForm);