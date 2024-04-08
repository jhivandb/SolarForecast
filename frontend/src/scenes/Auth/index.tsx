import { useAuthContext } from "@asgardeo/auth-react";
import { redirect } from "react-router-dom";

const Unauthenticated = () => {
  const { signIn } = useAuthContext();

  return (
    <div>
      <h5>You need to be logged in to access this page</h5>
      <button
        onClick={() => {
          signIn();
          redirect("/home");
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Unauthenticated;
