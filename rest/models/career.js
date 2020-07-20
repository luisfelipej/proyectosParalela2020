module.exports = (sequelize, DataTypes) => {
  const Career = sequelize.define(
    `Career`,
    {
      name: DataTypes.STRING,
      vacancies: DataTypes.INTEGER,
      code: DataTypes.INTEGER,
      lang: DataTypes.DOUBLE,
      math: DataTypes.DOUBLE,
      ciencHist: DataTypes.DOUBLE,
      avgMathlang: DataTypes.INTEGER,
      ranking: DataTypes.DOUBLE,
      nem: DataTypes.DOUBLE,
      firstScore: DataTypes.DOUBLE,
      lastScore: DataTypes.DOUBLE,
      minScore: DataTypes.DOUBLE,
      estimatedPlace: {
        type: DataTypes.VIRTUAL,
        get() {
          return parseFloat(Math.trunc((this.firstScore - this.lastScore) / this.vacancies *1000)/1000).toFixed(3)
        }
      } 
    },
    {},
  )
  Career.associate = function associate(models) {
    // associations can be defined here
    Career.hasMany(models.Postulation, {
      as: `postulations`,
      foreignkey: `careerId`,
    })
  }
  return Career
}

