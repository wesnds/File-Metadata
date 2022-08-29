const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

/*submit a form that includes a file upload. The form file input field has the name attribute set to upfile. When a file is submited, a response with the file name, type, and size in bytes returns in the JSON response.
*/
app.post('/api/fileanalyse', (req, res) => {
  const { upfile } = req.body;
  const { size } = upfile;
  const { type } = upfile;
  const { name } = upfile;
  res.json({
    name,
    type,
    size
  });
});
