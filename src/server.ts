import { createServer, Server } from "node:http";
import { routeHandler } from "./router/route";
import type { Req, Res } from "./types/types";

const server: Server = createServer((req: Req, res: Res) => {
  routeHandler(req, res);
});
const port = 3000;
server.listen(port, () => {
  console.log(`server is running is ${port}`);
});
