const models = require(`../models`)

async function insertPostulant(postulant) {}

async function careerByCode(req, res) {
  const { code } = req.query
  try {
    const career = await models.Career.findOne({ where: { code } })
    if (!career) {
      return res
        .status(400)
        .json({ success: false, error: `Carrera ingresada no existe` })
    }
    return res.status(200).json({
      success: true,
      data: career,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    })
  }
}

async function careersByName(req, res) {
  // TODO: normalizar el string de los nombres antes de comprar en la db
  const { careerNames } = req.query
  try {
    const careers = await models.Career.findAll({
      where: { name: careerNames },
    })
    if (careers.length === 0) {
      return res.status(400).json({
        success: false,
        error: `No se han encontrado carreras con el nombre especificado`,
      })
    }
    return res.status(200).json({
      success: true,
      data: careers,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    })
  }
}

async function topCareers(req, res) {
  // TODO: normalizar el string de los nombres antes de comprar en la db
  const { nem, ranking, math, lang, cienc, hist } = req.body
  try {
    const careers = []
    const postulant = await models.Postulant.findOne({
      where: {
        nem,
        ranking,
        math,
        lang,
        cienc,
        hist,
      },
    })
    if (postulant) {
      // Traer sus mejores 10 carreras
    } else {
      // Insertar postulante
      // Calcular ponderaciones en carreras
      // Seleccionar las mejores 10
    }
    return res.status(200).json({
      success: true,
      data: careers,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    })
  }
}

module.exports = { careerByCode, careersByName, topCareers }
