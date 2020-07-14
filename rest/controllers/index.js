const models = require(`../models`)

async function insertPostulants(postulants) {
  const postulantPromises = []
  postulants.forEach((postulant) => {
    if (postulant.length > 0) {
      const [rut, nem, ranking, math, lang, cienc, hist] = postulant.split(`;`)
      postulantPromises.push(
        models.Postulant.create({ rut, nem, ranking, math, lang, cienc, hist }),
      )
    }
  })
  await Promise.all(postulantPromises)
}

async function managePostulation(req, res) {
  const { file } = req.body
  try {
    const buff = Buffer.from(file, `base64`)
    const data = buff.toString(`ascii`)
    const postulants = data.split(`\n`)
    await insertPostulants(postulants)
    return res.status(200).json({
      success: true,
      data: postulants,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    })
  }
}

module.exports = { managePostulation }
