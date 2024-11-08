const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const client = require('./db/db');

const PORT = 3000
const app = express();
// const rootDir = path.join(__dirname, '../src/App.tsx');


app.use(
    '/',
    createProxyMiddleware({
      target: 'http://localhost:5173',
      changeOrigin: true,
      pathFilter: '/path'
    })
  );

app.get('/post', async (req, res, next) => {
  console.log('/post req recieved')
  const details = {
    title: 'Make a confession!',
    author: 'DatBoi2006',
    date: new Date,
    brief: 'Uh oh, time to confess! Put on your best "I\'m sorry!" face and make your submission now.',
    desc: 'Submit a short video of yourself making a confession about yourself or your life. Have fun with this prompt - keep it light and don\'t take yourself too seriously! Confession must be your own: no "confessing" on behalf of friends or family, please!',
    subReq: '',
    postLenMin: 20,
    postLenMax: 40,
    rights: 'Video will be displayed publically on the feed, viewable by anyone.',
    copy: 'Video will not be used for commercial purposes without explicit release from creators.'
  }
  const { title, author, date, brief,postLenMin, postLenMax } = details;
  const values = [title, author, date, brief, postLenMin, postLenMax];

  const q = `
  INSERT INTO "Post" ("title", "author", "date", "brief", "postLenMin", "postLenMax")
  VALUES($1, $2, $3, $4, $5, $6)
  RETURNING *
  `
  const result = await client.query(q, values);
  console.log('result:', result);
  next();
})  
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