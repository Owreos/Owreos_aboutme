
type FileNodeProps = {
  filename: string;
  isSelected: boolean;
  onClick: () => void;
};

export default function FileNode({filename, isSelected, onClick}: FileNodeProps){
  return(
    <div className="FileNodeCont"
    onClick={onClick}
    onMouseEnter={(e) => {
      if (!isSelected) {
        e.currentTarget.style.background = "#e8f4ff";
      }
    }}

    onMouseLeave={(e) => {
      if (!isSelected) {
        e.currentTarget.style.background = "transparent";
      }
    }}

    style={{
      fontSize: "11px",
      background: isSelected? "rgba(50, 133, 216, 1)" : "transparent" ,
      color: isSelected ? "white" : "black",
      alignItems: "center",
      padding: "4px 8px",
    }}>

      📄
      <span>{filename}</span>
    </div>
  )
}


