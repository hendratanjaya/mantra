import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { FaGoogle } from "react-icons/fa";
import { continueWithGoogleAction } from "../action";

export default function OauthButton({ pending }: { pending: boolean }) {
  const [_, formAction, __] = useActionState(continueWithGoogleAction, null);
  return (
    <form action={formAction}>
      <Button
        className="w-full "
        type="submit"
        variant={"outline"}
        disabled={pending}
      >
        <FaGoogle />
        Continue with Google
      </Button>
    </form>
  );
}
