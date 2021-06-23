import { Coach } from ".prisma/client";
import { Request } from "express";

type TCoach={
    id: number;
    firstName: string;
    lastName: string;
    hourlyRate: number;
    description: string;
    areas: string[];
}
export const extractCoachData = (req: Request) => {
  const { id, email, firstName, lastName, description, hourlyRate, areas } =
    req.body;
  const coachData = {
    firstName: firstName as string,
    lastName: lastName as string,
    description: description as string,
    hourlyRate: Number(hourlyRate),
    areas: areas.toString(),
  };
  return {
    id,
    email,
    coachData,
  };
};

export const prepareCoachResponse = (coach: Coach) => {
  const { id, firstName, lastName, hourlyRate, description, areas } =
    coach;
  return {
    id,
    firstName,
    lastName,
    hourlyRate,
    description,
    areas: areas.split(","),
  };
};

export const prepareCoachListResponse = (coaches: Array<Coach>) => {
  const list: Array<TCoach>=[];
  coaches.forEach((coach) => {
    list.push(prepareCoachResponse(coach));
  });
  return list;
};
