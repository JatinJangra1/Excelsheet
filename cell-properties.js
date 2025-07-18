let sheetDB=[];

for(let i=0;i<rows;i++){
    let sheetRow=[];
    for(let j=0;j<cols;j++){
        let cellProp={
            bold:false,
            italic:false,
            underline:false,
            alignment:"left",
            fontFamily:"monospace",
            fontSize:"14",
            fontColor:"#000000",
            BGcolor:"#000000",
            value :"",
            formula : "",
            Children :[],
        }
        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}

//Selector for cell Properties
let bold=document.querySelector(".bold");
let italic=document.querySelector(".italic");
let underline=document.querySelector(".underline");
let fontSize=document.querySelector(".font-size-prop");
let fontFamily=document.querySelector(".font-family-prop");
let fontColor=document.querySelector(".font-color-prop");
let BGcolor=document.querySelector(".BGcolor-prop");
let alignment=document.querySelectorAll(".alignment");
let leftAlign=alignment[0];
let centerAlign=alignment[1];
let rightAlign=alignment[2];

// let addressBar=document.querySelector(".address-bar");
let activeColorProp="#d1d8e0";
let inactiveColorProp="#ecf0f1";


//Application of two way binding
//Attach properties listener
bold.addEventListener("click",(e)=>{
    let address=addressBar.value;
    let [cell,cellProp]=activecell(address);

    //Modification;
    cellProp.bold=!cellProp.bold; //Data change
    cell.style.fontWeight=cellProp.bold ?"bold":"normal"; //UI change
    bold.style.backgroundColor=cellProp.bold ?activeColorProp:inactiveColorProp;
//     bold.style.backgroundColor = cellProp.bold ? activecColorProp : inactivecColorProp;
// // do the same for italic, underline, etc.

})

italic.addEventListener("click",(e)=>{
    let address=addressBar.value;
    let [cell,cellProp]=activecell(address);

    //Modification;
    cellProp.italic=!cellProp.italic; //Data change
    cell.style.fontStyle=cellProp.italic ?"italic":"normal"; //UI change
    italic.style.backgroundColor=cellProp.italic ?activeColorProp:inactiveColorProp;
})

underline.addEventListener("click",(e)=>{
    let address=addressBar.value;
    let [cell,cellProp]=activecell(address);

    //Modification;
    cellProp.underline=!cellProp.underline; //Data change
    cell.style.textDecoration=cellProp.underline ?"underline":"none"; //UI change
    underline.style.backgroundColor=cellProp.underline ?activeColorProp:inactiveColorProp;
})

fontSize.addEventListener("change",(e)=>{
    let address=addressBar.value;
    let [cell,cellProp]=activecell(address);

    //Modification;
    cellProp.fontSize=fontSize.value //Data change
    cell.style.fontSize=cellProp.fontSize+"px" ;//I change
    fontSize.value=cellProp.fontSize;
})

fontFamily.addEventListener("change",(e)=>{
    let address=addressBar.value;
    let [cell,cellProp]=activecell(address);

    //Modification;
    cellProp.fontFamily=fontFamily.value //Data change
    cell.style.fontFamily=cellProp.fontFamily ;//I change
    fontFamily.value=cellProp.fontFamily;
})

fontColor.addEventListener("change",(e)=>{
    let address=addressBar.value;
    let [cell,cellProp]=activecell(address);

    //Modification;
    cellProp.fontColor=fontColor.value //Data change
    cell.style.color=cellProp.fontColor ;//I change
    fontColor.value=cellProp.fontColor;
})

BGcolor.addEventListener("change",(e)=>{
    let address=addressBar.value;
    let [cell,cellProp]=activecell(address);

    //Modification;
    cellProp.BGcolor=BGcolor.value //Data change
    cell.style.backgroundColor=cellProp.BGcolor ;//I change
    BGcolor.value=cellProp.BGcolor;
})

alignment.forEach((alignment)=>{
    alignment.addEventListener("click",(e)=>{
        let address=addressBar.value;
        let [cell,cellProp]=activecell(address);

        let alignValue =e.target.classList[0];
        cellProp.alignment=alignValue;//Data change
        cell.style.textAlign=cellProp.alignment;//UI  change

        switch(alignValue){
            case "left":
                leftAlign.style.backgroundColor=activeColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=activeColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=activeColorProp;
                break;        

       } 
    })
})


let allCells = document.querySelectorAll(".cell");
for (let i = 0;i < allCells.length;i++) {
    addListenerToAttachCellProperties(allCells[i]);
}

function addListenerToAttachCellProperties(cell) {
    // Work
    cell.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [rid, cid] = decodeRIDCIDFromAddress(address);
        let cellProp = sheetDB[rid][cid];

        // Apply cell Properties
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration = cellProp.underline ? "underline" : "none";
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.BGcolor === "#000000" ? "transparent" : cellProp.BGcolor;
        cell.style.textAlign = cellProp.alignment;
                

        // Apply properties UI Props container
        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
        italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
        underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
        fontColor.value = cellProp.fontColor;
        BGcolor.value = cellProp.BGcolor;
        fontSize.value = cellProp.fontSize;
        fontFamily.value = cellProp.fontFamily;
        switch(cellProp.alignment) { // UI change (2)
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }
        let formulaBar = document.querySelector('.formula-bar');
        formulaBar.value = cellProp.formula;
        cell.value = cellProp.value;
    })
}


function activecell(address){
   let[rid,cid] = decodeRIDCIDFromAddress(address);
   //Access cell and storge
   let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
   let cellProp=sheetDB[rid][cid];
   return [cell, cellProp];
}

function decodeRIDCIDFromAddress(address){
    //address -> "A1"
    let rid=Number(address.slice(1)-1);
    let cid = Number(address.charCodeAt(0))-65;
    return [rid,cid];
}
