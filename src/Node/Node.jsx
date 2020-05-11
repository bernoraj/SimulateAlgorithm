import React from 'react'
import { faHome,faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Node.scss'

export default Node = (props) =>{

    const {nodeData,row,col,mouseDownHandler,mouseEnterHandler,mouseUpHandler,isWall,isStart,isEnd}=props;
    const specialClass=  isWall ? 'walled' : '';
    const icon=isStart?faHome:isEnd?faStar:faHome;
    const hideIcon={        
        visibility :'hidden'
    }
    const showIcon={       
       color:'red'     
    }
    const iconVisible=(isStart||isEnd)?showIcon:hideIcon;

    return (
        <div 
        className={`node ${specialClass}`} 
        id={`node-${row}-${col}`} 
        onMouseDown={()=>mouseDownHandler(row,col)} 
        onMouseEnter={()=>mouseEnterHandler(row,col)}
        onMouseUp={()=>mouseUpHandler()}
        >
        <FontAwesomeIcon icon={icon} style={iconVisible} />       
        </div>
    )



}