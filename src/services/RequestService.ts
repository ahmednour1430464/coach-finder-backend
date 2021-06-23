import { Request } from "express";
import {Request as req} from "@prisma/client"



interface TRequest{
  id:number,
  email:string,
  message:string,
  receiverId:number,
  senderId:number,
}

export const extractRequestData = (req: Request) => {
  const { email, message, senderId, receiverId } = req.body;
  return {
    email: email as string,
    message: message as string,
    senderUser: {
      connect: {
        id: Number(senderId),
      },
    },
    receiverUser: {
      connect: {
        id: Number(receiverId),
      },
    },
  };
};

export const prepareRequestResponse = (request:req) => {


  return {
    id: request.id,
    email: request.email,
    message:request.message,
    senderId: request.userIdSend,
    receiverId: request.userIdReceive,
  };
};

export const prepareRequestListResponse = (Requests: Array<req>) => {
  const list: Array<TRequest>=[];
  Requests.forEach((Request) => {
    list.push(prepareRequestResponse(Request));
  });
  return list;
};

