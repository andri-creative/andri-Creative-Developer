import AuthGuard from "../../../components/AuthGuard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthGuard>
        <main className="w-full">{children}</main>
      </AuthGuard>
    </>
  );
}
