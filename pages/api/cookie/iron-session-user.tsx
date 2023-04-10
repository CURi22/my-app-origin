import { NextApiRequest, NextApiResponse } from "next";

import { IronSessionOptions } from "iron-session";
import { withIronSessionApiRoute } from "iron-session/next";

export interface IronSessionUserProps {
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
    user?: IronSessionUserProps;
  }
}

async function nextAPIHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  switch (req.method) {
    case "GET":
      const user: IronSessionUserProps | undefined = req.session.user;

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
      res.send({ error: "no message" });
  }
}

const ironSessionOption: IronSessionOptions = {
  cookieName:
    process.env.IRON_COOKIE_NAME ??
    "Temporary created cookie name by occurding error",
  password:
    process.env.IRON_COOKIE_PASSWORD ?? "kX5pEB4i7QFE2s3gUEWg4B20uVu8szTU",
};

export default withIronSessionApiRoute(nextAPIHandler, ironSessionOption);
