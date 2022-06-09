import type { NextApiRequest, NextApiResponse } from "next";
import type { User } from "@prisma/client";
import prisma from "lib/prisma";

type Data = { message: string } | User | User[];

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
      await handleDELETE(data.id, res);
      break;
    default:
      throw new Error(
        `The HTTP ${method} method is not supported at this route.`
      );
      break;
  }
}

const handleGET = async (res: NextApiResponse<Data>) => {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.json(users);
};

const handlePOST = async (data: User, res: NextApiResponse<Data>) => {
  const user = await prisma.user.create({ data });
  res.json(user);
};

const handlePUT = async (data: User, res: NextApiResponse<Data>) => {
  const user = await prisma.user.update({
    where: {
      id: data.id,
    },
    data: data,
  });
  res.json(user);
};

const handleDELETE = async (id: string, res: NextApiResponse<Data>) => {
  const user = await prisma.user.delete({
    where: { id },
  });
  res.json(user);
};
