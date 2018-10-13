const { ApolloServer, gql } = require('apollo-server');

const meals = require('./data/meals.json');

const typeDefs = gql`
    type Meal {
        imageUrl: String
        name: String
        datetime: String
    }

    type Query {
        meals: [Meal]
    }
`;

const resolvers = {
    Query: {
        meals: () => meals
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
