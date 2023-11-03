import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { getUsers } from "../redux/actions/AuthAction";

const RequireAuth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const auth = useSelector((state) => state.authReducer?.authData);
  // console.log("auth " + JSON.stringify(auth));

  const location = useLocation();
  return auth ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
