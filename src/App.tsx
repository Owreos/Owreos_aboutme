import React , { useState } from "react"
import ApplicationIcon from "./components/ApplicationIcon.tsx"
import Window from "./components/Window.tsx"
export default function App(){
  const [windows, setWindows] = useState([]);
  const [instanceNo, setInstance] = useState(0);
  const [activeWindow, setActiveWindow] = useState(null);


  function createWindow(label) {
    const newInstance = instanceNo + 1;
    setInstance(newInstance);
    setWindows((previous) => [...previous, { label, instance: newInstance }]);
    setActiveWindow(newInstance);
  }

  function terminateWindow(instance){
    if (activeWindow === instance){setActiveWindow(null);}
    setWindows((prev) => prev.filter((w) => w.instance !== instance));
  }
  function newTab(tabname, tabcontent){
    
  }
  
  
  return(
    <div
        className = "deskcont" 
        style={{
            height: "100vh",
            width: "100vw",
            background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "60px",
            fontFamily: "Segoe UI, Tahoma, sans-serif",
        }}>
        {windows.map(win => (
          <Window
            key={win.instance}
            application={win.label}
            instance={win.instance}
            onClick={(instance) => terminateWindow(instance)}
            onFocus={() => setActiveWindow(win.instance)}
            isActive={activeWindow === win.instance}
          />
        ))}
        <div className="AppTray"
        style={{
          height: "100px",
          width: "80%",
          background: "rgba(81, 81, 81, 0.3)",
          display: "flex",
          flexDirection: "row",
          gap: "40px",
          borderRadius: "20px",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: "10px",
        }}>
          <ApplicationIcon    
            name="Debug"
            iconsrc="/assets/placeholder.png"
            onClick={() => createWindow("debug")} />
          <ApplicationIcon
            name="Info"
            iconsrc="/assets/placeholder.png"
            onClick={() => createWindow("info")} />
          <ApplicationIcon
            name="TextEditor"
            iconsrc="/assets/placeholder.png"
            onClick={() => createWindow("viewer")} />
        </div>
    </div>
  )
}

