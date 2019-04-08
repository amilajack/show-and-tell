const fetch = require('isomorphic-fetch');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

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

app.get('/', async (req, res) => {
  const query = await getRandomArticle();
  res.json(query);
});

app.listen(80, () => console.log(`Example app listening on port ${80}!`));
