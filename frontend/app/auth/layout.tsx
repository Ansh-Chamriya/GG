import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | GearGuard",
  description: "Sign in to your GearGuard maintenance management account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "var(--background-secondary)" }}
    >
      <div
        className="w-full max-w-md p-8 rounded-2xl"
        style={{
          background: "var(--background)",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
