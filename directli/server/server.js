const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const graphqlMiddleware = require('./graphQL/index');
const userRoutes = require('./routes/userRoutes');

const PORT = 3000;
const app = express();

app.use('/user', userRoutes, graphqlMiddleware);

// Middleware to route /user/:id to GraphQL
// app.use('/user/:id', (req, res, next) => {
//   req.url = `/graphql`;
//   req.body = {
//     query: `
//       query getUser($id: ID!) {
//         userFindOne(id: $id) {
//           userID
//           nameFirst
//           nameLast
//           displayName
//           email
//           dob
//           bio
//         }
//       }
//     `,
//     variables: { id: req.params.id },
//   };
//   next();
// }, graphqlMiddleware);

// Apply the GraphQL middleware
// app.use(graphqlMiddleware);

// Use routes for each data Entity
app.use('/user', (req, res, next) => {
  console.log('user route');
  next()
}, userRoutes);

// Set up proxy middleware
const proxy = createProxyMiddleware({
  target: 'http://localhost:5173',
  changeOrigin: true,
});


// Use proxy middleware for all requests besides graphql
app.use((req, res, next) => {
  if (req.path.startsWith('/graphql')) return next();
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
