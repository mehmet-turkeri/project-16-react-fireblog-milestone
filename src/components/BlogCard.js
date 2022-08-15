import React from 'react'
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { useGetData } from '../helpers/firebase';
import { AuthContext } from "../contexts/AuthContext";
import { BlogContext } from "../contexts/BlogContext";


const BlogCard = () => {
  const {blogList}=useGetData()  
  return (
    <div className='row container m-auto  d-flex justify-content-center align-items-center mt-3 gap-2'>
      {
        blogList?.map((item)=>{
          return(
            <Blog item={item}/>
          )
        })
      }
    </div>
  )
}

const Blog = ({ item }) => {
  const navigate = useNavigate();
  const {currentUser}=useContext(AuthContext)
  console.log(currentUser);
  const { increaseLike} = useContext(BlogContext); 
  const { title, url, content, userName,date,like,color,usersId} = item;
  
  return (
    <div className="col-md-5 single">
      <div className="bg-light p-2 card">
        <div className="img-div">
          <img src={url ? url : "https://picsum.photos/1600/900?random=2"} alt={title} />
        </div>
        <h1 className="text-dark header text-center text-capitalize title">
          {title.length > 11 ? title.slice(0, 8) + "..." : title}
        </h1>
        <p className="text-dark fs-4">
          {date}
        </p>
        <p className="text-dark content-div">{content.slice(0, 80)}...</p>
        <h5 className="text-dark">@{userName}</h5>
        <div className="d-flex justify-content-between align-items-center">
        <div className="btnDiv d-flex justify-content-center ">
          <button
            onClick={() =>
              navigate("/details", { state: item, replace: false })
            }
            className="bg-primary border-0 text-light rounded-3 p-1"
          >
            DETAILS
          </button>
        </div>
        <div>
          <span
            className={`${!color  ? usersId.includes(currentUser.email) ? "text-danger" :"text-secondary" : "text-danger"} fs-4`}
            style={{ cursor: "pointer" }}
            onClick={() => increaseLike(item)}
          >
            <AiFillHeart />
          </span>
          <span className="text-dark fs-5"> {like}</span>
        </div>
        </div>

      </div>
    </div>
  );
};

export default BlogCard
