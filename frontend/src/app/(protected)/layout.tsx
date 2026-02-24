import { SidebarApp } from "@/components/layout/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { SidebarProvider } from "@/context/sidebar-context";
import { ProtectedRoute } from "@/domain/auth/components/protected-route";
import { PropsWithChildren } from "react";

export default function ProtectedLayout({ children }: PropsWithChildren) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <SidebarApp />
        <div className="p-4">
          <SidebarTrigger />
          {children}
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
