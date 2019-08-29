const router = require('express').Router();
const dotenv = require('dotenv');
const dotenv = require('dotenv');
const Multer = require('multer');
const {Storage} = require('@google-cloud/storage');
const vision = require('@google-cloud/vision');

// Set environment variables to process.env
dotenv.config();

// Instantiate a storage client
const storage = new Storage();
// Create bucket/container for objects/files.
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET); //specified in `app.yaml` not `.env`

// Multer processes multipart/form-data uploads, temporarily saves to specified 'storage' 
//(e.g., memoryStorage or given path), and makes files available via `req.files`.
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb; change as needed.
  }
});

// Handle post to `/api/vision/upload`
router.post('/upload', multer.single('file'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  // Create a new blob (Binary Large OBject) in the bucket and upload the file data.
  // use original filename provided by client-side for bucke blob/file
  const blob = bucket.file(req.file.originalname); 
  const blobStream = blob.createWriteStream({
    resumable: false,
  })

  blobStream.on('error', err => {
    next(err);
  })

  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl =`https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    res.status(200).send(publicUrl);
  })

  blobStream.end(req.file.buffer);
});

// Get labels for public image url
async function getImageAnnotations(publicImgUrl) {
  // Create a client
  // If running on Google App Engine, Application Default Credentials apply
  const client = new vision.ImageAnnotatorClient({
    projectId: process.env.PROJECT_ID,
    credentials: {
      private_key: process.env.PRIVATE_KEY.replace(/\\n/g,'\n'), //globally match & replace endlines
      client_email: process.env.CLIENT_EMAIL
    }
  })

  // Perform WEB_DETECTION on image
  const [result] = await client.webDetection(publicImgUrl);
  const bestGuessLabel = result.webDetection.bestGuessLabels[0].label;
  const labels = [bestGuessLabel[0].toUpperCase() + bestGuessLabel.slice(1)]
  result.webDetection.webEntities.forEach(webEnt => {
    let {description:desc} = webEnt; 
    if(desc && !labels.includes(desc)) labels.push(webEnt.description)
  });
  return labels;//TODO: nutrition and graph APIs take it from here
};

// Handle GET to `/api/vision`
router.get('/', async (req, res, next) => {
  try{
    // const labels = await getImageAnnotations("http://images-gmi-pmc.edge-generalmills.com/df111eed-4d6a-44f7-8d8f-80d41f7ee1d6.jpg");
    const label = await getImageAnnotations(req.file);
    res.send(labels);
  }
  catch(err){
    res.status(400).send('');
  }
});

module.exports = router;