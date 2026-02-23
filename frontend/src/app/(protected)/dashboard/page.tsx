"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/domain/auth/hooks/useAuth";

export default function Dashboard() {
  const { logout } = useAuth();

  return (
    <div className="">
      <div className="">Hello World!</div>
      <Button onClick={logout}>Log-out</Button>
    </div>
  );
}
