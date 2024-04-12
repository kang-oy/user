import { api } from "@/utils/api";
import { withNextCors } from "@/utils/cors";
import { getCaller } from "@/server/api/root";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const code = req.query.code;
    console.log("code:", code);
    // 检查 code 是否存在并且是一个字符串
    const call = getCaller();
    if (typeof code === "string") {
      const response = await call.userLogin.queryUserInfoByCode({
        code: code,
      });
      console.log("response:", response);
      return res.status(200).json(response);
    } else {
      // 如果 code 参数不存在或不是字符串类型，返回一个错误响应a
      res.status(400).json({ error: "Missing or invalid code parameter" });
    }
  } else {
    return res.status(405).json({
      message: "Method Not Allowed",
    });
  }
};

export default withNextCors(handler);
