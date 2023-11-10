import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getUsers());
  // }, []);
  //
  const auth = useSelector((state) => state.authReducer?.authData);// user 
  // console.log("auth " + JSON.stringify(auth));

  var location = useLocation();
  if (!location) {
    location = "/dashboard";
  }
  return auth ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
