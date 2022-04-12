const express = require('express');
const bodyParser = require('body-parser');
const dfd = require('danfojs-node');

async function getRandoGame() {
    return dfd.readCSV("./data/games-data-final.csv").then(df => {
      let rand = Math.floor(Math.random() * df.shape[0]);
      let game = df.iloc({rows: [rand]});
      let gameObj = {
        name: game['name'].values[0],
        platform: game['platform'].values[0],
        rdate: game['r-date'].values[0],
        score: game['score'].values[0],
        image: game['image-link'].values[0]
      };
      return gameObj;
    });
}

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/getGame', (req, res) => {
  getRandoGame().then(game => {
    res.send(game);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));