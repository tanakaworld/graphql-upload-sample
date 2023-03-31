import express from 'express'
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import {logErrors} from "~/logger";
import {apolloRouter} from "~/routes/apolloServer";

const PORT = 8080;

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/graphql', apolloRouter);
app.use(logErrors)

const server = http.createServer(app);
server.listen(PORT, () => {
    console.info(`Server listening on port:${PORT}`);
});
server.setTimeout(3000);
