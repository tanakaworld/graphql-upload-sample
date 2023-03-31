import express from 'express';
import {graphqlUploadExpress} from "graphql-upload-minimal";
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
import {makeExecutableSchema} from "@graphql-tools/schema";
import {typeDefs} from "~/schema";
import {resolvers} from "~/resolvers";

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

export const apolloRouter = express.Router();

(async () => {
    const apolloServer = new ApolloServer({
        schema,
        introspection: true,
    });
    await apolloServer.start();

    apolloRouter.use(
        graphqlUploadExpress({maxFileSize: 10000000, maxFiles: 10}),
        expressMiddleware(apolloServer),
    );

    console.info(`Apollo Server initialized`);
})()


