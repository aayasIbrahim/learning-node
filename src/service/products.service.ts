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
