const router = require('express').Router();
const env = require('../../../config/env');

// `/api/nutrition/:label`
router.post('/:label', async (req, res, next) => {
  try{
    // const label = await getImageAnnotations(res.files.file.data);
    // const labels = await getImageAnnotations("http://images-gmi-pmc.edge-generalmills.com/df111eed-4d6a-44f7-8d8f-80d41f7ee1d6.jpg");
    const labels = await getImageAnnotations("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAACCCAMAAAAaAFY0AAAABlBMVEX///8AAABVwtN+AAABhklEQVR4nO3VgY6CMAwAUPj/n75E0a1bB+jBJXCviV5hXuljFadJCCFOinl+vp55OXrmZX1eov/k+Kh+tVd7VSt/49m6UukkfqLUhYODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODuztuWbk6LrRVLhObvy4u37fH+Rvi2sYvjWun8k64bvvug6s9/wFX1q6Oq9cqXWy+b/L3cXy1ZOfSiywnLo97b9NGAx0upPn5YT51uGasS8G69ihf/859gQvXqRb2NZN+6at5GbSQ54fjwr19vH/UTN5A/wCIj4v8/XhccH7eTNpA2blqRLdqnI/bbGYHrv7OtTs+d3lT7kRcWThi5+LB/Lh3fZ5PzEljuf99iBuM3CBPbsXJuOFDJJnC9QfKq94gb/73C9xqxPmoh7RayPNBsa2b0uanxfCHdtdsDerVB+v5HH/phRBCCCGE+Mv4AeInKI5onmbAAAAAAElFTkSuQmCC");
    res.send(labels);
  }
  catch(err){
    next(err);
  }
})

module.exports = router;