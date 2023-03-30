import express from "express";
import {graphqlUploadExpress} from "graphql-upload-minimal";
import {graphqlHTTP} from "express-graphql";
import {makeExecutableSchema} from "@graphql-tools/schema";
import {typeDefs} from "~/schema";
import {resolvers} from "~/resolvers";

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

export const expressGraphql = express.Router();

expressGraphql.use(
    graphqlUploadExpress({maxFileSize: 10000000, maxFiles: 10}),
    graphqlHTTP({schema, graphiql: true})
)
