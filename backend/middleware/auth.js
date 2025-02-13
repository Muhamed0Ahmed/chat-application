import jwt from "jsonwebtoken";

export const authenticatJWT = (req, res, next) => {
  
  const token = req.header("Authorization")?.split(" ")[0];
  
  if (!token) {return res.sendStatus(403)};
 
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    
    next();
  });
};
