import type { Metadata } from "next";
import { LayoutClient } from "./layout.client";
import Providers from "../utils/providers";
import * as stylex from "@stylexjs/stylex";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export const layoutStyles = stylex.create({
  body: {
    margin: "0px",
    padding: "0px",
    background: "rgb(244, 242, 238)",
  },
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body {...stylex.props(layoutStyles.body)}>
        <Providers>
          <LayoutClient>{children}</LayoutClient>
        </Providers>
      </body>
    </html>
  );
}
