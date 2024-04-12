import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export type CreateUserType = z.infer<typeof createUserInput>;

const createUserInput = z.object({
  email: z.string(),
  name: z.string().optional(),
  verified: z.boolean().optional(),
});

export const userRouter = createTRPCRouter({
  userQueryByEmail: publicProcedure
    .input(
      z.object({
        email: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          email: input.email,
        },
      });
      return user;
    }),
  userCreate: publicProcedure
    .input(createUserInput)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.create({
        data: {
          email: input.email,
          name: input.name,
          verified: input.verified,
        },
      });
      return user;
    }),
});
