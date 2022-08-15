import { ref, update } from "firebase/database";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { db} from "../helpers/firebase";
import { toastErrorNotify } from "../helpers/ToastNotify";
import { AuthContext } from "./AuthContext";

export const BlogContext = createContext();

const BlogContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  const initialValues = {
    title: "",
    url: "",
    content: "",
    userName: "",
    like: 0,
    date:new Date().toLocaleDateString("tr-TR"),
    usersId:[""],
    color:false
  };
  const [blog, setBlog] = useState(initialValues);

  const increaseLike = (blog) => {
  
    if(currentUser){
      if(!Object.values(blog.usersId).includes(currentUser.email)){
        console.log(Object.values(blog.usersId));
       
      const updates={}
      updates["blogs/"+blog.id]={
          ...blog,
          like: blog.like + 1,
          color:true,
          usersId:[...blog.usersId,currentUser.email]
        }
      return update(ref(db),updates)
      }
      else{       
        const updates={}
        updates["blogs/"+blog.id]={
            ...blog,
            like: blog.like - 1,
            color:false,            
            usersId:[(blog.usersId).filter((item)=>item!==currentUser.email)]
          }
          return update(ref(db),updates)
      }
    }
    else{
      toastErrorNotify("Lütfen önce giriş yapınız!");
    }      
      }    

  const editBlog = (blog) => {  
    setBlog({...blog, id:blog.id, title:blog.title, url:blog.url, content:blog.content});  
  };

  return (
    <BlogContext.Provider value={{ blog, setBlog, initialValues, editBlog,blog,increaseLike}}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;