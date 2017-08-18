/* eslint-disable no-console */
import mongoose from 'mongoose';
import constants from './constants';
//MongoDB
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
try {
  mongoose.connect(constants.DB_URL, { useMongoClient: true });
} catch (err) {
  mongoose.createConnection(constants.DB_URL, { useMongoClient: true });
}
mongoose.connection
  .once('open', () =>
    console.log(
      'Connection has been established to MongoDB database successfully.',
    ),
  )
  .on('error', console.error.bind(console, '~Error connecting to MongoLab:'));
//MySQL
