import { useRef , useState } from "react"
import React from "react"   
import WindowDebug from "./WindowDebug.tsx";
import FileMan from "./FileMan.tsx";
import Viewer from "./Viewer.tsx";

type WindowProps = {
  application: string;
  instance: number;
  onClick: (instance: number) => void;
  onFocus: (instance: number) => void;
  isActive: boolean
};

export default function Window({ application, instance, onClick, onFocus, isActive }: WindowProps){
    const [zIndex, setZIndex] = useState(0);
    const [size, setSize] = useState({width: 400, height: 300});
    const [position, setPosition] = useState({
        top: (instance * 5 + 50) % (window.innerHeight - 300),
        left: (instance * 10 + 100) % (window.innerWidth - 400),
    });

    const dragging = useRef(false);
    const dragStart = useRef({x: 0, y: 0});
    const initialPos = useRef({ top: 0, left: 0 });
    const initialSize = useRef({ width: 0, height: 0 });
    
    function resize(e){
        e.stopPropagation();
        onFocus(instance);
        dragging.current = true;
        dragStart.current = {x: e.clientX, y:e.clientY};
        initialSize.current = {...size};
        document.addEventListener("mousemove", resOnDrag);
        document.addEventListener("mouseup", stopRes);
    }
    function resOnDrag(e){
        if (!dragging.current) return;
        const dy = e.clientY - dragStart.current.y;
        const dx = e.clientX - dragStart.current.x;

        setSize({
            width: Math.max(200, initialSize.current.width + dx),
            height: Math.max(150, initialSize.current.height + dy)
        })
    }
    function stopRes(){
        dragging.current = false;
        document.removeEventListener("mousemove", resOnDrag);
        document.removeEventListener("mouseup", stopRes);
    }
    function reposition(e){
        e.stopPropagation();
        onFocus(instance);
        dragging.current = true;
        dragStart.current = {x:e.clientX, y:e.clientY};
        initialPos.current = {...position}
        document.addEventListener("mousemove", onDrag);
        document.addEventListener("mouseup", stopDrag);
    }

    function onDrag(e){
        if (!dragging.current) return;
        const dy = e.clientY - dragStart.current.y
        const dx = e.clientX - dragStart.current.x
        setPosition({
            top: initialPos.current.top +dy,
            left: initialPos.current.left +dx
        })

    }

    function stopDrag(){
        dragging.current = false;
        document.removeEventListener("mousemove", onDrag);
        document.removeEventListener("mouseup", stopDrag);
    }

    function fetch_application(app){
        switch(app) {
            case "debug":
                console.log("returning debug")
                return <WindowDebug application={application} instance={instance} isActive={isActive}  />
            case "info":
                console.log("returning info")
                return <FileMan />
            case "viewer":
                console.log("returning viewer")
                return <Viewer />
        }
    }

    return(
        <div className="windowContainer" onClick={onFocus}
        style={{
            width: size.width,
            height: size.height,
            top: position.top,
            left: position.left,
            position: "absolute",
            background: "#1a1a1a",
            border: isActive ? "2px solid #0084ff" : "2px solid #555",
            boxShadow: isActive ? "0 0 10px rgba(0,132,255,0.3)" : "0 0 5px rgba(0,0,0,0.5)",
            zIndex: isActive? 1000 : 100,
            transition: "border-color 0.2",
            userSelect: "none",
        }}>

            <div className="window-header" onMouseDown={reposition} 
            style={{
                top: 0,
                position: "absolute",
                width: size.width,
                height: "30px",
                background: isActive ? "#0084ff" : "#444",
                cursor: "move",
                display: "flex",
                alignItems: "center",

            }}> 
                <span style={{color: "white"}}>{application}</span>
            
                <div
                className="terminaten"
                onClick={(e) => {e.stopPropagation(); onClick(instance)}}
                style={{
                    width: "25px",
                    height: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    background: "#ff4444",
                    borderBottom: "2px solid #c90a0aff",
                    borderRight: "2px solid #c90a0aff  ",
                    borderTop: "2px solid #ff4b4bff",
                    borderLeft: "2px solid #ff4b4bff",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "15px",
                    transition: "background 0.2s",
                    position: "absolute",
                    right: "5px",
                    top: "4.5px",
                    userSelect: "none",
                }}>
                x
                </div>
            </div>
            
            <div 
            style={{position: "absolute",
            top: "30px",
            height: "calc(100% - 30px)",
            width: "100%",
            overflow: "scroll" }}>
                {fetch_application(application)}
            </div>
            
            <div className="windowResizeHandler" onMouseDown={resize}
            style={{
                position: "absolute",
                width: "12px",
                height: "12px",
                right: "2px",
                bottom: "2px",
                cursor: "nwse-resize",
                background: isActive? "linear-gradient(135deg, #0084ff 50%, transparent 50%)" : "linear-gradient(135deg, #555 50%, transparent 50%)" ,
                backgroundSize: "20px 20px"
            }}></div>
            
        </div>
    )
}