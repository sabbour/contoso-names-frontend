const next = require('next');
const express = require('express')
const bodyParser = require("body-parser");
const http = require('http');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    server.use(bodyParser.json());

    server.get("/api/names", function (req, res) {
        console.log("server.get /api/names")
       requestData(req, process.env.NAME_API_SERVICE_HOST, process.env.NAME_API_SERVICE_PORT, '/names', 'GET', null, (data, error) => {
            if (error != null) {
                res.status(500).send(error);
                return;
            }
            res.send(data);
        });
    });

    server.get('/', (req, res) => {
        console.log("Serving index");
        return app.render(req, res, '/index', {});
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    const port = process.env.PORT || 3000;
    server.listen(port, err => {
        if (err) throw err;
    });

    process.on("SIGINT", () => {
        process.exit(130 /* 128 + SIGINT */);
    });

    process.on("SIGTERM", () => {
        bus.close();
        server.close(() => {
            process.exit(143 /* 128 + SIGTERM */);
        });
    });
});

function requestData(initialRequest, host, port, path, method, bodyObject, responseHandler) {
    console.log("%s - %s:%s%s", method, host, port, path);
    var options = {
        host: host,
        port: port,
        path: path,
        method: method,
        headers: {'content-type': 'application/json'}
    };
    const routeAsValue = initialRequest.get('kubernetes-route-as');
    if (routeAsValue) {
        console.log('Forwarding kubernetes-route-as header value: %s', routeAsValue);
        options.headers['kubernetes-route-as'] = routeAsValue;
    } else {
        console.log('No kubernetes-route-as header value to forward');
    }
    var newRequest = http.request(options, function(statResponse) {
        var responseString = '';
        //another chunk of data has been received, so append it to `responseString`
        statResponse.on('data', function (chunk) {
            responseString += chunk;
        });
        statResponse.on('end', function () {
            console.log('Response: %s', responseString);
            var responseObject;
            try {
                responseObject = JSON.parse(responseString);
            }
            catch (error) {
                responseObject = null;
            }
            responseHandler(responseObject, null);
        });
    });

    newRequest.on('error', function (error) {
        console.log('Request error: ' + error);
        responseHandler(null, error.message);
    });

    if (bodyObject != null) {
        newRequest.ContentType = 'application/json';
        newRequest.write(JSON.stringify(bodyObject));
    }

    newRequest.end();
}