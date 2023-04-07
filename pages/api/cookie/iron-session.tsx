import { NextApiRequest, NextApiResponse } from "next";

import { IronSessionOptions } from "iron-session";
import { withIronSessionApiRoute } from "iron-session/next";

export interface IronSessionUser {
  server?: {
    id: number;
    token: string;
  };
  social?: {
    service: string;
    token: string;
  };
}

declare module "iron-session" {
  interface IronSessionData {
    user?: IronSessionUser;
  }
}

async function nextAPIHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  switch (req.method) {
    case "GET":
      const user: IronSessionUser | undefined = req.session.user;

      res.send(user ?? {});

      break;

    case "POST":
      req.session.user = req.body;

      await req.session.save();

      res.status(200);
      res.send({});

      break;

    case "DELETE":
      req.session.destroy();

      res.status(200);
      res.send({});

      break;

    default:
      res.status(400);
      res.send({});
  }
}

const ironSessionOption: IronSessionOptions = {
  cookieName:
    process.env.IRON_COOKIE_NAME ??
    "Temporary created cookie name by occurding error",
  password:
    process.env.IRON_COOKIE_PASSWORD ?? "2YP7n3qbCje3Msgav3sV12HZHi4JdDAV",
};

export default withIronSessionApiRoute(nextAPIHandler, ironSessionOption);
