export default `
    scalar Date 

    type Status {
        message: String!
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
    }

    schema {
        query: Query
        mutation: Mutation
    }
`