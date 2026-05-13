import { getUsers, insertUser } from "../service/users.service";
import type { CustomReq, IUser, Res } from "../types/types";
import { parseBody } from "../utils/parseBody";
import { sendResponse } from "../utils/sendResponse";



export const userController = async (req: CustomReq, res: Res) => {
  const { url, method } = req;
  const urlParts = url?.split("/");

  const id = urlParts && urlParts[1] == "users" ? urlParts[2] : null;

  if (url == "/users" && method == "GET") {
    const users = getUsers();
    sendResponse(res, 200, {
      success: users.lenght === 0 ? false : true,
      message:
        users.lenght == 0 ? "users not found" : "users retrived successfully",
      data: users.lenght == 0 ? [] : users,
    });

    
  } else if (method == "GET" && id !== null) {
    const users = getUsers();
    const user = users.find((u: IUser) => u.id.toString() == id);
    sendResponse(res, 200, {
      success: true,
      message: "user found",
      data: user,
    });
  } else if (url == "/users" && method == "POST") {
    const users = getUsers();
    const body = await parseBody(req);
    const newUsers = {
      id: Date.now(),
      ...body,
    };
    users.push(newUsers);
    insertUser(users);
    sendResponse(res, 200, {
      success: true,
      message: "user creaated successfully",
      data: newUsers,
    });
  } else if (method == "DELETE" && id !== null) {
    const users = getUsers();
    const i = users.findIndex((u: IUser) => u.id.toString() == id);
    const deletuser = users.splice(i, 1);
    insertUser(users);
    sendResponse(res, 200, {
      success: true,
      message: "successfulll deleted user",
      data: deletuser,
    });
  } else if (method == 'PATCH' && id !== null) {
    const users = getUsers();
    const i = users.findIndex((u: IUser) => u.id.toString() == id);
    const deletuser = users.splice(i, 1);
    insertUser(users);
    sendResponse(res, 200, {
      success: true,
      message: "successfulll deleted user",
      data: deletuser,
    });
  }
};
