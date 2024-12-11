const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const graphqlMiddleware = require('./graphQL/index');

const PORT = 3000;
const app = express();

app.use('/graphql', graphqlMiddleware);

// Set up proxy middleware
const proxy = createProxyMiddleware({
  target: 'http://localhost:5173',
  changeOrigin: true,
});

// Use proxy middleware for all requests besides graphql
app.use((req, res, next) => {
  // if (req.path.startsWith('/graphql')) return next();
  proxy(req, res, next);
});


// 404 error handling
app.use('*', (req, res) => res.status(404).send('404ed!'));

// Global error handling
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.message);
  res.status(err.status || 500).json({ error: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
