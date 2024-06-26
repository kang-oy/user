import { randomUUID } from 'crypto'
import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../trpc'

export const userLoginRouter = createTRPCRouter({
  saveUserLogin: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        code: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const one = await ctx.prisma.userLogin.findFirst({
        where: {
          code: input.code,
          userId: input.userId,
          // invalidTime 大于现在的时间
          invalidTime: {
            gt: new Date(),
          },
        },
      })
      if (one) {
        return one
      }

      const now = new Date()
      const invalidTime = new Date(now.getTime() + 1000 * 60 * 10)
      const userLogin = await ctx.prisma.userLogin.create({
        data: {
          userId: input.userId,
          code: input.code,
          createdAt: now,
          updatedAt: now,
          invalidTime: invalidTime,
          token: randomUUID(),
          logined: true,
        },
      })
      return userLogin
    }),
  queryUserInfoByCode: publicProcedure
    .input(
      z.object({
        code: z.string(),
        userId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      console.log('date:', new Date())
      const userLog = await ctx.prisma.userLogin.findFirst({
        where: {
          code: input.code,
          userId: input.userId,
          // invalidTime 大于现在的时间
          invalidTime: {
            gt: new Date(),
          },
        },
        include: {
          user: true,
        },
      })
      return userLog
    }),
})
