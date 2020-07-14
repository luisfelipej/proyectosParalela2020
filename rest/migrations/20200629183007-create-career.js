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
        type: Sequelize.INTEGER,
      },
      math: {
        type: Sequelize.INTEGER,
      },
      ciencHist: {
        type: Sequelize.INTEGER,
      },
      avgMathlang: {
        type: Sequelize.INTEGER,
      },
      ranking: {
        type: Sequelize.INTEGER,
      },
      nem: {
        type: Sequelize.INTEGER,
      },
      firstScore: {
        type: Sequelize.INTEGER,
      },
      lastScore: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable(`Careers`)
  },
}
