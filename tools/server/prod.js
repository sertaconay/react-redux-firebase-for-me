/* eslint-disable no-console */

import express from 'express';
import path from 'path';
import compression from 'compression';
import open from 'open';


const port = 4100;
const app = express();

app.use(compression());
app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`http://localhost:${port}`);
  }
});
