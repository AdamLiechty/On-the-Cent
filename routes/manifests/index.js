'use strict'
const fs = require('fs')
const path = require('path')
const manifestTemplate = fs.readFileSync(path.join(__dirname, 'manifestTemplate.txt'), {encoding: 'utf8'})
const crypto = require('crypto')

const manifests = {}
module.exports = function manifests(req, res) {
  const trailId = req.params.id
  let manifest = manifests[trailId]
  if (!manifest) {
    if (fs.statSync(path.join(__dirname, `../../trails/${trailId}.json`)).isFile()) {
      const trail = require(`../../trails/${trailId}.json`)

      const hash = crypto.createHash('sha256')
      hash.update(JSON.stringify(trail))

      if (trail.steps) {
        const photos = trail.steps.map(x => x.image).sort()
        for (var i = 1; i < photos.length; i++) {
          if (photos[i] === photos[i - 1]) {
            photos.splice(i, 1)
            i--
          }
        }
        manifest = manifestTemplate
          .replace(/{{trailId}}/g, trailId)
          .replace('{{photos}}', photos.join('\n'))
          .replace('{{hash}}', hash.digest('base64'))
      }
    }
  }
  if (manifest) {
    res.type('text/manifest')
    res.header('Cache-control', 'no-cache')
    res.send(manifest)
  } else {
    res.status(404).send()
  }
}
