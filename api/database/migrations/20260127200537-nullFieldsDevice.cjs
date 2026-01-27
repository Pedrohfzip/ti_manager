'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Permitir null em todas as colunas, exceto createdAt e updatedAt
    await queryInterface.changeColumn('Devices', 'name', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('Devices', 'type', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('Devices', 'brand', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('Devices', 'heritage', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('Devices', 'status', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('Devices', 'employee', {
      type: Sequelize.STRING,
      allowNull: true
    });
    // createdAt e updatedAt permanecem NOT NULL
  },

  async down (queryInterface, Sequelize) {
    // Reverter para NOT NULL nas colunas alteradas
    await queryInterface.changeColumn('Devices', 'name', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('Devices', 'type', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('Devices', 'brand', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('Devices', 'heritage', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('Devices', 'status', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('Devices', 'employee', {
      type: Sequelize.STRING,
      allowNull: true
    });
    // createdAt e updatedAt permanecem NOT NULL
  }
};
