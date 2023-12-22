const http = require('node:http');
const httpProxy = require('http-proxy');

// Создаем прокси-сервер
const proxy = httpProxy.createProxyServer({});
// Порт, на котором будет слушать прокси-сервер
const proxyPort = 8081;

// Создаем HTTP-сервер
const server = http.createServer((req, res) => {
    // Перенаправляем запросы на другой сервер
    const targetUrl = 'http://localhost:5173/';
    const apiServerUrl = 'http://127.0.0.1:3333';

    if (req.url.startsWith('/api') || req.url.startsWith('/admin')) {
        // Перенаправляем запросы на /api на API-сервер
        proxy.web(req, res, { target: apiServerUrl });
    } else {
        console.log('targetUrl')
        // Все остальные запросы обрабатываем по умолчанию
        proxy.web(req, res, { target: targetUrl });
    }
});

// Слушаем указанный порт
server.listen(proxyPort, () => {
    console.log(`Прокси-сервер слушает на порту ${proxyPort}`);
});


// const express = require('express'),
//     app = express();
// let proxy = require('express-http-proxy');
//
//
// const host = '127.0.0.1';
// const port = 7000;
// app.use('/', proxy('http://127.0.0.1:5173'));
// app.use('/api', proxy('http://127.0.0.1:3333'));
//
// app.listen(port, host, () =>
//     console.log(`Server listens http://${host}:${port}`)
// );





