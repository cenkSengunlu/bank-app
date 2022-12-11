import "../styles/styles.css";
import Header from "../components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>
      <Header />
      <body>{children}</body>
    </html>
  );
}
