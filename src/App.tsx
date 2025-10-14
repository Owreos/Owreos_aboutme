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

  const terminateWindow = (instance) => {
    setWindows((prev) => prev.filter((w) => w.instance !== instance));
    if (activeWindow === instance){
      setActiveWindow(null);
    }
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
        <ApplicationIcon
          name="info"
          iconsrc="/assets/placeholder.png"
          onClick={() => createWindow("debug")} />
        <ApplicationIcon name="info" iconsrc="/assets/placeholder.png" />
        <ApplicationIcon name="info" iconsrc="/assets/placeholder.png" />
 
    </div>
  )
}

