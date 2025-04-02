"use client";

import { getUserData } from "@/utils/services";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import * as stylex from "@stylexjs/stylex";

export const profileStyles = stylex.create({
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    gap: 20,
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
    padding: 20,
  },
});

export default function ProfileClient() {
  const { id } = useParams();
  const { data: user } = useSuspenseQuery({
    queryKey: ["user", String(id)],
    queryFn: () => getUserData(String(id)),
  });
  return (
    <div {...stylex.props(profileStyles.pageContainer)}>
      <div {...stylex.props(profileStyles.profileCard)}>
        <h1>Profile</h1>
        <div>
          <h2>{user.name}</h2>
          <p>
            Birthdate: <strong>{user.birthdate}</strong>
          </p>
          <p>
            Country: <strong>{user.country}</strong>
          </p>
          <p>
            City: <strong>{user.city}</strong>
          </p>
          <p>
            Gender: <strong>{user.gender}</strong>
          </p>
          <p>
            Occupation: <strong>{user.occupation}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
