import { Inter } from "next/font/google";
import "./globals.css";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import Orbs from "./components/Orbs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jorge Rosas | Management Student @ Nova SBE",
  description: "CV and Portfolio of Jorge Rosas. Passionate about finance, strategy, and continuous innovation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Global cinematic overlays — client components, server layout safe */}
        <Cursor />
        <ScrollProgress />
        <Orbs />
        <nav className="navbar">
          <div className="nav-container">
            <span className="logo">Jorge Rosas</span>
            <div className="nav-links">
              <a href="#about">About</a>
              <a href="#education">Education</a>
              <a href="#experience">Experience</a>
              <a href="#skills">Skills</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="footer">
          <p>© {new Date().getFullYear()} Jorge Rosas. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
