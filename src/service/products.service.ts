import path from "node:path";
import fs from "fs";
//proccess.cwd() function amader project folder nia ashe
const filePath = path.join(process.cwd(), "./src/db/db.json");
export const getProduct = () => {
  //   console.log("file path", filePath);
  const products = fs.readFileSync(filePath, "utf-8");
  //   console.log(products)
  return JSON.parse(products);
};
export const insertProduct = (payload: any) => {
  fs.writeFileSync(filePath, JSON.stringify(payload, null, 2));  //here 2 is indention which db.json look like clean
};
