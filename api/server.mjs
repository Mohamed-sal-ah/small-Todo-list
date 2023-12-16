import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"
import typeDefs from "./schema.mjs"
import resolvers from "./resolvers.mjs"

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server,{
  listen : {port : 4000}
});

console.log(`🚀 Server ready at ${url}`);
