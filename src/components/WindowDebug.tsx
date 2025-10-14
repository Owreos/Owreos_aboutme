import { useState } from "react";
import React from "react";

export default function WindowDebug({application, instance, isActive}){
    return(
            <div style={{position: "absolute", top: "40px", width: "200px", height: "100px", color: "white"}}>
                &nbsp; ╱|、 <br />
                (`&nbsp;&nbsp;- 7 <br />
                &nbsp; |、⁻〵 <br />
                &nbsp;&nbsp;じしˍ,)ノ <br />
                app:        {application}<br />
                instance:   {instance}<br />
                isactive?:  {isActive.toString()}
            </div>
    )
}

