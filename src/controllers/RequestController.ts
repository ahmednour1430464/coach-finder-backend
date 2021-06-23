import { Request, Response } from "express";
import prisma from "../libs/PrismaInit";
import {
  extractRequestData,
  prepareRequestListResponse,
  prepareRequestResponse,
} from "../services/RequestService";
const create = async (req: Request, res: Response, next: Function) => {
  try {
    const request = await prisma.request.create({
      data: extractRequestData(req),
    });

    res.status(201).json({
      result: {
        status: "created",
        request: prepareRequestResponse(request),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req: Request, res: Response, next: Function) => {
  try {
    const { id } = req.params;
    const request = await prisma.request.findUnique({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      results: {
        request,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req: Request, res: Response, next: Function) => {
  try {
    const { id } = req.params;
    const requests = await prisma.request.findMany({
      orderBy: {
        id: "desc",
      },
      where: {
        receiverUser: {
          id: Number(id),
        },
      },
    });
    res.status(200).json({
      result: {
        requests:prepareRequestListResponse(requests),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAllRe = async (req: Request, res: Response, next: Function) => {
  try {
    const { id } = req.params;
    const requests = await prisma.request.findMany({
      orderBy: {
        id: "desc",
      },
    });
    res.status(200).json({
      result: {
        requests,
      },
    });
  } catch (error) {
    next(error);
  }
};
export default {
  create,
  getOne,
  getAll,
  getAllRe
};
