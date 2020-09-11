/* eslint-disable */
const express = require('express');
const app = express();

app.get(['*.js'], (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use('/assets', express.static(`${__dirname}/dist/gzip`));

app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/dist/gzip/indexProd.html`);
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
