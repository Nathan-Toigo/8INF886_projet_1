import "../styles/globals.css";
import {Providers} from "../providers";
import NavbarComponent from "../components/navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavbarComponent />
      <Providers>
        {children}
      </Providers>
    </div>
  );
}
