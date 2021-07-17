export default async function getFollowers(req, res) {
    const { githubUser } = req.body;

    const githubRes = await fetch(`https://api.github.com/users/${githubUser}`);
    const githubData = await githubRes.json();
    
    if (githubData.message === 'Not Found' || !githubData) {
        res.send({
            status: 404,
        });
    }
    else {
        const githubApi = await fetch(`https://api.github.com/users/${githubUser}/followers`);
        res.send({
            status: 200,
            data: await githubApi.json(),
        });
    }
}