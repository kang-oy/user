import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export default handleAuth({
    async login(req, res) {
        try {
            // 从请求中提取 email 参数
            // 其他数据
            const { email } = req.query;
            // 处理登录，传递 email 作为 login_hint
            await handleLogin(req, res, {
                authorizationParams: {
                    // 你的其他授权参数，例如：
                    response_type: 'code',
                    scope: 'openid profile email',
                    // 添加 login_hint 参数
                    login_hint: email || '' // 如果 email 存在，则作为 login_hint 发送
                },
                // 可以根据需要设置其他登录配置
            });
        } catch (error) {
            res.status(error.status || 500).end(error.message);
        }
    }
});
