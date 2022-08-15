import { initializeApp } from "firebase/app";
import {getDatabase, onValue, push, ref, remove, set, update} from "firebase/database"
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toastErrorNotify, toastSuccessNotify } from "./ToastNotify";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  databaseURL: process.env.REACT_APP_databaseURL
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// yeni bir kullanıcı oluştur
const auth = getAuth(app);

export const createUser= async(email,password,navigate,displayName)=>{
    try{
        let userCredential=await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser,{
            displayName: displayName
        });       
        toastSuccessNotify("Başarıyla kaydedildi!");
        navigate("/");
    }
    catch(error){
        toastErrorNotify(error.message);
       
    }
}

 //kullanici girisi
export const signIn = async(email,password,navigate)=>{
    
    try{
        let userCredential=await signInWithEmailAndPassword(auth, email, password)
        navigate("/");      
        toastSuccessNotify("Başarıyla oturum açıldı!");
      }catch(error){
        toastErrorNotify(error.message);
      }
}

//çift kaydı önlemek için
export const userObserver = (setCurrentUser)=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setCurrentUser(user)
        } else {
            setCurrentUser(false)
        }
      });
}

//çıkış yapmak için
export const logout = (bloglist)=>{
    signOut(auth)
    toastSuccessNotify("Oturum başarıyla kapatıldı!");
    bloglist.map((item)=>updateColor(item));
}

const updateColor = (blog)=>{
  const db = getDatabase(app);
  const updates={}
  updates["blogs/"+blog.id]={...blog,color:false}
  return update(ref(db),updates)
}

//Google hesabi ile giris 
export const signUpProvider = (navigate)=>{
    const provider = new GoogleAuthProvider();

signInWithPopup(auth, provider)
  .then((result) => {
    console.log(result);
    toastSuccessNotify("Başarıyla oturum açıldı!");
    navigate("/");
  }).catch((error) => {
    toastErrorNotify(error.message);
  });
}

/*--------------DATABASE-------------- */

export const db = getDatabase(app);

// Veri Ekle
export const addBlog=(blog,currentUser)=>{
    const blogRef=ref(db,"blogs/")
    const newBlogRef=push(blogRef);
    set(newBlogRef,{
        title:blog.title,
        url:blog.url,
        content:blog.content,
        userName:currentUser.displayName,
        like:blog.like,
        date:blog.date,
        usersId:blog.usersId,
        color:blog.color
    })
}

//Veri Al
export const useGetData=()=>{
  const [blogList,setBlogList]=useState()
  useEffect(() => {
      const db = getDatabase(app);
      const blogRef=ref(db,"blogs/")
onValue(blogRef, (snapshot) => {
const data = snapshot.val();
const blogArray=[]

for(let id in data)
blogArray.push(
  {id, ...data[id]}
)
setBlogList(blogArray)
});
  }, [])
  return {blogList}
}

//Sil
export const deleteBlog = (id)=>{
  const db = getDatabase(app);
  const blogRef=ref(db,"blogs/");
  remove(ref(db,"blogs/"+id))
  toastSuccessNotify("Kayıt Başarıyla silindi!");
}

//Düzenle
export const updateBlog=(blog)=>{
  const db = getDatabase(app);
  const updates={}
  updates["blogs/"+blog.id]=blog
  toastSuccessNotify("Kayıt Başarıyla Güncellendi!");
  return update(ref(db),updates)
}