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

/*submit a form that has the name attribute set to upfile that includes a file upload. When a file is submited, a response with the file name, type, and size in bytes returns in the JSON response. 
*/
let responseObj ={}
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  responseObj = {
    "name": req.file.originalname,
    "type": req.file.mimetype,
    "size": req.file.size
  }
  res.json(responseObj)
  console.log(responseObj)
})
