import { AuthState } from "../types";
import { TbAlertSquareRoundedFilled } from "react-icons/tb";

export default function AuthStateManager({ error, message }: AuthState) {
  return (
    <>
      {error && (
        <div className="bg-card border-[1px] border-destructive rounded-md p-1 text-sm text-destructive">
          <span className="flex justify-center items-center gap-3 w-full">
            <TbAlertSquareRoundedFilled />
            {message}
          </span>
        </div>
      )}
    </>
  );
}
