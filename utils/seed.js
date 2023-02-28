const connection = require('../config/connection');
const { User } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  await User.deleteMany({});


  const users = [
    {username:"howard1",email:"howard@howard.com"},
    {username:"howard2",email:"howard@second.com"}
  ]

  await User.collection.insertMany(users);

  console.info('Seeding complete! 🌱');
  process.exit(0);
});
