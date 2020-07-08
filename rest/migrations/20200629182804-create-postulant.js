module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(`Postulants`, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      rut: {
        type: Sequelize.STRING,
      },
      nem: {
        type: Sequelize.DOUBLE,
      },
      ranking: {
        type: Sequelize.DOUBLE,
      },
      math: {
        type: Sequelize.DOUBLE,
      },
      lang: {
        type: Sequelize.DOUBLE,
      },
      cienc: {
        type: Sequelize.DOUBLE,
      },
      hist: {
        type: Sequelize.DOUBLE,
      },
      hasCareer: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(`Postulants`)
  },
}
