import React,{Component} from 'react'
import Node from '../Node/Node'

export default class Pathfind extends Component{

constructor(){
    super();
    this.state={
        grid:[]
    }
}

componentDidMount(){
    const Grid=initGrid();   
    this.setState({grid:Grid})
}

handlerforMouseDown(row,col){

}

render(){
 const {grid}=this.state;
    return (
        <>
        {grid.map((row,rowid)=>{
            return (
              <div key={rowid}>
              {row.map((node,nodeid)=>{
                  return(
                     <Node key={rowid+nodeid} row={rowid} col={nodeid} nodeData={node}>

                     </Node>
                  );
              })
              }
              </div>
            );
        })
        }
        </>
    );
}

}


const initGrid = () => {
   var grid=[];
   for(let row=0;row<20;row++)
   {  let gridrow=[]
       for(let column=0;column<40;column++)
       {
            let newNode=createNewNode(row,column);
            gridrow.push(newNode);
       }
       grid.push(gridrow);
   }
   console.log(grid);
   return grid;
}

const createNewNode = (row,col) =>{
    return{
        row:row,
        col:col,
        isWall:false,
        isStart:false,
        isEnd:false
    }
}