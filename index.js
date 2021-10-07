const express = require('express');
const app = express();

const protobuf = require('protobufjs');
const path = require('path');

const port = 9000;

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/getData', async (req, res) => {
  const root = await protobuf.load('user.proto');

  const User = root.lookupType('userpackage.User');

  const asProtobuf = User.encode({ name: 'Joe', age: 27 }).finish();
  // const asJSON = User.decode(asProtobuf);

  // console.log({ asProtobuf, asJSON });
  res.send(asProtobuf);
});

app.listen(port, () => {
  console.log(`server connect success: http://localhost:${port}`);
});
