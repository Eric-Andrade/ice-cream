export default {
  port: process.env.PORT || 3000,
  DB_URL: 'mongodb://eric:patol_03@ds149373.mlab.com:49373/itecor-durangodb',
  jwt_secret: 'thisisasecret123',
  subscriptionPath: '/subscriptions'
};
