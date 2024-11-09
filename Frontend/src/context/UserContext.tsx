import { createContext, useEffect, useState } from "react";
import { auth, provider } from "../firebaseConfig/FirebaseConfig";
import { User, UserCredential, signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/APIURL";
import axios from "axios";
import Alert from "../components/message-alerts/Alert";

type CreateUserPara = {
  name: string;
  email: string;
  uid: string;
};

type isAuthData = {
  url: string;
  method: string;
  data: {} | [] | null | string;
};

type UId = {
  uid: string;
};

export const userAuthContext = createContext({});

export const UserAuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userLoggedInRes, setUserLoggedInRes] = useState<UserCredential | null>(
    null
  );
  const [userLoading, setUserLoading] = useState<Boolean>(true);
  const [loginOpen, setLoginOpen] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const [singleUserDetails, setSingleUserDetails] = useState({});
  const [vistedUserDetails, setVistedUserDetails] = useState({});
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [alertMessage, setAlertMessage] = useState(""); // State to manage alert message
  const [showAlert, setShowAlert] = useState(false); //
  const navigate = useNavigate();

  const authenticatedRequest = async ({ url, method, data }: isAuthData) => {
    try {
      if (currentUser) {
        const token = await currentUser.getIdToken();
        const config = {
          method,
          url,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data,
        };
        return await axios(config);
      } else {
        setAlertMessage("Current user not available");
        setShowAlert(true);
      }
    } catch (err) {
      console.log(err, "authenticated request error");
    }
  };

  const createUser = async ({ name, email, uid }: CreateUserPara) => {
    setLoading(true);
    try {
      let config = {
        method: "post",
        url: `${BASE_URL}/user/createUser`,
        data: { name, email, uid },
      };
      await axios(config);

      setLoading(false);
    } catch (err) {
      console.log(err, "create user error");
    }
  };

  const singleUser = async () => {
    setLoading(true);
    try {
      const response = await authenticatedRequest({
        url: `${BASE_URL}/user/getUser`,
        method: "get",
        data: null,
      });

      if (response?.status === 200) {
        setSingleUserDetails(response?.data?.singleUser);
      }
      setLoading(false);
    } catch (err) {
      console.log(err, "singleuser error");
    }
  };

  const findUser = async ({ uid }: UId) => {
    try {
      const response = await authenticatedRequest({
        url: `${BASE_URL}/users/${uid}`,
        method: "get",
        data: null,
      });
      if (response?.status === 200) {
        setVistedUserDetails(response?.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err, "findUser error");
    }
  };

  const editUser = async (data: {}, userId: string) => {
    setLoading(true);
    try {
      let editData = data;

      const response = await authenticatedRequest({
        url: `${BASE_URL}/user/editUser/${userId}`,
        method: "patch",
        data: editData,
      });
      if (response?.status === 200) {
        setAlertMessage("user Updated Successfully");
        setShowAlert(true);
      } else {
        console.log("User Details edit error");
      }
      setLoading(false);
    } catch (err) {
      console.log("edit User Error");
    }
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      const data: UserCredential = await signInWithPopup(auth, provider);
      const { user } = data;

      if (user) {
        const { email, displayName, uid } = user;

        setUserLoggedInRes(data);
        const userData: CreateUserPara = {
          name: displayName || "",
          email: email || "",
          uid: uid || "",
        };
        await createUser(userData);

        setLoginOpen(false);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error signing in:");
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setUserLoading(false);
    });
    return unsubscribe;
  }, []);

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.log("Error while logging out: ");
    }
  };


 ;


  return (
    <userAuthContext.Provider
      value={{
        loading,
        setLoading,
        handleClick,
        currentUser,
        userLoggedInRes,
        loginOpen,
        setLoginOpen,
        userLoading,
        logOut,
        singleUser,
        editUser,
        singleUserDetails,
        setSingleUserDetails,
        authenticatedRequest,
        findUser,
        vistedUserDetails,
        setVistedUserDetails
      }}
    >
      {children}
      {showAlert && (
        <Alert message={alertMessage} onClose={() => setShowAlert(false)} />
      )}
    </userAuthContext.Provider>
  );
};
