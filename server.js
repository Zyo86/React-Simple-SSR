import React from 'react';
import ReactDOMServer from 'react-dom';
import express from 'express';
import App from './src/App';

const app = express();

const PORT = 8000;

app.get('/bundle.js', (req, res) => {
  browserify('./src/index.js', { debug: true })
    .transform(babelify)
    .bundle()
    .pipe(res);
});
app.get('/', (req, res) => {
  const component = <App />;
  const content = ReactDOMServer.renderToString(component);

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>React SSR Example</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body>
        <div id="app">${content}</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `);

  console.info('React SSR Example');
});

app.listen(PORT, () => {
  console.info('React SSR Sever listening at port : ' + PORT);
});
