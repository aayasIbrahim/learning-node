import type { IncomingMessage, ServerResponse } from "node:http";
export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "OPTIONS"
  | "HEAD";
export type Res = ServerResponse;
export type Req = IncomingMessage;
export interface CustomReq extends IncomingMessage {
  method?: HttpMethod;
}
export interface IProduct {
  id: Number;
  name: string;
  description: string;
}
export interface IUser {
  id: Number
  name: string;
  email: string;
  role: string;
}
