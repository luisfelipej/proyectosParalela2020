module.exports = (sequelize, DataTypes) => {
  const Postulation = sequelize.define(
    `Postulation`,
    {
      score: DataTypes.DOUBLE,
    },
    {},
  )
  Postulation.associate = function associate(models) {
    // associations can be defined here
    Postulation.belongsTo(models.Postulant, {
      as: `postulant`,
      foreignKey: `postulantId`,
    })
    Postulation.belongsTo(models.Career, {
      as: `career`,
      foreignKey: `careerId`,
    })
  }
  return Postulation
}
