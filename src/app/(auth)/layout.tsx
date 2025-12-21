import { AuthHeader } from "./_components/auth-header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col h-screen justify-between">
      <div className="w-full h-[50px] bg-card mb-5">
        <AuthHeader />
        <div className="w-full flex justify-center">
          <hr className="w-full border-0 h-[1px] bg-border shadow-[0_1px_3px_rgba(0,0,0,0.2)] rounded-full mt-2" />
        </div>
      </div>
      <div className="flex flex-1 justify-center items-center">{children}</div>
    </main>
  );
}
