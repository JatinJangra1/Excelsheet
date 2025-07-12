
// // This file includes the logic of tracing the cyclic path in graph
// // here we are using setTimeout function, await, and Promises for correct order rendering


// // function for delay and wait
// function colorPromise(){
//     return new Promise((resolve, reject) => {
//         setTimeout(()=>{
//             resolve();
//         },1000);
//     })
// }

// async function isGraphCylicTracePath(graphComponentMatrix,cycleResponse) {
//     let [srcr,srcc] = cycleResponse;
//     let visited = [];
//     let pathVisited = [];
//     for(let i=0;i<rows;i++){
//         visitedrow = [];
//         pathVisitedrow = [];
//         for(let j=0;j<cols;j++){
//             visitedrow.push(false);
//             pathVisitedrow.push(false);
//         }
//         visited.push(visitedrow);
//         pathVisited.push(pathVisitedrow);
//     }
//     let response = await dfsCycledetectionTracePath(graphComponentMatrix,srcr,srcc,visited,pathVisited);
//     if(response===true)return Promise.resolve(true);
//     return Promise.resolve(false);
// }

// async function dfsCycledetectionTracePath(graphComponentMatrix,srcr,srcc,visited,pathVisited){
//     visited[srcr][srcc] = true;
//     pathVisited[srcr][srcc] = true;
//     let cell = document.querySelector(`.cell[rid="${srcr}"][cid="${srcc}"]`);
//     cell.style.backgroundColor = "red";
//     await colorPromise(); // 1sec finished
//     for(let children =0;children<graphComponentMatrix[srcr][srcc].length;children++){
//         let [nbrr,nbrc] = graphComponentMatrix[srcr][srcc][children];
//         if(visited[nbrr][nbrc]===false){
//             let response = await dfsCycledetectionTracePath(graphComponentMatrix,nbrr,nbrc,visited,pathVisited);
//             if(response===true){
//                 cell.style.backgroundColor = "transparent";
//                 await colorPromise();

//                 return Promise.resolve(true);
//             }
//             else if(visited[nbrr][nbrc]===true && pathVisited[nbrr][nbrc]=== true){
//                 let cyclicCell = document.querySelector(`.cell[rid="${nbrr}"][cid="${nbrc}"]`);

//                 cyclicCell.style.backgroundColor = "lightsalmon";
//                 await colorPromise();
//                 cyclicCell.style.backgroundColor = "transparent";

//                 cell.style.backgroundColor = "transparent";
//                 await colorPromise();

//                 return Promise.resolve(true);
//             }

            
//         }

//     }
//     pathVisited[srcr][srcc] = false;
//     return Promise.resolve(false);
    
// }




// This file includes the logic of tracing the cyclic path in graph
// here we are using setTimeout function, await, and Promises for correct order rendering

// function for delay and wait
function colorPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

async function isGraphCylicTracePath(graphComponentMatrix, cycleResponse) {
    let [srcr, srcc] = cycleResponse;
    let visited = [];
    let pathVisited = [];

    for (let i = 0; i < rows; i++) {
        let visitedRow = [];
        let pathVisitedRow = [];
        for (let j = 0; j < cols; j++) {
            visitedRow.push(false);
            pathVisitedRow.push(false);
        }
        visited.push(visitedRow);
        pathVisited.push(pathVisitedRow);
    }

    // Array to store path of detected cycle
    let cyclePath = [];

    let response = await dfsCycledetectionTracePath(graphComponentMatrix, srcr, srcc, visited, pathVisited, cyclePath);

    if (response === true) {
        // Highlight the entire cycle path
        for (let [r, c] of cyclePath) {
            let cell = document.querySelector(`.cell[rid="${r}"][cid="${c}"]`);
            cell.style.backgroundColor = "lightsalmon";
            await colorPromise();
        }

        // Remove highlighting after delay
        for (let [r, c] of cyclePath) {
            let cell = document.querySelector(`.cell[rid="${r}"][cid="${c}"]`);
            cell.style.backgroundColor = "transparent";
            await colorPromise();
        }

        return Promise.resolve(true);
    }

    return Promise.resolve(false);
}

async function dfsCycledetectionTracePath(graphComponentMatrix, srcr, srcc, visited, pathVisited, cyclePath) {
    visited[srcr][srcc] = true;
    pathVisited[srcr][srcc] = true;

    // Add to path
    cyclePath.push([srcr, srcc]);

    let cell = document.querySelector(`.cell[rid="${srcr}"][cid="${srcc}"]`);
    cell.style.backgroundColor = "red";
    await colorPromise(); // wait 1 sec

    for (let children = 0; children < graphComponentMatrix[srcr][srcc].length; children++) {
        let [nbrr, nbrc] = graphComponentMatrix[srcr][srcc][children];

        if (!visited[nbrr][nbrc]) {
            let response = await dfsCycledetectionTracePath(graphComponentMatrix, nbrr, nbrc, visited, pathVisited, cyclePath);
            if (response === true) {
                return Promise.resolve(true);
            }
        }

        // If already visited and still in current path, cycle found
        if (visited[nbrr][nbrc] && pathVisited[nbrr][nbrc]) {
            cyclePath.push([nbrr, nbrc]); // add the repeating node to complete the cycle
            return Promise.resolve(true);
        }
    }

    // Backtrack
    pathVisited[srcr][srcc] = false;
    cyclePath.pop();
    cell.style.backgroundColor = "transparent";
    await colorPromise();

    return Promise.resolve(false);
}
