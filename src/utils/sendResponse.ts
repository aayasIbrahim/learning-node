
import type { ServerResponse } from "node:http";

type ResponseData = {
  success: boolean;
  message: string;
  data?: unknown;
};

export const sendResponse = (
  res: ServerResponse,
  statusCode: number,
  
  payload: ResponseData
): void => {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify(payload));
};