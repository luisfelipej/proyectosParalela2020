module.exports = (sequelize, DataTypes) => {
  const Postulant = sequelize.define(
    `Postulant`,
    {
      rut: DataTypes.STRING,
      nem: DataTypes.DOUBLE,
      ranking: DataTypes.DOUBLE,
      math: DataTypes.DOUBLE,
      lang: DataTypes.DOUBLE,
      cienc: DataTypes.DOUBLE,
      hist: DataTypes.DOUBLE,
    },
    {},
  )
  Postulant.associate = function associate(models) {
    // associations can be defined here
    Postulant.belongsToMany(models.Career, {
      as: `postulations`,
      through: models.Postulation,
      foreignkey: `postulantId`,
    })
  }
  return Postulant
}
