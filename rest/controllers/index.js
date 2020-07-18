const models = require(`../models`)

function formatCareers(postulant) {
  const { postulations } = postulant.get({ plain: true })
  return postulations.map(({ score, career }) => ({
    score,
    name: career.name,
    code: career.code,
    estimatedPlace: `TODO`,
  }))
}

async function insertPostulant(rawPostulant) {
  try {
    // Se inserta postulante
    const postulant = await models.Postulant.create(rawPostulant)
    // Se obtienen todas las carreras para calcular la ponderacion del estudiante
    const careers = await models.Career.findAll({ raw: true })
    const postulationsPromises = []
    const postulations = []

    careers.forEach(
      ({
        id,
        lang,
        math,
        ciencHist,
        avgMathlang,
        ranking,
        nem,
        minScore,
        name,
        code,
      }) => {
        // Se calcula la ponderacion del postulante
        const canPostulate = (postulant.math + postulant.lang) / 2 >= avgMathlang
        const score =
          lang * postulant.lang +
          math * postulant.math +
          Math.max(ciencHist * postulant.cienc, ciencHist * postulant.hist) +
          ranking * postulant.ranking +
          nem * postulant.nem

        if (score > minScore && canPostulate) {
          postulations.push({ score, name, code, estimatedPlace: `TODO` })
          postulationsPromises.push(
            models.Postulation.create({
              score,
              careerId: id,
              postulantId: postulant.id,
            }),
          )
        }
      },
    )
    await Promise.all(postulationsPromises)
    return postulations.sort((a, b) => b.score - a.score).slice(10);
  } catch (error) {
    return Promise.reject(`No se ha podido ingresar al postulante`)
  }
}

async function careerByCode(req, res) {
  const { code } = req.query
  if (!code) {
    return res
      .status(400)
      .json({ success: false, error: `Debe indicar el codigo de carrera` })
  }
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
  if (!careerNames || careerNames.length === 0) {
    return res.status(400).json({
      success: false,
      error: `Debe indicar al menos un nombre de carrera`,
    })
  }
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
  if (!nem || !ranking || !math || !lang || !cienc || !hist) {
    return res.status(400).json({
      success: false,
      error: `Parámetros no válidos`,
    })
  }
  try {
    let careers = []
    // Se busca si existe una postulación igual a la ingresada
    const postulant = await models.Postulant.scope({
      method: [`topCareers`, 10],
    }).findOne({
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
      careers = formatCareers(postulant)
    } else {
      // Insertar postulante y calcular ponderaciones
      careers = await insertPostulant(req.body)
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
