import useAuth from "../Hooks/useAuth";
import { Navigate,useLocation } from "react-router-dom";
import Home from "../Pages/Home";
function RequireAuth(){
    const location = useLocation();
    const {auth} = useAuth();
    return(
        auth?.user?<Home/>:<Navigate to={"/login"} state={{from : location}} replace/>
    );
}
export default RequireAuth;