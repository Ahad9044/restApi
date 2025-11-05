export const auth = (req, res, next) => {
    let login = "xyz"
    console.log("The authorization is being done, kindly wait.....");
    let isAuthorized = login === 'xyz'
    console.log(isAuthorized);
    if (!isAuthorized) res.status(401).send("User unauthorised")
    else next()
}

