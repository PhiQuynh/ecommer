import { createContext, useState, useEffect } from "react";
import UserApi from "./api/UserApi";
import axios from "axios";
import CategoryApi from "./api/CategoryApi";
import ProductsApi from "./api/ProductsApi";

export const GobalState = createContext();
export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  //nếu const[bien,setBien]=useState()
  //false,"",[],1,biến
  //  useEffect(() => {
  //  },[])
  useEffect(() => {
    const refreshToken = async () => {
      const res = await axios.get("/user/refresh_token");
      setToken(res.data.accessToken);
    };
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      refreshToken();
    }
  }, []);
  const state = {
    token: [token, setToken],
    ProductsApi: ProductsApi(),
    UserApi: UserApi(token),
    CategoryApi: CategoryApi(),
  };
  return <GobalState.Provider value={state}>{children}</GobalState.Provider>;
};
