import type { NextApiRequest, NextApiResponse } from "next";
import type { User } from "@prisma/client";
import { Prisma } from "@prisma/client";
import prisma from "lib/prisma";

type Data = { message: string } | User[];

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  let data = {} as User;
  if (req.body) data = JSON.parse(req.body);

  switch (method) {
    case "GET":
      await handleGET(res);
      break;
    case "POST":
      await handlePOST(data, res);
      break;
    case "PUT":
      await handlePUT(data, res);
      break;
    case "DELETE":
      await handleDELETE(data, res);
      break;
    default:
      res.status(405).end(`Method ${method} not allowed`);
  }
}

const handleGET = async (res: NextApiResponse<Data>) => {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.status(200).json(users);
};

const handlePOST = async (data: User, res: NextApiResponse<Data>) => {
  try {
    await prisma.user.create({ data });
    res.status(200).json({
      message: `User with email: ${data.email} has been created successfully!`,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        res.status(400).json({
          message:
            "There is a unique constraint violation, a new user cannot be created with this email",
        });
      }
    } else {
      res
        .status(400)
        .json({ message: `User with email: ${data.email} cannot be created` });
    }
  }
};

const handlePUT = async (data: User, res: NextApiResponse<Data>) => {
  try {
    await prisma.user.update({
      where: {
        id: data.id,
      },
      data: data,
    });
    res.status(200).json({
      message: `User with email: ${data.email} has been updated successfully!`,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        res.status(400).json({
          message:
            "There is a unique constraint violation, a user cannot be updated with this email",
        });
      }
    } else {
      res
        .status(400)
        .json({ message: `User with email: ${data.email} cannot be updated` });
    }
  }
};

const handleDELETE = async (data: User, res: NextApiResponse<Data>) => {
  try {
    await prisma.user.delete({
      where: { id: data.id },
    });
    res.status(200).json({
      message: `User with email: ${data.email} has been deleted successfully!`,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: `User with email: ${data.email} cannot be deleted` });
  }
};
