import { get, type IncomingMessage } from "node:http";
import { getProduct, insertProduct } from "../service/products.service";
import type { IProduct, Req, Res } from "../types/types";
import { sendResponse } from "../utils/sendResponse";
import { parseBody } from "../utils/parseBody";

export const productController = async (req: Req, res: Res) => {
  const url = req.url ?? "/products";
  const method = req.method;

  const urlParts = url.split("/");
  //       "/products/3" ==> ["",products,2]
  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;
  //All product get
  if (url === "/products" && method === "GET") {
    const products = getProduct();
    sendResponse(res, 200, {
      success: true,
      message:
        products.length == 0
          ? "no product yet"
          : "Products retrived successfully",
      data: products.length == 0 ? [] : products,
    });

    //single product get
  } else if (method === "GET" && id !== null) {
    try {
      const products = getProduct();
      const product = products.find((p: IProduct) => p.id == id);
      if (!product) {
        sendResponse(res, 404, {
          success: false,
          message: "Product not found",
          data: null,
        });
      } else {
        sendResponse(res, 200, {
          success: true,
          message: "Product  reterived successfully",
          data: product,
        });
      }
    } catch (error) {
      sendResponse(res, 500, {
        success: false,
        message: "Internal server Error",
      });
    }

    // create products
  } else if (url === "/products" && method == "POST") {
    const products = getProduct();

    const body = await parseBody(req);
    const newProduct = {
      id: Date.now(),
      ...body,
    };
    products.push(newProduct);

    insertProduct(products);
    sendResponse(res, 200, {
      success: true,
      message: "Product add to successfully",
      data: newProduct,
    });
  }
};
