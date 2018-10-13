const { ApolloServer, gql } = require('apollo-server');

const meals = [
    {
        imageUrl: '',
        name: 'my first meal',
        datetime: new Date().toISOString()
    }
];

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
