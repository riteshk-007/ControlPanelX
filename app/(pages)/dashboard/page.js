"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setIsLoggedIn(true);
    } else if (status === "unauthenticated") {
      setIsLoggedIn(false);
    }
  }, [status]);

  console.log(session);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div>
      {isLoggedIn ? (
        <>
          Logged in as {session?.user.email} with id {session?.user?.id} and{" "}
          {session?.user.isAdmin ? "is an admin" : "is not an admin"}
        </>
      ) : (
        "You are not logged in"
      )}
    </div>
  );
};

export default Dashboard;
