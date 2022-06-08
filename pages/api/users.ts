import type { NextApiRequest, NextApiResponse } from "next";
import type { User } from "@prisma/client";
import prisma from "lib/prisma";

type Data = { message: string } | User | User[];

export default function handle(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    return getUsers(req, res);
  } else if (req.method === "POST") {
    return createUser(req, res);
  } else if (req.method === "PUT") {
    return updateUser(req, res);
  } else if (req.method === "DELETE") {
    return deleteUser(req, res);
  }
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.json(users);
};

const createUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const data = JSON.parse(req.body);
  const user = await prisma.user.create({ data });
  res.json(user);
};

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const data = JSON.parse(req.body);
  const user = await prisma.user.update({
    where: {
      id: data.id,
    },
    data: data,
  });
  res.json(user);
};

const deleteUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const id = JSON.parse(req.body);
  const user = await prisma.user.delete({
    where: { id },
  });
  res.json(user);
};
