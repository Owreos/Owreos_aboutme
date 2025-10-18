import { useState } from "react";
import React from "react";
import FileNode from "./FileNode.tsx";
import PathCats from "./PathCats.tsx";


export default function FileMan(){
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  return(
    <div className="FilemanCont"
    style={{
      height: "100%",
      width: "100%",
      padding: "0",
      margin: "0",
      display: "flex",
      flexDirection: "column",
      background: "white",
      fontFamily: "Segoe UI, Tahoma, sans-serif",
      userSelect: "none",
    }}>
      <div className="menubar"
      style={{
        height: "24px",
        width: "100%",
        background: "white",
        borderBottom: "1px solid #d4d4d4",
        display: "flex",
        flexDirection: "row",
        fontSize: "11px",
        alignItems: "center",
      }}>
        <span style={{ padding: "0 8px", cursor: "default" }}>File</span>
        <span style={{ padding: "0 8px", cursor: "default" }}>Edit</span>
        <span style={{ padding: "0 8px", cursor: "default" }}>View</span>
        <span style={{ padding: "0 8px", cursor: "default" }}>Tools</span>
        <span style={{ padding: "0 8px", cursor: "default" }}>Help</span>
      </div>
      <div className="address" style={{
        height: "28px",
        background: "#f0f0f0",
        borderBottom: "1px solid #d4d4d4",
        display: "flex",
        alignItems: "center",
        paddingLeft: "6px",
        gap: "6px",
      }}>
        <span style={{fontSize: "11px", color: "#666"}}>address: </span>
        <input
          type="text"
          value="C:\Users\Desktop"
          readOnly
          style={{
            height: "20px",
            width: "40%",
            padding: "0 4px",
            border: "1px solid #adadad",
            background: "white",
            fontSize: "11px",
          }}/>
      </div>
      <div className="MainContent" 
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flex: "column"
      }}>
          <div className="SideBar" 
          style={{
            height: "100%",
            width: "150px",
            borderRight: "1px solid #adadad",
            overflowY: "auto",
            fontSize: "10px"
          }}>
            <div
            style={{
                padding: "6px 12px",
                cursor: "pointer",
                fontWeight: "bold",
                color: "#0066cc",
              }}
            >
              Quick Access
            </div>
            <PathCats catname="Home"/>
            <PathCats catname="Documents"/>
            <PathCats catname="Downloads"/>
            <PathCats catname="This PC"/>
          </div>
            

        <div className="files"
        style={{
          width: "100%",
          height: "100%",

        }}>
          <FileNode filename="aboutme.txt" isSelected={selectedFile==="Aboutme"} onClick={() => setSelectedFile("Aboutme")} />
          <FileNode filename="socials.txt" isSelected={selectedFile==="Socials"} onClick={() => setSelectedFile("Socials")} />
          <FileNode filename="projects.txt" isSelected={selectedFile==="Projects"} onClick={() => setSelectedFile("Projects")} />
          <FileNode filename="art" isSelected={selectedFile==="Art"} onClick={() => setSelectedFile("Art")} />
        </div>
      </div>
    </div>
  )
}

