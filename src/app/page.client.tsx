"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { getFeedData, getUserData } from "../utils/services";

export const homeStyles = stylex.create({
  feedText: {
    background: "white",
    height: "60px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
  },
  profileCard: {
    textDecoration: "none",
    width: 225,
    display: "flex",
    flexDirection: "column",
    border: "1px solid rgba(140, 140, 140, 0.2)",
    borderRadius: 10,
    background: "white",
    marginTop: "20px",
    position: "relative",
    ":visited": {
      color: "inherit",
    },
  },
  profilePhoto: {
    position: "absolute",
    border: "2px solid rgba(140, 140, 140, 0.2)",
    top: 30,
    left: 14,
    height: 60,
    width: 60,
    backgroundColor: "white",
    borderRadius: "100%",
    zIndex: 1,
  },
  profileNotch: {
    backgroundColor: "#a0b4b7",
    height: 60,
    borderRadius: "10px 10px 0 0",
  },
  profileDivider: {
    borderColor: "rgba(140, 140, 140, 0.2)",
    margin: "0px",
  },
  profileName: {
    padding: "0px 20px",
    background: "white",
    margin: "40px 0px 10px 0px",
  },
  profileOccupation: {
    fontSize: "14px",
    padding: "0px 20px",
    background: "white",
    margin: "0px 0px 6px 0px",
    color: "rgba(0, 0, 0, 0.9)",
  },
  profileLocation: {
    fontSize: "14px",
    padding: "0px 20px",
    background: "white",
    margin: "0px 0px 20px 0px",
    color: "rgba(0, 0, 0, 0.6)",
  },
  feedContainer: {
    width: 400,
    marginTop: "20px",
    overflowY: "scroll",
  },
  feedActions: {
    borderRadius: 10,
    border: "1px solid rgba(140, 140, 140, 0.2)",
    background: "white",
  },
  feedCard: {
    border: "1px solid rgba(140, 140, 140, 0.2)",
    borderRadius: 10,
    background: "white",
    marginTop: "20px",
    padding: "20px",
  },
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    gap: 20,
  },
  feedCircle: {
    height: 40,
    width: 40,
    border: "1px solid black",
    borderRadius: "100%",
  },
  feedInfo: {
    display: "flex",
    gap: 20,
  },
  feedInfoText: {
    margin: "0px",
  },
});

export const FeedClient = () => {
  const { data: feed } = useSuspenseQuery({
    queryKey: ["feed"],
    queryFn: () => getFeedData("2"),
  });
  const { data: user } = useSuspenseQuery({
    queryKey: ["user", "2"],
    queryFn: () => getUserData("2"),
  });
  return (
    <div {...stylex.props(homeStyles.pageContainer)}>
      <div>
        <Link
          href={"/profile/" + user.id}
          {...stylex.props(homeStyles.profileCard)}
        >
          <div {...stylex.props(homeStyles.profilePhoto)} />
          <div {...stylex.props(homeStyles.profileNotch)} />
          <hr {...stylex.props(homeStyles.profileDivider)} />
          <h3 {...stylex.props(homeStyles.profileName)}>{user.name}</h3>
          <p {...stylex.props(homeStyles.profileOccupation)}>
            {user.occupation}
          </p>
          <p {...stylex.props(homeStyles.profileLocation)}>
            {user.city}, {user.country}
          </p>
        </Link>
      </div>
      <div {...stylex.props(homeStyles.feedContainer)}>
        <div {...stylex.props(homeStyles.feedActions)}>
          <h1 {...stylex.props(homeStyles.feedText)}>Feed</h1>
        </div>
        {feed.map((item) => (
          <div key={item.id} {...stylex.props(homeStyles.feedCard)}>
            <hr />
            <div {...stylex.props(homeStyles.feedInfo)}>
              <div {...stylex.props(homeStyles.feedCircle)} />
              <div>
                <p {...stylex.props(homeStyles.feedInfoText)}>
                  {item.userName}
                </p>
                <p {...stylex.props(homeStyles.feedInfoText)}>{item.title}</p>
              </div>
            </div>
            <p>{item.content}</p>
            <div>
              <span>By </span>
              <Link href={"/profile/" + item.userId}>{item.userName}</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
