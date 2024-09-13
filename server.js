const express = require('express');
const NodeMediaServer = require('node-media-server');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Node Media Server configuration
const nms = new NodeMediaServer({
    rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60
    },
    http: {
        port: 8000,
        allow_origin: '*'
    }
});

// Start the Node Media Server
nms.run();

// Serve a basic route for testing
app.get('/', (req, res) => {
    res.send('Express server with Node Media Server is running!');
});

app.listen(port, () => {
    console.log(`Express server is listening on http://localhost:${port}`);
});
