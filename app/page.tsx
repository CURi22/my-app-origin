import { redirect } from "next/navigation";

import "styles/app/page.scss";

export default function MyApp() {
  redirect("/home");
}
