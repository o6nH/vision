const router = require('express').Router();
const dotenv = require('dotenv');

dotenv.config();

async function getImageAnnotations(imgUri) {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  // When running on Google App Engine (Application Default Credentials would apply) if `env_variables` no in `app.yaml`
  const client = new vision.ImageAnnotatorClient({
    projectId: process.env.PROJECT_ID,
    credentials: {
      private_key: process.env.PRIVATE_KEY.replace(/\\n/g,'\n'), //globally matches and replaces endlines
      client_email: process.env.CLIENT_EMAIL
    }
  });

  // Performs WEB_DETECTION on the image file
  const [result] = await client.webDetection(imgUri);
  const bestGuessLabel = result.webDetection.bestGuessLabels[0].label;
  const labels = [bestGuessLabel[0].toUpperCase() + bestGuessLabel.slice(1)]
  result.webDetection.webEntities.forEach(webEnt => {
    let {description:desc} = webEnt; 
    if(desc && !labels.includes(desc)) labels.push(webEnt.description)
  });
  return labels;//TODO: nutrition and graph APIs take it from here
}

// `/api/vision`
router.post('/', async (req, res, next) => {
  try{
    // const label = await getImageAnnotations(req.files.);
    const labels = await getImageAnnotations("http://images-gmi-pmc.edge-generalmills.com/df111eed-4d6a-44f7-8d8f-80d41f7ee1d6.jpg");
    res.send(labels);
  }
  catch(err){
    next(err);
  }
})

module.exports = router;