import { Link } from "react-router-dom";
function PageNotFound(){
    return(
        <>
        <div className="errorbox">
        <h1>404 Not Found</h1>
        <span>Your visited page not found or not allowed to visit . You may go to the home page</span>
        <div className="mt-5">
        <Link to={"/"} className="link backbtn">
            Back to home page
        </Link>
        </div>
        </div>
        </>
    )
}
export default PageNotFound;