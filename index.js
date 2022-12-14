const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public')); 

const PORT = 3000;

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.listen(PORT || 3000, function () {
  console.log('Node.js listening on port ' + PORT);
});

let responseObj ={}
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  responseObj = {
    "name": req.file.originalname,
    "type": req.file.mimetype,
    "size": req.file.size
  }
//  responseObj["name"] = responseObj["upfile"]
  res.json(responseObj)
  console.log(responseObj)
})
