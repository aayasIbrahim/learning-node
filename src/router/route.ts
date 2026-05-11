import type { IncomingMessage, ServerResponse } from "node:http";
import { productController } from "../controller/product.controller";
import type { Req, Res } from "../types/types";

export const routeHandler = (req: Req, res: Res) => {
  // console.log(req?.url);// "/","/user","/products",
  // console.log(req?.method)// "GET","POST","PATCH","DELETE"
  const url = req.url ?? "/";
  const method = req.method;
  if (url === "/" && method === "GET") {
    res.writeHead(200, { "content-type": "Application/json" });
    res.end(JSON.stringify({ message: "This is Hoome Route" }));
  } else if (url?.startsWith("/products")) {
    productController(req, res);

  } else {
    res.writeHead(404, {
      "content-type": "Application/json",
    });
    res.end(JSON.stringify({ message: "Page Not Found" }));
  }
};
