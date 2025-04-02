"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { FC, ReactNode } from "react";
import { getUserData } from "../utils/services";
import * as stylex from "@stylexjs/stylex";

export const layoutStyles = stylex.create({
  base: {
    background: "white",
    borderTop: "1px solid rgba(140, 140, 140, 0.2)",
    borderBottom: "1px solid rgba(140, 140, 140, 0.2)",
    height: "60px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  pageContainer: {
    marginTop: 60,
  },
});

export const LayoutClient: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { data: user } = useSuspenseQuery({
    queryKey: ["user", "2"],
    queryFn: () => getUserData("2"),
  });
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  return (
    <div>
      <div {...stylex.props(layoutStyles.base)}>
        <h1>Welcome {user.name}</h1>
        <button
          onClick={() => {
            if (isHomePage) {
              router.push("/profile/" + user.id);
            } else {
              router.push("/");
            }
          }}
        >
          {isHomePage ? "Go to profile" : "Go to feed"}
        </button>
      </div>
      <div {...stylex.props(layoutStyles.pageContainer)}>{children}</div>
    </div>
  );
};
