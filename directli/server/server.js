const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const PORT = 3000
const app = express();
const rootDir = path.join(__dirname, '../src/App.tsx');


app.use(
    '/',
    createProxyMiddleware({
      target: 'http://localhost:5173',
      changeOrigin: true,
    })
  );

// app.use(express.json({
//     type: ['application/json', 'text/plain']
//   }));

// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/', (req, res, next) => {
//     console.log('dirname:', rootDir);
//     res.set('Content-Type', 'application/JSON').readFile(rootDir, (err) => {
//         if(err){
//             next(err, 'Error in Get / middleware')
//         } else{
//             console.log('Served application successfully.')
//         }
//     })
// })


//404 error handling
app.use('*', (req, res) => res.send('404ed!'))

//global error handling
app.use((err) => {
    class defaultErr {
      constructor(error, controller) {
        (this.log = `Express error handler caught unknown middleware error in ${controller}`),
          (this.status = 500),
          (this.message = {
            err: ` an error occured in ${controller}: ${error}`,
          });
  
      }
    }
    const errorObj = new defaultErr(err.error, err.controller);
    console.log(errorObj.log);
  });
  

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});