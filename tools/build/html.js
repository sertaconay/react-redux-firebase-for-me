/* eslint-disable no-console, consistent-return, no-unused-vars */

import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';


fs.readFile('src/index.html', 'utf8', (readErr, markup) => {
  if (readErr) {
    console.log(readErr);
    return false;
  }

  const $ = cheerio.load(markup, { ignoreWhitespace: true });
  const staticFileVersion = +new Date();

  if (process.env.NODE_ENV === 'production') {
    $('#site-style').attr('href', `/style.css?v=${staticFileVersion}`);
    $('#site-script').attr('src', `/script.js?v=${staticFileVersion}`);
    $(`<script src=/vendor.js?v=${staticFileVersion}></script>`).insertAfter('#app');
    $(`<script src=/manifest.js?v=${staticFileVersion}></script>`).insertAfter('#app');
  }

  fs.writeFile('public/index.html', $.html(), 'utf8', (writeErr) => {
    if (writeErr) {
      console.log(writeErr);
      return false;
    }
    console.log('index.html written'.green);
  });
});
