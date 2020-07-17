module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(`Postulations`, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      score: {
        type: Sequelize.DOUBLE,
      },
      postulantId: {
        type: Sequelize.INTEGER,
        references: {
          model: `Postulants`,
          key: `id`,
        },
        onUpdate: `CASCADE`,
        onDelete: `CASCADE`,
      },
      careerId: {
        type: Sequelize.INTEGER,
        references: {
          model: `Careers`,
          key: `id`,
        },
        onUpdate: `CASCADE`,
        onDelete: `CASCADE`,
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
    return queryInterface.dropTable(`Postulations`)
  },
}
