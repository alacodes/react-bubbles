import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utilities/axiosWithAuth";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
const BubblePage = ({ history }) => {
  const [colorList, setColorList] = useState([]);

  const getColors = () => {
    axiosWithAuth()
      .get("http://localhost:5000/api/colors")
      .then(results => {
        console.log(results)
        setColorList(results.data)
      })
      .catch(error => {
        console.log("Error: ", error.response.data)
        localStorage.removeItem("token")
        history.push("/")
      })
  }
  useEffect(() => {
    getColors()
  }, [history])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} getColors={getColors} />
      <Bubbles colors={colorList} />
    </>	    
  );	  
};	

export default BubblePage;
