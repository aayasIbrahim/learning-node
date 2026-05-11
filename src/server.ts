import {
  createServer,
  IncomingMessage,
  Server,
  ServerResponse,
} from "node:http";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    // console.log(req?.url);// "/","/user","/products",
    // console.log(req?.method)// "GET","POST","PATCH","DELETE"
    const url = req.url;
    const method = req.method;
    if (url === "/" && method === "GET") {
      res.writeHead(200, { "content-type": "Application/json" });
      res.end(JSON.stringify({ message: "This is Hoome Route" }));
    } else if (url?.startsWith("/products")) {
      res.writeHead(200, {
        "content-type": "text/plain",
      });
      res.end("This is Product Page");
    } else {
      res.writeHead(404, {
        "content-type": "Application/json",
      });
      res.end(JSON.stringify({ message: "Page Not Found" }));
    }
  },
);
const port = 3000;
server.listen(port, () => {
  console.log(`server is running is ${port}`);
});
