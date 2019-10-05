module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: "John",
      lastName: "Doe",
      email: "demo@demo.com",
      description: "yo",
      username: "Dylan",
      password: "qdsf",
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {timeStamps:true });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
