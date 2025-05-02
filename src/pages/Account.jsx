import { React, useContext } from "react";
import UserContext from "../components/UserContext";

export default function Account() {

  const { user, logout } = useContext(UserContext);

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.username}!</h2>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Please log in to view your account.</p>
      )}
    </div>
  )
}