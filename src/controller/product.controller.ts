import { getProduct } from "../service/products.service";
import type { IProduct, Req, Res } from "../types/types";
import { sendResponse } from "../utils/utities";

export const productController = (req: Req, res: Res) => {
  const url = req.url ?? "/products";
  const method = req.method;
  const urlParts = url.split("/");
  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;

  if (url === "/products" && method === "GET") {
    const products = getProduct();
    sendResponse(res, 200, {
      success: true,
      message: "Data fetched successfully",
      data: products,
    });
  } else if (method === "GET" && id !== null) {
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
        message: "Product  found",
        data: product,
      });
    }
  }
};
