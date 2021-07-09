import express from 'express';
import { Request, Response } from 'express';
import logic from './functions';

const app = express();
const { 
  PORT = 3000
} = process.env;

app.get('/', (req: Request, res: Response) => {
  logic();

  res.send({
    message: 'PDF created!',
  })
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log('server started at http://localhost:'+PORT);
  });
}

export default app;
