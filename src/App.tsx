import React , { useState } from "react"
import ApplicationIcon from "./components/ApplicationIcon.tsx"
import Window from "./components/Window.tsx"
export default function App(){
  const [windows, setWindows] = useState([]);
  const [instanceNo, setInstance] = useState(1)

  function createWindow(label) {
    setInstance(prevCount => {
      const newInstance = prevCount + 1;
      setWindows(old => [...old, { label, instance: newInstance }]);
      console.log("Created window:", label, "→ instance", newInstance);
      return newInstance;
    });
  }

  function terminateWindow(instance: number) {
    setWindows((prev) => prev.filter((w) => w.instanceNo !== instance));
  }
  
  return(
    <div
        className = "deskcont" 
        style={{
            height: "100%",
            width: "100%"
        }}>
        {windows.map(win => (
          <Window
            key={win.instance}
            application={win.label}
            instance={win.instance}
            onClick={() => terminateWindow()}
          />
        ))}
        <ApplicationIcon
          appname="info"
          icon="/assets/placeholder"
          onClick={() => createWindow("info")}
        />
        <ApplicationIcon appname="info" icon="/assets/placeholder" />
        <ApplicationIcon appname="info" icon="/assets/placeholder" />
 
    </div>
  )
}

