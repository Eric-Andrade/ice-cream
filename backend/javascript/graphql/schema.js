export default `
    type Order{
        _id: String
        text: String
    }

    type Query {
        getOrders: [Order]
    }

    schema {
        query: Query
    }
`