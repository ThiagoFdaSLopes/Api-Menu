import express from 'express';
import ErrorHandler from './Middlewares/ErrorHandle';
import userRouter from './Routes/UserRoutes';

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
    this.express.use(ErrorHandler.handle);
  }
}

export default App;