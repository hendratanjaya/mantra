import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { FaGoogle } from "react-icons/fa";
import { continueWithGoogleAction } from "../action";
import { LoaderCircle } from "lucide-react";

export default function OauthButton({ pending }: { pending: boolean }) {
  const [_, formAction, oauthPending] = useActionState(
    continueWithGoogleAction,
    null,
  );
  return (
    <form action={formAction}>
      <Button
        className="w-full "
        type="submit"
        variant={"outline"}
        disabled={pending || oauthPending}
      >
        <FaGoogle />
        Continue with Google
        {(pending || oauthPending) && <LoaderCircle className="animate-spin" />}
      </Button>
    </form>
  );
}
