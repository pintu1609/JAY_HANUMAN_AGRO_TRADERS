const http=require('http');
const express=require('express');
require('dotenv').config();
const cors=require('cors');
const {connectToDatabase}=require('./api/db/db');
const routes=require('./api/route/index');
// const {useErrorHandler}=require('./api/middleware/error-handler.js');

const app= express();
app.use(express.json());
app.use(cors());
// app.use(db.connectToDatabase);
connectToDatabase();

app.get('/', (req, res) => {
    res.send('Hello World postsql database working fine!');
})
app.use('/api/v1/',routes);
// app.use(useErrorHandler);    

const server=http.createServer(app);
const portNumber=process.env.PORT || 5000;

server.listen(portNumber, (err) => {
  console.log("portNumber ", process.env.PORT);
  if (err) {
    console.log(err);
  } else {
    console.log(`Listening on port ${portNumber}`);
  }
});