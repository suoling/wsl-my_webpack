const express = require('express');

const app = express();

// 代理-proxy
const proxy = require('http-proxy-middleware');

const proxyTable = {
    '/api/**': {
        target: 'http://localhost:8000',
        changeOrigin: true
    }
};

Object.keys(proxyTable).forEach(key => {
    app.use(proxy(key,proxyTable[key]));
});

// 假数据-mocks
const path = require('path');
const fs = require('fs');

const MOCK_DEF_FILE = 'mock.json';
const MOCK_PATH = 'mocks';
const DEF_PATH = 'definition';

const mockPath = path.join(__dirname, '..', MOCK_PATH, MOCK_DEF_FILE);
const mockContent = fs.readFileSync(mockPath);
const mockData = JSON.parse(mockContent);

app.use('/mocks/**', (req, res) => {
    console.log(req.originalUrl)
    for (let k = 0; k < mockData.definition.length; k++) {
        const d = mockData.definition[k]
        const filePath = d.path
        const file = d.morkFile // morkFile looks like spacial, can not use this name
        if (req.originalUrl === filePath) {
            console.log(filePath)
            defContent = fs.readFileSync(path.join(__dirname, '..', MOCK_PATH, DEF_PATH, file))
            res.set('Content-Type', 'application/json');
            res.send(defContent);
            break;
        }
    }
})

// 自动编译，热刷新
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
    // webpack-dev-middleware options  webpackConfig.output.publicPath
    publicPath: '/',
}));

app.use(webpackHotMiddleware(compiler));


// 监听端口
app.listen(3000, () => {
    console.log("running……");
})