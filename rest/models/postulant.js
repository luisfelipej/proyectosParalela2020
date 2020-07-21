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
    {
      scopes: {
        topCareers(limit) {
          return {
            include: [
              {
                association: `postulations`,
                attributes: [`score`],
                include: [
                  {
                    association: `career`,
                    attributes: [
                      `name`,
                      `code`,
                      `firstScore`,
                      `lastScore`,
                      `vacancies`,
                    ],
                  },
                ],
                order: [[`score`, `DESC`]],
                limit,
              },
            ],
          }
        },
      },
    },
  )
  Postulant.associate = function associate(models) {
    // associations can be defined here
    Postulant.hasMany(models.Postulation, {
      as: `postulations`,
      foreignkey: `postulantId`,
    })
  }
  return Postulant
}
