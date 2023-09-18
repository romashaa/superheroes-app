// const { MongoMemoryServer } = require('mongodb-memory-server');
// const mongoose = require('mongoose');
//
// const mongod = new MongoMemoryServer();
//
// module.exports.connect = async () => {
//     const uri = await mongod.getUri();
//
//     const mongooseOpts = {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     };
//
//     await mongoose.connect(uri, mongooseOpts);
// };
//
// module.exports.closeDatabase = async () => {
//     await mongoose.connection.dropDatabase();
//     await mongoose.connection.close();
//     await mongod.stop();
// };
//
// module.exports.clearDatabase = async () => {
//     const collections = mongoose.connection.collections;
//     for (const key in collections) {
//         await collections[key].deleteMany({});
//     }
// };
