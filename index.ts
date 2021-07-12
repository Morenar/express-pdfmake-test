import serverless from 'serverless-http';
import express from 'express';
import { Request, Response } from 'express';
import logic from './src/functions';

const app = express();

app.get('/', async function (req, res) {
  return res.send('Hello World!')
})

app.get('/pdf', (req: Request, res: Response) => {
  logic();

  res.send({
    message: 'PDF created!',
  })
});

module.exports.handler = serverless(app);
