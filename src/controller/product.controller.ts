import { getProduct, insertProduct } from "../service/products.service";
import type { CustomReq, IProduct, Req, Res } from "../types/types";
import { sendResponse } from "../utils/sendResponse";
import { parseBody } from "../utils/parseBody";

export const productController = async (req: CustomReq, res: Res) => {
  // const url = req.url ?? "/products";
  // const method = req.method;
  const { url, method } = req;

  const urlParts = url?.split("/");
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
  } ///Upadate Product PATCH this partial change means modified only spacacific fields
  else if (method === "PATCH" && id !== null) {
    const products = getProduct();
    const body = await parseBody(req);
    const i = products.findIndex((p: IProduct) => p.id == id);
    if (i == -1) {
      sendResponse(res, 401, {
        success: false,
        message: "Product not found",
      });
    }
    const updateProduct = {
      ...products[i], //age exiting data must be dite hobe
      ...body,
    };
    //  Explicitly purono ID-ta set kora Jate user change korte na     pare
    updateProduct.id = products[i].id;

    products[i] = updateProduct;
    insertProduct(products);
    sendResponse(res, 200, {
      success: true,
      message: "Product edit to successfullsy",
      data: updateProduct,
    });

    ///"PUT মানে হলো পুরাটা বদলে ফেলা (Full Replacement)।
  } else if (method === "PUT" && id !== null) {
    const products = getProduct();
    const body = await parseBody(req);
    const i = products.findIndex((p: IProduct) => p.id == id);
    if (i == -1) {
      sendResponse(res, 401, {
        success: false,
        message: "Product not found",
      });
    }
    const updateProduct = {
      id: id,
      ...body,
    };

    products[i] = updateProduct;
    insertProduct(products);
    sendResponse(res, 200, {
      success: true,
      message: "Product update to successfullsy",
      data: updateProduct,
    });
  }
  //DELETE Product
  else if (method === "DELETE" && id !== null) {
    const products = getProduct();
    const indexProduct = products.findIndex((p: IProduct) => p.id == id);
    const deleteProduct = products[indexProduct];
    if (indexProduct == -1) {
      return sendResponse(res, 404, {
        success: false,
        message: "Product not found",
      });
    }
    products.splice(deleteProduct, 1);
    insertProduct(products);
    sendResponse(res, 200, {
      success: true,
      message: "Product delete to successfully",
      data: deleteProduct,
    });
  }
};
