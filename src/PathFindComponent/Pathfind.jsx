import React,{Component} from 'react'
import Node from '../Node/Node'
import {dijkstra, getNodesInShortestPathOrder} from '../Algo/dijkstra';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class Pathfind extends Component{

constructor(){
    super();
    this.state={
        grid:[],
        IsMousePressed: false,
        IsStartSelected:false
    }
}

componentDidMount(){
    const Grid=initGrid();   
    this.setState({grid:Grid})
}

handlerforMouseDown(row,col){
    
    const selectedGrid=this.state.grid[row][col];
    if(selectedGrid.isStart)
    {        
        this.setState({IsStartSelected:true});
    }
    else{
        const updatedGrid=SetgridWall(this.state.grid,row,col);
        this.setState({grid:updatedGrid,IsMousePressed:true});
    }
  
   
}

handlerforMouseEnter(row,col){
     
    if(this.state.IsStartSelected)
    {
        
        const updatedHomeGrid=SetStartPoint(this.state.grid,row,col);
        this.setState({grid:updatedHomeGrid})
        
    }
    
    if (!this.state.IsMousePressed) return;
    const updatedGrid=SetgridWall(this.state.grid,row,col);
    this.setState({grid:updatedGrid});
}

handlerforMouseUp(){
  
    this.setState({IsMousePressed:false,IsStartSelected:false});
}


animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
     if (i === visitedNodesInOrder.length) {
       setTimeout(() => {
         this.animateShortestPath(nodesInShortestPathOrder);
       }, 10 * i);
      return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  visualizeDijkstra() {
    const {grid} = this.state;
    let start;
    grid.map((row)=>{
        row.map((node)=>{
            if(node.isStart)
            {
                start=node;
            }
        })

    })
    console.log(start);
    const startNode = start;
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
 
  }



render(){
 const {grid}=this.state;
    return (
        <>
        <button onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button>
        <div className='grid'>      
        {grid.map((row,rowid)=>{
            return (
              <div key={rowid}>
              {row.map((node)=>{
                  const {row,col,isWall,isStart,isEnd}=node;                  
                  return(
                     <Node 
                     key={row+col} 
                     row={row} 
                     col={col} 
                     isWall={isWall} 
                     isStart={isStart}                     
                     isEnd={isEnd} 
                     mouseDownHandler={(row,col) => this.handlerforMouseDown(row,col)}
                     mouseEnterHandler={(row,col) => this.handlerforMouseEnter(row,col)}
                     mouseUpHandler={()=>this.handlerforMouseUp()}
                     >
                     </Node>
                  );
              })
              }
              </div>
            );
        })
        }
          </div>
        </>
    );
}

}


const initGrid = () => {
   var grid=[];
   for(let row=0;row<20;row++)
   {  let gridrow=[]
       for(let column=0;column<50;column++)
       {
            let newNode=createNewNode(row,column);
            gridrow.push(newNode);
       }
       grid.push(gridrow);
   }
 
   return grid;
}

const createNewNode = (row,col) =>{
    return{
        row,
        col,
        isWall:false,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,        
        isEnd:row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        previousNode: null,
    }
}

const SetgridWall = (gridInstance,row,col) =>{ 
    
    const selectedCell=gridInstance[row][col];
    if(!selectedCell.isStart)
    {
        const updatedNode={
            ...selectedCell,
            isWall:!selectedCell.isWall
        }
        gridInstance[row][col]=updatedNode;
    }
    
    return gridInstance;
}

const SetStartPoint = (gridInstance,row,col) =>{
    const selectedCell=gridInstance[row][col];
    gridInstance.map((row)=>{
        row.map((node)=>{
            node.isStart=false;
        })

    })

    if(!selectedCell.isStart)
    {
        const updatedNode={
            ...selectedCell,
            isWall:false,
            isStart:true
        }
        gridInstance[row][col]=updatedNode;
    }
    
    return gridInstance;
}