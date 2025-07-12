
// storage structure
let graphComponentMatrix = [];
for(let i=0;i<rows;i++){
    let row =[];

    
    for(let j=0;j<cols;j++){
        row.push([]);
    }
    graphComponentMatrix.push(row);
}


// function checks whether graph contains a cycle or not using dfs algorithm
// return src node  if cycle exists else returns null
function isGraphCyclic(graphComponentMatrix){
    let visited = [];
    let pathVisited  = [];
    for(let i=0;i<rows;i++){
        let visitedrow = [];
        let pathVisitedrow = [];
        for(let j=0;j<cols;j++){
            visitedrow.push(false);
            pathVisitedrow.push(false);
        }
        visited.push(visitedrow);
        pathVisited.push(pathVisitedrow);
    }
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            if(visited[i][j]==false){
                let response = dfsCycledetection(graphComponentMatrix,i,j,visited,pathVisited);
                if(response===true){
                    return [i,j];
                }
            }
        }
    }
    return null;

}
function dfsCycledetection(graphComponentMatrix,srcr,srcc,visited,pathVisited){
    visited[srcr][srcc] = true;
    pathVisited[srcr][srcc] = true;
    // exploring all childrens of [srcr][srcc] node
    for (let children =0;children<graphComponentMatrix[srcr][srcc].length;children++){
        let[crow,ccol] = graphComponentMatrix[srcr][srcc][children];
        if(visited[crow][ccol]===false){
            let response = dfsCycledetection(graphComponentMatrix,crow,ccol,visited,pathVisited);
            if(response===true)return true;// found a cycle

        }
        else if(visited[crow][ccol]===true && pathVisited[crow][ccol]===true){
            // found cycle so return no need to explore more
            return true;
        }
    }
    visited[srcr][srcc] = false;// again marking src node as not visited
    return false;
}

