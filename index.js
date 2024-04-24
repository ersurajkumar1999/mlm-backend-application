const http = require("http");
const { PORT } = require('./utilities/config');
const { app } = require('./utilities/app');
const connectToDB = require("./utilities/db");




connectToDB();
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`server up on port ${PORT}`);
});