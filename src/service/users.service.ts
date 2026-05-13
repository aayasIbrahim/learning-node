import  fs  from 'fs';
import path from 'path';
const filepath=path.join(process.cwd(),"./src/db/user.json")

// process.cwd()  current working directory === folder ,not file
export const getUsers=()=>{
  const users= fs.readFileSync(filepath,"utf-8")
  return JSON.parse(users)
}
export const insertUser = (payload: any) => {
  fs.writeFileSync(filepath, JSON.stringify(payload, null, 2));  //here 2 is indention which db.json look like clean
};

