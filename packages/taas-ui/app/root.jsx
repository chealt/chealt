import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from 'remix';

import Header from './components/Header';
import RootStyles from './root.styles.css';

const links = () => [
  {
    rel: 'stylesheet',
    href: RootStyles
  }
];

const meta = () => ({ title: 'Testing as a Service' });

const App = () => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body>
      <Header />
      <main>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </main>
    </body>
  </html>
);

export { links, meta };
export default App;
