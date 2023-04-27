import React from "react";
import { getAuth } from "firebase/auth";

const UserStatus = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const auth = getAuth(); // Get the auth instance
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      {user ? (
        <div>
          Signed in as {user.displayName || user.email}
          <button onClick={() => getAuth().signOut()}>Sign Out</button>
        </div>
      ) : (
        <div>Please sign in</div>
      )}
    </div>
  );
};

export default UserStatus;
