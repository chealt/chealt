import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Items from './items';

const GET_MEALS = gql`
    {
        meals {
            imageUrl
            name
            datetime
        }
    }
`;

const Meals = () => (
    <Query query={GET_MEALS}>
        {({ loading, error, data: { meals } }) => (
            !loading && !error && (
                <Items meals={meals} />
            )
        )}
    </Query>
);

export default Meals;
