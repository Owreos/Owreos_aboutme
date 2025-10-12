import { useRef , useState } from "react"
import React from "react"

type WindowProps = {
  application: string;
  instance: number;
  onClick: (application: string, instance: number) => void;
};

export default function Window({ application, instance, onClick }: WindowProps){
    const [zIndex, setZIndex] = useState(0);
    const [size, setSize] = useState({width: 400, height: 300});
    const [position, setPosition] = useState({
        top: instance * 40 + 50,
        left: instance * 60 + 100,
    });

    const dragging = useRef(false);
    const dragStart = useRef({x: 0, y: 0});
    const initialPos = useRef({ top: 0, left: 0 });
    const initialSize = useRef({ width: 0, height: 0 });
    
    function resize(e){
        e.stopPropagation();
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
            padding: 0,
            top: position.top,
            left: position.left,
            background: "black",
            position: "absolute"
        }}>

            <div className="window-header" onMouseDown={reposition} 
            style={{
                top: 0,
                position: "absolute",
                width: size.width,
                height: "40px",
                background: "yellow",
                cursor: "move",
            }}>
            
                <div
                className="terminaten"
                onClick={() => onClick(application, instance)}>
                x
                </div>
            
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