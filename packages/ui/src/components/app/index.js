import { html } from "https://unpkg.com/lit-html?module";
import { pageTitle } from "https://unpkg.com/@chealt/ui-library?module";

const app = () => html`
    <div id="app-container">
        ${pageTitle({ title: "Homepage" })}
    </div>
`;

export default app;
