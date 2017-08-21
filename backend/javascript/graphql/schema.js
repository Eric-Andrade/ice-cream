export default `
    scalar Date 

    type Status {
        message: String!
    }
    type Auth {
        token: String!
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

    type Me {
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
        client: Client!
        favoriteCount: Int!
        createdAt: Date!
        updatedAt: Date!
    }

    type Query {
        getOrder(_id: ID!): Order
        getOrders: [Order]
        getClientOrders: [Order]
        me: Me
    }

    type Mutation {
        createOrder(text: String!): Order
        updateOrder(_id: ID!, text: String): Order 
        deleteOrder(_id: ID!): Status
        signupClient(email: String!, fullName: String, password: String!, avatar: String, username: String): Auth
        loginClient(email: String!, password: String!): Auth
    }

    schema {
        query: Query
        mutation: Mutation
    }
`