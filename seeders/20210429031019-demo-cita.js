'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Cita', [{
        Name: 'John Doe',
        date: '10-06-2021',
        time: '08:00',
        description: 'febre',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        Name: 'Maria Silva',
        date: '05-08-2021',
        time: '10:00',
        description: 'Dor',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        Name: 'Tiago Perez',
        date: '20-10-2021',
        time: '01:00',
        description: 'alergia',
        createdAt: new Date(),
        updatedAt: new Date()
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
