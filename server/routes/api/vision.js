const router = require('express').Router();
const env = require('../../../config/env');

async function getImageAnnotations(imgUri) {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  // If running on Google App Engine (Application Default Credentials would apply)
  const client = new vision.ImageAnnotatorClient({
    projectId:  env.GOOGLE_APPLICATION_CREDENTIALS.projectId,
    credentials: {
      private_key: env.GOOGLE_APPLICATION_CREDENTIALS.private_key,
      client_email: env.GOOGLE_APPLICATION_CREDENTIALS.client_email
    }
   });

  // Performs WEB_DETECTION on the image file
  const [result] = await client.webDetection(imgUri);
  const labels = [result.webDetection.bestGuessLabels[0].label];
  result.webDetection.webEntities.forEach(webEnt => {
    if(webEnt.description) labels.push(webEnt.description)
  });
  return labels;//TODO: nutrition and graph APIs take it from here
}

// `/api/vision`
router.post('/', async (req, res, next) => {

  try{
    // const label = await getImageAnnotations(res.files.file.data);
    const label = await getImageAnnotations("http://images-gmi-pmc.edge-generalmills.com/df111eed-4d6a-44f7-8d8f-80d41f7ee1d6.jpg");
    res.send(label)
  }
  catch(err){
    next(err);
  }
})

module.exports = router;