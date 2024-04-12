import { useUser } from "@auth0/nextjs-auth0/client";
import { api } from "../utils/api";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Index({ code }: { code: string }) {
  const { user, error, isLoading } = useUser();
  const { mutate: create } = api.user.userCreate.useMutation();
  let { mutate } = api.userLogin.saveUserLogin.useMutation();
  const [show, setShow] = useState(true);

  console.log("用户登录信息 user:", user);
  const { data: userInfo, isLoading: isUserLoading } =
    api.user.userQueryByEmail.useQuery(
      {
        email: user?.email!,
      },
      {
        enabled: Boolean(user && user.email),
      }
    );

  // 如果data为空，说明数据库中没有该用户，需要创建
  useEffect(() => {
    if (!userInfo && !isUserLoading) {
      console.log("创建用户-----");
      create({
        email: user?.email!,
        name: user?.name ? user.name : "",
        verified: user?.email_verified ? user.email_verified : false,
      });
    }
  }, [
    userInfo,
    isUserLoading,
    create,
    user?.email,
    user?.email_verified,
    user?.name,
  ]);
  if (!userInfo) {
    return;
  }
  console.log("userInfo-----", userInfo);

  if (!userInfo?.verified) {
    return <div>请先验证邮箱</div>;
  }

  const authSuccess = () => {
    mutate({
      userId: userInfo.id,
      code,
    });
    setShow(false);
  };

  return (
    <div>
      <p>Welcome {userInfo.name}! </p>{" "}
      {show && <button onClick={authSuccess}>登录成功，打开桌面应用</button>}
      <br />
      <Link href="/api/auth/logout">退出登录</Link>
      <br />
      <Link href={"/api/user/getUserByCode?code=" + code}>获取用户信息</Link>
    </div>
  );
}
