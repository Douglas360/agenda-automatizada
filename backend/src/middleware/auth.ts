import { NextFunction, Request, Response } from "express";
import { verify, JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

interface IPayload {
  sub: string;
  isAdmin: boolean;
  idMinistryToken: number;
}

export function auth(req: Request, res: Response, next: NextFunction) {
  // Check if the JWT_SECRET environment variable is set
  if (!process.env.JWT_SECRET) {
    return next(new Error("JWT_SECRET environment variable is not set"));
  }
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({
      message: "Token is missing",
    });
  }

  const [, token] = authToken.split(" ");

  //Validate if token is valid
  try {
    //const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;
    //(req as any).user_id = sub;
    const { sub, idMinistryToken, isAdmin } = verify(
      token,
      process.env.JWT_SECRET
    ) as IPayload;
    (req as any).user_id = sub;
    (req as any).idMinistryToken = idMinistryToken;
    (req as any).isAdmin = isAdmin;

    return next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(401).json({
        message: "Token expired",
      });
    }
    if (err instanceof JsonWebTokenError) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
  }
}
