import Products from "../Components/Products";
import { AuthContext } from "../context/UserContext";
import { useContext } from "react";
function Home(){
    const {user} = useContext(AuthContext);
    console.log(user);
    return(
        <>
        <div className="container">
            <Products/>
        </div>
        </>
    )
}
export default Home;