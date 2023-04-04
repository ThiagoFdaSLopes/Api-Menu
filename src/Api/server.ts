import 'dotenv/config';
import App from './app';
import connectToDatabase from '../Database/Connection';

class Server {
  private readonly PORT: number | string;
  private app: App;

  constructor() {
    this.PORT = process.env.PORT || 3001;
    this.app = new App();
  }

  public start(): void {
    connectToDatabase()
      .then(() => {
        this.app.express.listen(this.PORT, () => {
          console.log(`Running server on port: ${this.PORT}`);
        });
      })
      .catch((error) => {
        console.log('Connection with database generated an error:\r\n');
        console.error(error);
        console.log('\r\nServer initialization cancelled');
        process.exit(0);
      });
  }
}

export default Server;