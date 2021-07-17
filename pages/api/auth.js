import jwt from 'jsonwebtoken';

export default async function AuthApi(req, res) {
    const { authorization } = req.headers;
    const decodedToken = jwt.decode(authorization);

    if (!decodedToken) {
        return res.send({
            isAuthenticated: false,
        });
    }

    const githubRes = await fetch(`https://api.github.com/users/${decodedToken.githubUser}`);
    const githubData = await githubRes.json();
    
    if (githubData.message === 'Not Found' || !githubData) {
        res.send({
            isAuthenticated: false,
        });
    }
    else {
        res.send({
            isAuthenticated: true,
        });
    }
}