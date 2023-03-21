addGlobalEventListener("click", "#reset", e=> gameController.gameReset(e));
addGlobalEventListener("click", "#modal-reset", e=> gameController.gameReset(e));
addGlobalEventListener("click", ".square", e=> gameController.turnController(e))
addGlobalEventListener("click", "#reset-score", e=> gameController.resetScore())


const gameController = (()=>{
    const winModal = document.querySelector("#win-screen")
    const winModalMessage = document.querySelector("#win-message")
    const player1Score = document.querySelector("#player1score")
    const player2Score = document.querySelector("#player2score")
    let whosTurn = 1
    let totalTurns = 0
    let winner = false
    

    const turnController = (e)=> {
        if (whosTurn===1){
            if (gameBoard.checkSquare(e)) return
            player1.addIcon(e)
            checkForWinner()
            checkTie()
            whosTurn += 1
            totalTurns +=1
            console.log(whosTurn)
            return
        }
        if (whosTurn===2){
            if (gameBoard.checkSquare(e)) return
            player2.addIcon(e)
            checkForWinner()
            checkTie()
            whosTurn -= 1
            totalTurns +=1
            console.log(whosTurn)
            return
        }
    }
    const declareWinner = (a,b,c) => 
    {   
        let score1 = parseInt(player1Score.innerText)
        let score2 = parseInt(player2Score.innerText)
        const gridArray = gameBoard.returnGridArray()
        if (gridArray[a]===null&&gridArray[b]===null&&gridArray[c]===null) return
        if (gridArray[a]===gridArray[b]&&gridArray[b]===gridArray[c]){
            winner = true
            winModal.showModal()
            console.log(`The Winner is Player ${whosTurn}`)
            winModalMessage.innerText = `The Winner is Player ${whosTurn}`
            if (whosTurn === 1){
                score1 += 1
                player1Score.innerText = `${score1}`
            } else {
                score2 += 1
                player2Score.innerText = `${score2}`
            }

        }
        
    }

    const checkTie = () => 
    {
        if (totalTurns === 8 && winner === false){
            winModal.showModal()
            console.log(`It Is a Tied Game!`)
            winModalMessage.innerText = `It Is a Tied Game!`
        }
    }

    const checkForWinner = () =>
    {
        declareWinner(0,3,6)
        declareWinner(0,1,2)
        declareWinner(0,4,8)
        declareWinner(1,4,7)
        declareWinner(2,5,8)
        declareWinner(2,4,6)
        declareWinner(3,4,5)
        declareWinner(6,7,8)
    }

    const gameReset = (e) =>
    {
        gameBoard.resetBoard(e)
        winModal.close()
        whosTurn = 1
        totalTurns = 0
        winner = false
    }

    const resetScore = (e) => {
        player1Score.innerText="0"
        score1 = 0
        player2Score.innerText="0"
        score1 = 0
        gameReset(e)
    }

    return {
        turnController,
        gameReset,
        resetScore,
        winner
    }
})()

const gameBoard = (()=> {
    const gameGrid = document.querySelectorAll(".square")
    let gridArray = [null,null,null,null,null,null,null,null,null]

    const resetBoard = (e)=> {
        gridArray = [null,null,null,null,null,null,null,null,null]
        gameGrid.forEach(square => square.innerText ="")

    }

    const updateBoard = () => {
        gameGrid.forEach(square=> {
            if (square.innerText === "")return 
            
            gridArray.splice(parseInt(square.id),1, square.innerText)
            console.log(gridArray)
        })
    }

    const returnGridArray = () =>
    {
        return gridArray
    }
    
    const checkSquare = (e) =>
    {
        if (e.target.innerText !==""){
            console.log(`there is already an ${e.target.innerText}`)
            return true
        }
    }

    return {
        resetBoard,
        updateBoard,
        returnGridArray,
        checkSquare
    }
   
})();

const Player = (playerIcon)=>{
    const addIcon = (e) => {
        e.target.innerText = playerIcon
        gameBoard.updateBoard()
    } 

    return {
        addIcon
    }
}

const player1 = Player("X")
const player2 = Player("O")




function addGlobalEventListener(type,selector,callback){
    document.addEventListener(type, e=>{
    if (e.target.matches(selector)) callback(e);
    })
};


