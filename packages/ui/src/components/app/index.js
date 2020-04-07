import { html } from "https://unpkg.com/lit-html?module";

import "@chealt/ui-library/src/components/pageTitle";

const app = () => html`
    <div id="app-container">
        <page-title title="Homepage"></page-title>
    </div>
`;

export default app;
