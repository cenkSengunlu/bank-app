import Header from "./Header";
import Cookies from "js-cookie";

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = Cookies.get("token");
  return (
    <>
      {user && <Header />}
      <main>{children}</main>
    </>
  );
}
