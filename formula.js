
// address bar is already in grid.js
let formulaBar = document.querySelector('.formula-bar');

for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur",(e)=>{
            let address = addressBar.value;
            let [activeCell,cellProp] = activecell(address);
            let enteredData = activeCell.innerText;

            if(enteredData===cellProp.value)return ;
            cellProp.value = enteredData;
            // if data modifies remove P-C relation ,formula empty , update children with new hardcpded value
            removeChildFromParent(cellProp.formula);
            cellProp.formula = "";
            updateChildrenCells(address);
            // console.log("Updated ");
            // if data modifies  remove P-C relation, formula empty and update children with new

        })

    }
}
// formula evalutaion me enter event pe kaam krna h 
formulaBar.addEventListener('keydown',async (e)=>{
    let inputFormula = formulaBar.value;
    if(e.key ==='Enter' && inputFormula){
        // let evaluatedValue = evaluateFormula(inputFormula);

        let address = addressBar.value;
        let [cell,cellProp] = activecell(address);
        if(cellProp.formula!==inputFormula)removeChildFromParent(cellProp.formula,)

        addChildToGraphComponent(inputFormula, address);
        let cycleResponse = isGraphCyclic(graphComponentMatrix);
        if(cycleResponse){
            let response = confirm('Your formula is cyclic Do you want to trace your path ?');
            while(response===true){
                await isGraphCylicTracePath(graphComponentMatrix, cycleResponse); // I want to complete full  iteration of color tracking, so I will attach wait here also
                response = confirm("Your formula is cyclic. Do you want to trace your path?");
            }
            removeChildFromGraphComponent(inputFormula, address);
            return;
        }
        // console.log("evaluatedvalue",evaluatedValue);

        let evaluatedValue = evaluateFormula(inputFormula);
        setCellUIAndCellProp(evaluatedValue,inputFormula,address);
        addChildToParent(inputFormula);
        updateChildrenCells(address);
    }
    // 
})

function addChildToGraphComponent(formula,childAddress){
    let [crid,ccid] =  decodeRIDCIDFromAddress(childAddress);
    let encodedFormula = formula.split(' ');
    for(let i=0;i<encodedFormula.length;i++){
        let ascii = encodedFormula[i].charCodeAt(0);
        if(ascii>=65 && ascii<=90){
            let [prid,pcid] = decodeRIDCIDFromAddress(encodedFormula[i]);
            // B1 : A1 +10
            graphComponentMatrix[prid][pcid].push([crid,ccid]);
        }
    }
}

function removeChildFromGraphComponent(formula,childAddress){
    let [crid, ccid] = decodeRIDCIDFromAddress(childAddress);
    let encodedFormula = formula.split(" ");

    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [prid, pcid] = decodeRIDCIDFromAddress(encodedFormula[i]);
            graphComponentMatrix[prid][pcid].pop();
        }
    } 
}

function evaluateFormula(formula){
    let encodedFormula = formula.split(' ');

    for(let i=0;i<encodedFormula.length;i++){
        let asciivalue = encodedFormula[i].charCodeAt(0);
        console.log(asciivalue);
        if(asciivalue>=65 && asciivalue<=90){
            let [cell,cellProp] = activecell(encodedFormula[i]);
            encodedFormula[i] = cellProp.value;
        }
    }
    let decodedFormula = encodedFormula.join(' ');
    return eval(decodedFormula);
    // console.log(decodedFormula);


}

function setCellUIAndCellProp(evaluatedValue,formula,address){
    let [cell,cellProp] = activecell(address);
    // UI update
    cell.innerText = evaluatedValue;
    // DB update
    cellProp.value = evaluatedValue;
    cellProp.formula = formula;
    // console.log(cellProp);
}

function addChildToParent(formula){
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(' ');
    for(let i=0;i<encodedFormula.length;i++){
        let asciivalue = encodedFormula[i].charCodeAt(0);
        if(asciivalue>=65 && asciivalue<=90){
            let [parentcell,ParentcellProp] = activecell(encodedFormula[i]);
            ParentcellProp.children.push(childAddress);
        }
    }
}

function removeChildFromParent(formula){
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(' ');
    for(let i=0;i<encodedFormula.length;i++){
        let asciivalue = encodedFormula[i].charCodeAt(0);
        if(asciivalue>=65 && asciivalue<=90){
            let [parentcell,ParentcellProp] = activecell(encodedFormula[i]);
            let idx = ParentcellProp.children.indexOf(childAddress);
            ParentcellProp.children.splice(idx,1);// it removes one element from that index
        }
    }
}

function updateChildrenCells(parentAddress){
    let [parentcell,parentCellProp] = activecell(parentAddress);
    // console.log(parentCellProp.children);
    let children = parentCellProp.children;
    for(let i=0;i<children.length;i++){
        let childAddress = children[i];
        let [childCell,childCellProp] = activecell(childAddress);
        let childFormula = childCellProp.formula;
        let evaluatedValue = evaluateFormula(childFormula);
        setCellUIAndCellProp(evaluatedValue,childFormula,childAddress);
        updateChildrenCells(childAddress);
    }
}