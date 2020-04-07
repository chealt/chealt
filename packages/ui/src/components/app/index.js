import { html } from "https://unpkg.com/lit-html?module";

import pageTitle from "../../ui-library/PageTitle/index.js";

const app = () => html`
    <div id="app-container">
        ${pageTitle({ title: "Homepage" })}
    </div>
`;

export default app;
