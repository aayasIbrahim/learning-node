import { productController } from "../controller/product.controller";
import { userController } from "../controller/user.controller";
import type { CustomReq, Req, Res } from "../types/types";

export const routeHandler = (req: CustomReq, res: Res) => {
  // console.log(req?.url);// "/","/user","/products",
  // console.log(req?.method)// "GET","POST","PATCH","DELETE"
  const url = req.url ?? "/";
  const method = req.method;
  if (url === "/" && method === "GET") {
    res.writeHead(200, { "content-type": "Application/json" });
    res.end(JSON.stringify({ message: "This is Hoome Route" }));
  } else if (url.startsWith("/products")) {
    productController(req, res);
  } else if (url.startsWith("/users")) {
    userController(req, res);
  } else {
    res.writeHead(404, {
      "content-type": "Application/json",
    });
    res.end(JSON.stringify({ message: "Page Not Found" }));
  }
};
