import React from 'react'

export default Node = (props) =>{

    const {nodeData,row,col}=props;
    return (
        <div className='Node' id={`node-${row}-${col}`}>

        </div>
    )



}