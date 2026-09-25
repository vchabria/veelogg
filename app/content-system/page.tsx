import { redirect } from "next/navigation";

/* /content-system was the earlier flagship route. It is now folded into the
   broader /ai-systems (Brand & Marketing Systems). Redirect to preserve any
   existing inbound links. */
export default function ContentSystemPage() {
  redirect("/ai-systems");
}
