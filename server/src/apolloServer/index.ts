import { ApolloServer } from 'apollo-server-koa';

import typeDefs from './typeDefs/index'
import resolvers from './resolvers/index'

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: app => app.ctx, //主要是resolver里会使用session
    playground: true,
});

export default server;
