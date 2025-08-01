import { Link } from "react-router-dom";
import "./style/Navbar.css"; // Import the CSS file

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/admin">Home </Link>
        </li>
       
        <li>
          <Link to="/admin/pdf">Pdf file </Link>
        </li>
         <li>
          <Link to="/admin/payment-history">Payment History </Link>
        </li>
      
        <li>
          <Link to="/admin/users">Users </Link>
        </li>
         <li>
          <Link to="/admin/class-video">Class video </Link>
        </li> <li>
          <Link to="/admin/questions">Quiz questions </Link>
        </li>
        <li>
          <Link to="/">Page </Link>
        </li>



      </ul>
    </nav>
  );
};

export default Navbar;