import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from 'remix';
import Header from './components/Header';

export const meta = () => ({ title: 'Testing as a Service' });

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
      <Outlet />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>
);

export default App;
