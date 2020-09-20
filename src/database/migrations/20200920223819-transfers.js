'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('transfers', {
      pagarme_transfer_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      reference_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      source_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      target_id: {
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
      funding_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      funding_estimated_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      date_created: {
        type: Sequelize.DATE,
        allowNull: false
      },
      date_updated: {
        type: Sequelize.DATE,
        allowNull: false
      },
      reference_type: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
