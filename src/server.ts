import {
  createServer,
  IncomingMessage,
  Server,
  ServerResponse,
} from "node:http";
import { routeHandler } from "./router/route";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    routeHandler(req, res);
  },
);
const port = 3000;
server.listen(port, () => {
  console.log(`server is running is ${port}`);
});
