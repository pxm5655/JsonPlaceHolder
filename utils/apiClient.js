const https = require('https');

const makeRequest = (method, path, headers = {}, body = null) => {
    const options = {
        hostname: 'jsonplaceholder.typicode.com',
        port: 443,
        path,
        method,
        headers: {
            'Content-Type'  : 'application/json',
            'authorization' : 'test_cookie' ,
            ...headers,
        },
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                console.log(`Response from ${method} ${path}: ${data}`); // Log the full response
                try {
                    const parsedData = JSON.parse(data);
                    resolve({
                        statusCode: res.statusCode,
                        body: parsedData,
                    });
                } catch (error) {
                    reject(`Failed to parse response: ${data}`);
                }
            });
        });

        req.on('error', (e) => {
            reject(e);
        });

        if (body) {
            req.write(JSON.stringify(body));
        }

        req.end();
    });
};

const apiClient = {
    get: (endpoint, headers) => makeRequest('GET', endpoint, headers),
    post: (endpoint, body, headers) => makeRequest('POST', endpoint, headers, body),
    put: (endpoint, body, headers) => makeRequest('PUT', endpoint, headers, body),
    delete: (endpoint, headers) => makeRequest('DELETE', endpoint, headers),
};

module.exports = apiClient;
