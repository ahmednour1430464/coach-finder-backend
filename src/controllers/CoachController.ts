import { Coach } from ".prisma/client";
import { Request, Response } from "express";
import prisma from "../libs/PrismaInit";
import {extractCoachData,prepareCoachListResponse,prepareCoachResponse} from "../services/CoachService";

const create = async (req: Request, res: Response, next: Function) => {
  try {
    const {id,email,coachData}=extractCoachData(req)
    const coach = await prisma.coach.create({
      data: {
        user: {
          connect: {
            email,
            id,
          },
        },
        ...coachData
      },
    });
    
    res.status(201).json({
      result: {
        status: "created",
        coach: prepareCoachResponse(coach),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req: Request, res: Response, next: Function) => {
  try {
    const { id } = req.params;
    const coach = await prisma.coach.findUnique({
      where: {
        userId: Number(id),
      },
    });
    res.status(200).json({
      result: {
        coach:prepareCoachResponse(coach as Coach),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req: Request, res: Response, next: Function) => {
  try {
    const coaches = await prisma.coach.findMany({
      orderBy: {
        id: "desc",
      },
    });
    res.status(200).json({
      result: {
        coaches:prepareCoachListResponse(coaches),
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
};
