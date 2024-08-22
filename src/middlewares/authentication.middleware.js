import jwt from "jsonwebtoken";

function checkForCookie(req, res, next) {
  const token = req.cookies.token;

  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    req.user = user;
    next();
  } catch (error) {
    res.clearCookie("token");
    return res.status(401).send({ message: "invalid token" });
  }
}
export { checkForCookie };
