const fetch = require('isomorphic-fetch');
const express = require('express');
const cors = require('cors');

function getRandomArticle() {
  return fetch(
    'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=revisions|images&rvprop=content&grnlimit=10',
    {
      mode: 'no-cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )
    .then(res => res.json())
    .then(res => Object.values(res.query.pages));
}

module.exports = () => {
  const app = express();

  app.use(cors());

  app.get('/', async (req, res) => {
    const query = await getRandomArticle();
    res.json(query);
  });

  if (process.env.NODE_ENV !== 'production') {
    app.listen(80, () => console.log('Example app listening on port 80!'));
  }

  return app;
};

module.exports.getRandomArticle = getRandomArticle;
