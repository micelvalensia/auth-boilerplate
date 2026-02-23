import { ProtectedRoute } from "@/domain/auth/components/protected-route";
import { PropsWithChildren } from "react";

export default function ProtectedLayout({ children }: PropsWithChildren) {
  return (
    <ProtectedRoute>
      <div>{children}</div>
    </ProtectedRoute>
  );
}
