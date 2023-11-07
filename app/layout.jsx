require('dotenv').config();

import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: 'turtywurty.dev',
  description: 'TurtyWurty\'s personal website'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <Navbar/>
          {children}
      </body>
    </html>
  )
}
