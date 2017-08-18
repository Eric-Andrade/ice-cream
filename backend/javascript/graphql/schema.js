export default `
    scalar Date 

    type Status {
        message: String!
    }
    type Client {
        _id: ID!
        username: String!
        firstname: String!
        lastname: String
        avatar: String
        password: String
        email: String!
        createdAt: Date!
        updatedAt: Date!
    }
    type Order{
        _id: ID!
        text: String!
        createdAt: Date!
        updatedAt: Date!
    }

    type Query {
        getOrder(_id: ID!): Order
        getOrders: [Order]
    }

    type Mutation {
        createOrder(text: String!): Order
        updateOrder(_id: ID!, text: String): Order 
        deleteOrder(_id: ID!): Status
        signupClient(email: String!, fullName: String, password: String!, avatar: String, username: String): Client
    }

    schema {
        query: Query
        mutation: Mutation
    }
`