"use server";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import { SiteHeader } from "./_components/main-header";
import UserProvider from "./_providers/user-provider";
import { getUserFromCookies } from "./action";
import AssistantPersonaProvider from "./_providers/assistant-provider";
// import { generateAIRespondForChat } from "@/lib/openai/generate-ai-respond";
import { redirect } from "next/navigation";
import { AssistantContext } from "@/lib/openai/type";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSession = await getUserFromCookies();

  if (!userSession) redirect("/login");
  const { user } = userSession;
  const { assistant_persona } = user;
  return (
    <UserProvider user={user}>
      <SidebarProvider className="max-h-screen">
        <AppSidebar />
        <SidebarInset>
          <SiteHeader />
          <AssistantPersonaProvider
            assistantPersona={assistant_persona as AssistantContext}
          >
            <div className="flex flex-1 flex-col min-h-0">
              <div className="@container/main flex flex-1 flex-col gap-2 px-2 pb-2 min-h-0">
                <div className="rounded-xl overflow-hidden flex-1">
                  {children}
                </div>
              </div>
            </div>
          </AssistantPersonaProvider>
        </SidebarInset>
      </SidebarProvider>
    </UserProvider>
  );
}
