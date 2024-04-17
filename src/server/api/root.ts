import { createTRPCRouter } from "./trpc";
import { userRouter } from "./routers/user";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { userLoginRouter } from "./routers/userLogin";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../db";

export const appRouter = createTRPCRouter({
  user: userRouter,
  userLogin: userLoginRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export function getContext(options?: {
  res: NextApiResponse;
  req: NextApiRequest;
}) {
  return {
    prisma,
    res: options?.res ?? null,
    req: options?.req ?? null,
  };
}

export function getCaller(options?: {
  res: NextApiResponse;
  req: NextApiRequest;
}) {
  const ctx = getContext(options);
  return appRouter.createCaller(ctx);
}

// const server = createHTTPServer({
//   router: appRouter,
// });

// server.listen(3000);
