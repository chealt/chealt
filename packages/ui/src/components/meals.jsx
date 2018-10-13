import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

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
            !loading && !error && meals.map(meal => (
                <div>{meal.name}, {meal.datetime}</div>
            ))
        )}
    </Query>
);

export default Meals;
