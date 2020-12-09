const version = require('./lib/version');
const router = require('express').Router();

router.get('/ping', (req, res) => {
  res.status(200).send();
});

router.get('/version', (req, res) => {
  res.status(200).send(version.toString(version.get()));
});

router.get('/graphqlwsurl', (req, res) => {
  res.send({ url: process.env.GRAPHQL_WS_URL });
});

router.get('/icon/:filename', (req, res) => {
  let path = `${process.cwd()}/public/icons`;
  res.sendFile (req.params.filename, { root: path });
});

router.get('/image/:filename', (req, res) => {
  let path = `${process.cwd()}/public/images`;
  res.sendFile (req.params.filename, { root: path });
});


module.exports = router;
