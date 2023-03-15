// const gameBoard = (()=> {
//     const gameGrid = document.querySelectorAll(".square")
    
//     let gridArray = []
//     const addToGridArray = (playerToken, gridId) => 
//     {
        
//     }
    
//     const updateGameBoard = () => 
//     {

//     } 
// })()

// const Player = (playToken, playerName)=>{

// }

let gridArray = [null,null,null,null,null,null,null,null,null]

addGlobalEventListener("click", ".square", e=> addIconToBoard(e));

function addGlobalEventListener(type,selector,callback){
    document.addEventListener(type, e=>{
    if (e.target.matches(selector)) callback(e);
    })
};


function addIconToBoard(e){
    e.target.innerText = "O"
    gridArray.splice(parseInt(e.target.id),1, "O")
    console.log(gridArray)
}

function determineWinner(){
    if (gridArray[0]===gridArray[1]&&gridArray[1]===gridArray[2]){
        console.log("winner")
    }    
}

