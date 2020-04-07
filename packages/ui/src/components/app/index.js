import { html } from "https://unpkg.com/lit-html?module";

import { pageTitle } from "@chealt/ui-library";

const app = () => html`
    <div id="app-container">
        ${pageTitle({ title: "Homepage" })}
    </div>
`;

export default app;
