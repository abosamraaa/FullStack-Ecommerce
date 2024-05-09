import { Outlet,Navigate} from "react-router-dom";
const PrivateRoute = ()=>{
    
    const userRole = sessionStorage.getItem('role');
    const isAdmin = userRole && userRole.toLowerCase() === "admin";
    if(!isAdmin){
        return <Navigate to={"/404"}/>
    }
    return <Outlet/>
}
export default PrivateRoute;