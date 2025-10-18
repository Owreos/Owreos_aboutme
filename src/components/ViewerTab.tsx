import { useState, useRef } from "react"
type FileNodeProps = {
    filename: string;  
    isActive: boolean;
    onClick: () => void;
    terminateTab: () => void;
    onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
    onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
};

export default function ViewerTab({filename, isActive, onClick, terminateTab, onDragStart, onDragOver, onDrop}: FileNodeProps){
    const dragStart = useRef({x: 0, y: 0})
    const [isHover, setHover]= useState(false)
    


    return(
        <div
        className="TabContainer"
        draggable="true"
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        style={{
            flex: "1 1 0",
            minWidth: "300px", 
            flexDirection: "row",
            height: "35px",
            width: "100%",
            borderRadius: "5px 5px 0px 0px",
            background: isActive? "white": "transparent",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
            marginBottom: "0",

        }}>
            <div
                className="tabpill"
                onClick={onClick}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                height: "28px",
                width: "96%",
                borderRadius: "5px",
                background: isActive? "white"
                : isHover? "#e0e0e0ff": "transparent",
                transition: "background 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 6px",
                marginTop: "3px",
                position: "relative",
                color: "#3c3c3cff",

                }}>
                {filename}
                {!isActive && (
                    <span style={{
                        position: "absolute",
                        right: "0",
                        top: "3px",
                        bottom: "3px",
                        width: "1px",
                        backgroundColor: "#c4c4c4ff",
                    }} />
                )}

                <div 
                onClick={terminateTab}
                style={{
                    height:"24px", 
                    width: "24px", 
                    position: "absolute", 
                    right: "5px", 
                    display: "flex", 
                    textAlign: "center",
                    color: "#c4c4c4ff",
                    }}>
                        &#91;x&#93;
                    </div>
            </div>
        </div>
    )
}


