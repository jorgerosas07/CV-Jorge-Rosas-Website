import { Inter } from "next/font/google";
import "./globals.css";
import ScrollProgress from "./components/ScrollProgress";

const inter = Inter({ subsets: ["latin"] });

const description =
  "Jorge Rosas, BSc Management student at Nova SBE. Strategy and investing: NOS innovation sprint lead proposal, Magnite pitch with +104.6% realised return.";

export const viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export const metadata = {
  metadataBase: new URL("https://cv-jorge-rosas-website.vercel.app"),
  title: "Jorge Rosas | Management Student @ Nova SBE",
  description,
  openGraph: {
    title: "Jorge Rosas | Management Student @ Nova SBE",
    description,
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <a href="#main" className="skipLink">
          Skip to main content
        </a>
        <ScrollProgress />
        <nav className="navbar">
          <div className="nav-container">
            <span className="logo">Jorge Rosas</span>
            <div className="nav-links">
              <a href="#work">Work</a>
              <a href="#experience">Experience</a>
              <a href="#education">Education</a>
              <a href="#skills">Skills</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </nav>
        <main id="main">{children}</main>
        <footer className="footer">
          <p>© {new Date().getFullYear()} Jorge Rosas</p>
        </footer>
      </body>
    </html>
  );
}
