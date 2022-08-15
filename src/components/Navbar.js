import {Link} from "react-router-dom"
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { logout, useGetData } from "../helpers/firebase";
import Logo from "../assets/cw.jpeg";



const Navbar = () => {
 const {show,setShow,currentUser}=useContext(AuthContext)

  useEffect(() => {
    const timeout=setTimeout(()=>setShow(false),4000)

    return () => clearTimeout(timeout)
  }, [show])
  
  return (
    <nav className="navbar d-flex justify-content-between bg-primary px-4 ">
        <div className="logo-div">
            <Link to="/"  className="text-light"> <img src={Logo} alt="Logo" /></Link>
        </div>
        <div>
        <Link to="/" className='text-decoration-none'>
        <h2><i>{"<MEHMET TURKERİ />"}</i><span className='text-white'>Blog</span></h2>
        </Link>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <div className="d-flex align-items-center justify-content-center">
              {
            currentUser && <h5 className="text-dark d-flex align-items-center m-0">{currentUser.displayName}</h5>
          }
          </div>
        <div className="btnDiv d-flex align-items-center justify-content-center px-3">
          <button className="border-0 fs-1 bg-transparent d-flex align-items-center" >
          <FaUserCircle className="text-primary bg-light rounded-circle " onClick={()=>setShow(!show)}/>
        </button>
        {
          show && 
          <Modal />
        }
        </div>
        </div>
    </nav>
  );
};

// Modal eklentisi, navbar sayfasının üstünde görüntülenen bir iletişim kutusu/açılır penceredir
const Modal = () => {
  const { currentUser} = useContext(AuthContext);
  const {blogList}=useGetData()
  return (
    <div className="modalDiv rounded-3 mt-2" >
      {currentUser ? (
        <ul className="m-0 d-flex justify-content-center align-items-center flex-column p-2 ">
          <li className="list-unstyled">
            <Link to="/profile" className="text-dark text-decoration-none fw-bold">Profile</Link>{" "}
          </li>
          <li className="list-unstyled">
            <Link to="/newblog" className="text-dark text-decoration-none fw-bold">New</Link>{" "}
          </li>
          <li className="list-unstyled">
            <Link to="/about" className="text-dark text-decoration-none fw-bold">Owner</Link>{" "}
          </li>
          <li className="list-unstyled">
            <Link to="/login" className="text-dark text-decoration-none fw-bold" onClick={()=>logout(blogList)}>Logout</Link>{" "}
          </li>
        </ul>
      ) : (
        <ul className="text-center p-2 m-0">
          <li className="list-unstyled">
            <Link to="/login"className="text-dark text-decoration-none fw-bold">Login</Link>{" "}
          </li>
          <li className="list-unstyled">
            <Link to="/register" className="text-dark text-decoration-none fw-bold">Register</Link>{" "}
          </li>
          <li className="list-unstyled">
            <Link to="/about" className="text-dark text-decoration-none fw-bold">Owner</Link>{" "}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
