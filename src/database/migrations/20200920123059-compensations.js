'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('compensation', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      expected_payment_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      pagarme_recipient_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('compensation');
  }
};
