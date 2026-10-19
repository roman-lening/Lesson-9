"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("Users", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("Users");
}
