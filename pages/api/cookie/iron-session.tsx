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

interface NextAPIHandlerParams {
  requst: NextApiRequest;
  response: NextApiResponse;
}

async function nextAPIHandler({
  requst,
  response,
}: NextAPIHandlerParams): Promise<void> {
  switch (requst.method) {
    case "GET":
      const user: IronSessionUser | undefined = requst.session.user;

      response.send({ user });

      break;

    case "POST":
      requst.session.user = requst.body;

      await requst.session.save();

      response.send({ message: "done" });

      break;

    case "DELETE":
      requst.session.destroy();

      response.send({ message: "done" });

      break;

    default:
      response.status(400);
  }
}

const ironSessionOption: IronSessionOptions = {
  cookieName:
    process.env.IRON_COOKIE_NAME ??
    "Temporary created cookie name by occurding error",
  password:
    process.env.IRON_COOKIE_PASSWORD ?? "2YP7n3qbCje3Msgav3sV12HZHi4JdDAV",
};

export default withIronSessionApiRoute(
  (req: NextApiRequest, res: NextApiResponse) => {
    nextAPIHandler({
      requst: req,
      response: res,
    });
  },
  ironSessionOption
);
