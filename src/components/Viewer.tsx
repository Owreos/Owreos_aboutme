import React from "react";
import { useState } from "react";
import ViewerTab from "./ViewerTab.tsx";
import ReactMarkdown from "react-markdown";

export default function Viewer(){
    const [tabs, setTabs] = useState([
        {id: 0, name: "textdefault", content: " to start browsing, click on info and choose a file!"},
        {id: 1, name: "test1", content: "mrppp"},
        {id: 2, name: "test2", content: "miaww"},
        {id: 3, name: "test3", content: "yes asddddddddddddddddddddddddddddddddjoisjaodosji asdijasodjasoidjoasj asiodj \n aodjosiajdiojasoij"},
    ]);
    const [activeTab, setActiveTab] = useState(0);
    const [draggedTab, setDraggedTab] = useState(null);


    function terminateTab(tabID){
        if (tabID === activeTab){setActiveTab(null);}
        setTabs(prev => prev.filter( tab => tab.id != tabID));
    }

    function fetchInfo(tabID){
        const tab = tabs.find(tab => tab.id === tabID);
        return tab ? tab.content : "";
    }

    function handleTabDrag(tabID){
        setDraggedTab(tabID);
    }

    function handleDragOver(e){
        e.preventDefault();
    }

    function handleDrop(targetID: number) {
        if (draggedTab === null || draggedTab === targetID) return;
        const original = tabs.findIndex(tab => tab.id === draggedTab);
        const target = tabs.findIndex(tab => tab.id === targetID);
        let tabsarr = [...tabs];
        const removed = tabsarr.splice(original, 1)[0];
        tabsarr.splice(target, 0, removed);
        setTabs(tabsarr);
        setDraggedTab(null);
    }

    return(
        <div className="ViewCont"
        style={{
            width: "100%",
            height: "100%",
            background: "white",
            display: "flex",
            flexDirection: "column",
        }}>
            <div className="TabBar"
            style={{
                height: "40px",
                width: "100%",
                backgroundColor: "#f3f3f3ff",
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "stretch",
                overflowX: "scroll",
            }}>
                {tabs.map(tab => (
                    <ViewerTab
                        key={tab.id}
                        filename={tab.name}
                        isActive={tab.id === activeTab}
                        onClick={() => setActiveTab(tab.id)}
                        terminateTab={() => terminateTab(tab.id)}
                        onDragStart={(e) => handleTabDrag(tab.id)}
                        onDragOver={(e) => handleDragOver(e)}
                        onDrop={(e) => handleDrop(tab.id)}
                    />
                ))}

            </div>

            <div
            style={{
                background: "white",
                border: "none",
                height: "100%",
                width: "100%",
                fontSize: "15px",
                lineHeight: "24px",
            }}>
                <ReactMarkdown>{fetchInfo(activeTab)}</ReactMarkdown>
            </div>

        </div>
    )
}