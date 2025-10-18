import React from "react"

export default function PathCats({catname}){
  return(
    <div style={{ 
      height: "30px", 
      width: "100%", 
      cursor: "pointer", 
      padding: "0px 12px",
      }}>
        &gt; {catname}
    </div>)
}