import { Request, Response } from "express";
import prisma from "../libs/PrismaInit";
import { appendCoach } from "../services/UserService";

const login = async (req: Request, res: Response, next: Function) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return signup(req, res, next);
    }
    res.status(200).json({
      result: {
        status: "success",
        user: {
          id: user?.id,
          email: user?.email,
          coach: appendCoach(user?.id as number, prisma),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const signup = async (req: Request, res: Response, next: Function) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.create({
      data: {
        email,
      },
    });

    res.status(201).json({
      result: {
        status: "created",
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  login,
  signup,
};
