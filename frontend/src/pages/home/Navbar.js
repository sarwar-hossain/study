import { Link } from "react-router-dom";
import "./../../pagescss/Navbar.css";
//import UserProfile from "../Database/UserProfile";

const Navbar = () => {

  const phone = true, userName = "s";


  // const { phone, userName } = UserProfile();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <img src="/logo.png" alt="Study Logo" />
          </Link>
        </li>

        {phone ? (
          <li>
            <Link to="/profile">{userName.charAt(0).toUpperCase()}</Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;