import { html } from "lit-html";

import { pageTitle } from "@chealt/ui-library";

const app = () => html`
    <div id="app-container">
        ${pageTitle({ title: "Homepage" })}
    </div>
`;

export default app;
