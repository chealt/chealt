import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";

import Meals from './meals/index';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
});

const App = () => (
    <ApolloProvider client={client}>
        <Meals />
    </ApolloProvider>
);

export default App;
