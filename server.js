const htpp= require('http');
const app=require('./index');
const port =3001;
const server=http.createServer(app);
server.listen(port);