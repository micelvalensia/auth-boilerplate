import { SignInForm } from "../components/sign-in-form";

export function SignInContent() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-white overflow-hidden">
      {/* Background orbs */}
      <div className="absolute -top-32 -left-24 w-[500px] h-[500px] rounded-full bg-violet-600/40 blur-[120px] animate-pulse" />
      <div className="absolute -bottom-20 -right-20 w-[420px] h-[420px] rounded-full bg-cyan-500/30 blur-[120px] animate-pulse [animation-delay:2s]" />
      <div className="absolute bottom-1/3 left-1/4 w-[260px] h-[260px] rounded-full bg-pink-500/25 blur-[100px] animate-pulse [animation-delay:4s]" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <SignInForm />
    </div>
  );
}
