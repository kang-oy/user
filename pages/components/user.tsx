import { useUser } from "@auth0/nextjs-auth0/client";
import { api } from "../../utils/api";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Index({ code }: { code: string }) {
  const { user, error, isLoading } = useUser();
  const { mutate: create } = api.user.userCreate.useMutation();
  let { mutate } = api.userLogin.saveUserLogin.useMutation();
  const [show, setShow] = useState(true);

  console.log("user:", user);
  console.log("用户登录信息 user:", user?.email);
  console.log("error: isLoading:", error, isLoading);
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

  const { data: userCode, isLoading: isUserLoginLoading } =
    api.userLogin.queryUserInfoByCode.useQuery({
      code: code,
      userId: userInfo?.id,
    });

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
    <main className="flex space-x-2">
      {show && !isLoading && !userCode && (
        <button
          onClick={authSuccess}
          type="button"
          className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          登录成功，打开桌面应用
        </button>
      )}
      <br />
      <a
        href="/api/auth/logout"
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 className={`mb-3 text-2xl font-semibold`}>LOGOUT</h2>
      </a>
      <a
        href={"/api/user/getUserByCode?code=" + code}
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 className={`mb-3 text-2xl font-semibold`}>获取用户信息</h2>
      </a>
    </main>
  );
}
