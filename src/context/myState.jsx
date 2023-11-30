import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import toast from "react-hot-toast";

function MyState(props) {
  const [mode, setMode] = useState("light"); // Whether dark mode is enabled or not
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };
  const [searchkey, setSearchkey] = useState("");
  const [loading, setloading] = useState(false);
  const [getAllBlog, setGetAllBlog] = useState([]);

  async function getAllBlogs() {
    setloading(true);
    try {
      const q = query(collection(fireDB, "blogPost"), orderBy("time"));
      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        let blogArray = [];
        QuerySnapshot.forEach((doc) => {
          blogArray.push({ ...doc.data(), id: doc.id });
        });

        setGetAllBlog(blogArray);
        setloading(false);
      });

      return unsubscribe; // Correct cleanup function
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  }

  // Blog Delete Function
  const deleteBlogs = async (id) => {
    try {
      await deleteDoc(doc(fireDB, "blogPost", id));
      getAllBlogs();
      toast.success("Blogs deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const unsubscribe = await getAllBlogs();
      return unsubscribe; // Correct cleanup function
    };

    fetchData();

    // No need to change the cleanup function here
  }, []); // Empty dependency array to avoid infinite loop

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        searchkey,
        setSearchkey,
        loading,
        setloading,
        getAllBlog,
        deleteBlogs,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default MyState;
