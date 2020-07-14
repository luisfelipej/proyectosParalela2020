module.exports = (sequelize, DataTypes) => {
  const Career = sequelize.define(
    `Career`,
    {
      name: DataTypes.STRING,
      vacancies: DataTypes.INTEGER,
      code: DataTypes.INTEGER,
      lang: DataTypes.INTEGER,
      math: DataTypes.INTEGER,
      ciencHist: DataTypes.INTEGER,
      avgMathlang: DataTypes.INTEGER,
      ranking: DataTypes.INTEGER,
      nem: DataTypes.INTEGER,
      firstScore: DataTypes.INTEGER,
      lastScore: DataTypes.INTEGER,
    },
    {},
  )
  Career.associate = function associate(models) {
    // associations can be defined here
    Career.belongsToMany(models.Postulant, {
      as: `postulations`,
      through: models.Postulation,
      foreignkey: `careerId`,
    })
  }
  return Career
}
