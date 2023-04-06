import express from 'express';
import ErrorHandler from './Middlewares/ErrorHandle';
import userRouter from './Routes/UserRoutes';
import categoryRouter from './Routes/CategoryRoutes';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.express.get('/', (_req, res) => res.status(200).json({ message: 'Api Running' }));
  }

  private middleware(): void {
    this.express.use(express.json());
  }
  
  private routes(): void {
    this.express.use('/', userRouter);
    this.express.use('/categorys', categoryRouter);
    this.express.use(ErrorHandler.handle);
  }
}

export default App;