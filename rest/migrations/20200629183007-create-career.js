module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(`Careers`, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      vacancies: {
        type: Sequelize.INTEGER,
      },
      code: {
        type: Sequelize.INTEGER,
      },
      lang: {
        type: Sequelize.DOUBLE,
      },
      math: {
        type: Sequelize.DOUBLE,
      },
      ciencHist: {
        type: Sequelize.DOUBLE,
      },
      avgMathlang: {
        type: Sequelize.INTEGER,
      },
      ranking: {
        type: Sequelize.DOUBLE,
      },
      nem: {
        type: Sequelize.DOUBLE,
      },
      firstScore: {
        type: Sequelize.DOUBLE,
      },
      lastScore: {
        type: Sequelize.DOUBLE,
      },
      minScore: {
        type: Sequelize.DOUBLE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn(`now`),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn(`now`),
      },
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable(`Careers`)
  },
}
