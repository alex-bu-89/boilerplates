export const typeDefs = `
type User {
  id: ID!
  firstName: String
  lastName: String
  email: String
}

# the schema allows the following query:
type Query {
  users: [User]
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: Query
}
`;

export default typeDefs;
