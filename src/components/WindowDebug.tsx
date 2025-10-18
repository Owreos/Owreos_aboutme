import { useState } from "react";
import React from "react";

export default function WindowDebug({application, instance, isActive}){
    return(
            <div style={{width: "100%", height: "100%", color: "white"}}>
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

