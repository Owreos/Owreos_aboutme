import { useRef , useState } from "react"
import React from "react"

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
            width: initialSize.current.width + dx,
            height: initialSize.current.height + dy
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



    return(
        <div className="windowContainer" onClick={focus}
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
            transition: "border-color 0.2"
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
            
                <div
                className="terminaten"
                onClick={(e) => {e.stopPropagation(); onClick(instance)}}
                style={{
                    width: "30px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    background: "#ff4444",
                    borderRadius: "3px",
                    color: "#fff",
                    fontFamily: "Arial",
                    fontWeight: "bold",
                    fontSize: "15px",
                    transition: "background 0.2s",
                    padding: "auto",
                    position: "absolute",
                    right: "5px",
                    userSelect: "none",
                }}>
                x
                </div>
            </div>
            <div style={{position: "absolute", top: "40px", width: "200px", height: "100px", color: "white"}}>
            &nbsp; ╱|、 <br />
            (`&nbsp;&nbsp;- 7 <br />
            &nbsp; |、⁻〵 <br />
            &nbsp;&nbsp;じしˍ,)ノ <br />
            app:        {application}<br />
            instance:   {instance}<br />
            isactive?:  {isActive.toString()}
            </div>
            <div className="windowResizeHandler" onMouseDown={resize}
            style={{
                position: "absolute",
                width: "12px",
                height: "12px",
                right: "2px",
                bottom: "2px",
                cursor: "nwse-resize",
                background: "repeating-linear-gradient(45deg, #FFFFFF 2px, transparent 4px)",
                backgroundSize: "20px 20px"
            }}></div>
            
        </div>
    )
}