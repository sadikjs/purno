import { SessionProvider } from "next-auth/react";
export default function DownlaodLayout({ children }) {
  return (
    <SessionProvider>
      <div>{children}</div>
    </SessionProvider>
  );
}
