const BOARD_ID = 'board'
const PIECE_ID = 'piece'

/* Htlm code for decimals 1-6 */
const DICE_FACES = [
	'',
	'&#9856',
	'&#9857',
	'&#9858',
	'&#9859',
	'&#9860',
	'&#9861',
]
const MOVE_INTERVAL_LENGTH = 200

/* Assuption: No ending point will be the starting point of other */
const SNAKES_AND_LADDER_POSITION = [
	[7, 14],
	[9, 31],
	[21, 40],
	[34, 65],
	[35, 4],
	[44, 1],
	[53, 13],
	[60, 78],
	[69, 93],
	[80, 42],
	[85, 58],
	[86, 68],
	[91, 70],
	[98, 36],
]

var boardElement = document.getElementById(BOARD_ID)
var pieceElement = `<img id='${PIECE_ID}' class='img' src='./assets/trooper.png'></img>`
var diceElement = document.getElementById('dice')
var playBtnElement = document.getElementById('Play')

var currentPosition = 1
var currentDiceRoleNumber = 0
var interval = null
var currentTurnLastNumber = 0

const getBoardBoxHTML = (boardNumber, direction = 'left') =>
	`<div class="boardbox ${direction}" id="box-${boardNumber}" />`

const getBoardBoxElement = (boardNumber) =>
	document.getElementById(`box-${boardNumber}`)


/* Function to make board*/
const makeBoard = () => {
	let boardNumber = 100
	let rows = 5
	while (rows--) {
		let boxLeft = 10
		while (boxLeft--)
			boardElement.innerHTML += getBoardBoxHTML(boardNumber--, 'left')
		let boxRight = 10
		while (boxRight--)
			boardElement.innerHTML += getBoardBoxHTML(boardNumber--, 'right')
	}

	getBoardBoxElement(1).innerHTML = pieceElement
}


/* On clicking makeboard function will be executed*/
const onPlayBtnClick = () => {
	makeBoard()
	diceElement.style.visibility = 'visible'
	diceElement.disabled = false
	playBtnElement.style.visibility = 'hidden'
	diceElement.innerHTML = DICE_FACES[1]
}

const onDiceClick = () => {
	currentDiceRoleNumber = Math.ceil(Math.random() * 6)
	diceElement.innerHTML = DICE_FACES[currentDiceRoleNumber]
	if (currentPosition + currentDiceRoleNumber > 100) {
		currentDiceRoleNumber = 0
		return
	}
	makeMoves()
}

const makeMoves = () => {
	diceElement.disabled = true
	currentTurnLastNumber = currentPosition + currentDiceRoleNumber
	interval = setInterval(onEachMove, MOVE_INTERVAL_LENGTH)
}

const onEachMove = () => {
	currentPosition++

	if (currentPosition === currentTurnLastNumber) {
		SNAKES_AND_LADDER_POSITION.forEach(([start, end]) => {
			if (currentPosition === start) currentPosition = end
		})
		clearInterval(interval)
		diceElement.disabled = false
	}
	var piece = document.getElementById(PIECE_ID)
	getBoardBoxElement(currentPosition).appendChild(piece)
	if (currentPosition === 100) {
		alert('You win')
	}
}
