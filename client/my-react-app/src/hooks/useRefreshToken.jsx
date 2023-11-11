import { useSelector } from "react-redux";
import { axiosPrivate } from "../services/api";

export default function useRefreshToken() {
  const user = useSelector((state) => state.authReducer?.authData);
  const refresh = async () => {
    const data = {
      id: user._id,
    };

    const response = await axiosPrivate.post("/refresh", JSON.stringify(data));
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log("Refresh Token :  " + response.data.accessToken);
      return {
        ...prev,
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
}
