import { FC, useContext, useEffect } from "react";

import { userAuthContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

interface ProtectComponent {
  Component: FC;
}

function ProtectedRoute({ Component }: ProtectComponent) {
  const { currentUser, userLoading, setLoginOpen }: any =
    useContext(userAuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser && !userLoading) {
      setLoginOpen(true);
      navigate("/");
    }
  }, [userLoading]);

  return <div>{!userLoading && <Component />}</div>;
}

export default ProtectedRoute;
