// server.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const client = require('./db/db');
const graphqlMiddleware = require('./graphQL/index');

const PORT = 3000;
const app = express();

// Set up GraphQL route
app.use('/graphql', graphqlMiddleware);

// Set up proxy middleware for all other requests
app.use(
  (req, res, next) => {
    if (req.path.startsWith('/graphql')) return next();
    createProxyMiddleware({
      target: 'http://localhost:5173',
      changeOrigin: true,
    })(req, res, next);
  }
);

// Example route for inserting a post
// app.get('/post', async (req, res, next) => {
//   console.log('/post request received');
//   const details = {
//     title: 'Make a confession!',
//     author: 'DatBoi2006',
//     date: new Date(),
//     brief: 'Time to confess!',
//     postLenMin: 20,
//     postLenMax: 40,
//   };
//   const values = [details.title, details.author, details.date, details.brief, details.postLenMin, details.postLenMax];

//   const q = `
//     INSERT INTO "Post" ("title", "author", "date", "brief", "postLenMin", "postLenMax")
//     VALUES($1, $2, $3, $4, $5, $6)
//     RETURNING *
//   `;
  
//   try {
//     const result = await client.query(q, values);
//     console.log('result:', result.rows);
//     res.json(result.rows[0]); // Respond with the created post
//   } catch (err) {
//     next(err);
//   }
// });

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
