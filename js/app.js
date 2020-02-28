// 26/02/2020 TOTO
// add ghost movement logic
// create coord boundaries for ghosts
// if pacman is in their boundary start the pathfinding algorithm
// otherwise move around randomly within boundary

class Player {
  constructor(name) {
    this.name = name;
    this.points = 0;
  }
  get name() {
    return this._name;
  }
  set name(newName) {
    this._name = newName;
  }

  get points() {
    return this._points;
  }
  set points(newPoints) {
    this._points = newPoints;
  }
  addPoint(pointAmount) {
    this.points += pointAmount;
  }
}

class Gameboard {
  constructor(dims) {
    this.dims = dims;
    this.gameBoardElement = document.querySelector('#game-board');
    this.walls = [];
    this.center = [Math.floor(dims / 2), Math.floor(dims / 2)];
    this.level1();
  }
  outerWalls() {
    const newWalls = []
    for (let i = 0; i < this.dims; i++) {
      for (let j = 0; j < this.dims; j++) {
        if (i === 0 || i === this.dims - 1) {
          newWalls.push([i, j]);
        } else if (j === 0 || j === this.dims - 1) {
          newWalls.push([i, j]);
        }
      }
    }
    return newWalls;
  }

  createBoard() {
    this.level1();
    for (let i = 0; i < this.dims; i++) {
      const newRow = document.createElement('div');
      newRow.classList.add('row');
      for (let j = 0; j < this.dims; j++) {
        const newGrid = document.createElement('div');
        // newGrid.addEventListener('click', () => {
        //   this.walls.push([i, j])
        //   newGrid.classList.toggle('wall');
        //   console.log([j, i])
        //   console.log(this.walls.join('],['));
        // })
        if (checkArrayContains(this.walls, [j, i])) {
          newGrid.classList.add('wall');
        } else {
          newGrid.classList.add('point');
        }
        newGrid.classList.add('grid');
        newGrid.setAttribute('x', j);
        newGrid.setAttribute('y', i);
        newRow.append(newGrid);
      }
      this.gameBoardElement.append(newRow);
    }
  }

  drawBlock(coord, dimension) {
    const xCoord = coord[0];
    const yCoord = coord[1];

    for (let i = yCoord; i < yCoord + dimension; i++) {
      for (let j = xCoord; j < xCoord + dimension; j++) {
        this.walls.push([j, i]);
      }
    }
  }

  level1() {
    const wallsArray = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [0, 10], [0, 11], [0, 12], [0, 13], [0, 14], [0, 15], [0, 16], [0, 17], [0, 18], [0, 19], [0, 20], [0, 21], [0, 22], [1, 0], [1, 22], [2, 0], [2, 22], [3, 0], [3, 22], [4, 0], [4, 22], [5, 0], [5, 22], [6, 0], [6, 22], [7, 0], [7, 22], [8, 0], [8, 22], [9, 0], [9, 22], [10, 0], [10, 22], [11, 0], [11, 22], [12, 0], [12, 22], [13, 0], [13, 22], [14, 0], [14, 22], [15, 0], [15, 22], [16, 0], [16, 22], [17, 0], [17, 22], [18, 0], [18, 22], [19, 0], [19, 22], [20, 0], [20, 22], [21, 0], [21, 22], [22, 0], [22, 1], [22, 2], [22, 3], [22, 4], [22, 5], [22, 6], [22, 7], [22, 8], [22, 9], [22, 10], [22, 11], [22, 12], [22, 13], [22, 14], [22, 15], [22, 16], [22, 17], [22, 18], [22, 19], [22, 20], [22, 21], [22, 22], [2, 9], [2, 8], [2, 7], [3, 9], [4, 9], [7, 9], [8, 9], [9, 9], [9, 8], [9, 7], [9, 4], [9, 3], [9, 2], [8, 2], [7, 2], [4, 2], [3, 2], [2, 2], [2, 3], [2, 4], [4, 4], [4, 5], [4, 6], [4, 7], [7, 4], [7, 5], [7, 6], [7, 7], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11], [14, 11], [15, 11], [16, 11], [17, 11], [18, 11], [19, 11], [20, 11], [11, 2], [11, 3], [11, 4], [11, 5], [11, 6], [11, 7], [11, 8], [11, 9], [11, 10], [11, 12], [11, 13], [11, 14], [11, 15], [11, 16], [11, 17], [11, 18], [11, 19], [11, 20], [7, 13], [8, 13], [9, 13], [9, 14], [9, 15], [9, 18], [9, 19], [9, 20], [8, 20], [7, 20], [4, 20], [3, 20], [2, 20], [2, 19], [2, 18], [2, 13], [3, 13], [4, 13], [2, 14], [2, 15], [4, 15], [4, 16], [4, 17], [4, 18], [7, 18], [7, 17], [7, 16], [7, 15], [13, 13], [14, 13], [15, 13], [13, 14], [13, 15], [13, 18], [13, 19], [13, 20], [14, 20], [15, 20], [18, 20], [19, 20], [20, 20], [20, 19], [20, 18], [20, 15], [20, 14], [20, 13], [19, 13], [18, 13], [15, 15], [15, 15], [15, 15], [15, 16], [15, 18], [15, 17], [18, 18], [18, 17], [18, 16], [18, 15], [13, 9], [13, 8], [13, 7], [14, 9], [15, 9], [18, 9], [19, 9], [20, 9], [20, 8], [20, 7], [20, 4], [20, 3], [20, 2], [19, 2], [18, 2], [15, 2], [14, 2], [13, 2], [13, 3], [13, 4], [15, 4], [15, 5], [15, 6], [15, 7], [18, 7], [18, 6], [18, 5], [18, 4]];
    wallsArray.forEach((element) => {
      this.walls.push(element);
    })
  }

  get gameBoardElement() {
    return this._gameBoardElement;
  }
  set gameBoardElement(newEle) {
    this._gameBoardElement = newEle;
  }
  get dims() {
    return this._dims;
  }
  set dims(newDims) {
    this._dims = newDims;
  }
  getCenter() {
    return this.center;
  }
}

class Entity {
  constructor(gameBoard, spawnPoint, direction) {
    this.gameBoard = gameBoard;
    this.spawnPoint = spawnPoint;
    this.direction = direction;
    this.currentCoord = spawnPoint;
    this.intervalId = 0;
  }
  get currentCoord() {
    return this._currentCoord;
  }
  set currentCoord(newCoord) {
    this._currentCoord = newCoord;
  }
  get intervalId() {
    return this._intervalId;
  }
  set intervalId(newID) {
    this._intervalId = newID;
  }
}

class Pacman extends Entity {
  constructor(spawnPoint, direction, player) {
    super(spawnPoint, direction);
    this.player = player;
    this.direction = window.addEventListener('keypress', (event) => {
      switch (event.key) {
        case 'w':
          this.direction = 0;
          break;
        case 'd':
          this.direction = 1;
          break;
        case 's':
          this.direction = 2;
          break;
        case 'a':
          this.direction = 3;
          break;
      }
    });
  }
  spawn() {
    const thisDiv = getDivFromCoord(this.spawnPoint);
    thisDiv.classList.add('pacman');
    clearInterval(super.intervalId);
  }

  move() {
    console.log(this.player)
    const oldCoord = [];
    oldCoord.push(this.currentCoord[0], this.currentCoord[1]);
    switch (this.direction) {
      case 0:
        this.currentCoord[1] = this.currentCoord[1] - 1;
        break;
      case 1:
        this.currentCoord[0] = this.currentCoord[0] + 1;
        break;
      case 2:
        this.currentCoord[1] = this.currentCoord[1] + 1;
        break;
      case 3:
        this.currentCoord[0] = this.currentCoord[0] - 1;
        break;
    }
    let newDiv = getDivFromCoord(this.currentCoord);
    if (newDiv === undefined) {
      switch (oldCoord[0]) {
        case 0:
          this.currentCoord[0] = this.gameBoard.dims - 2;
          break;
        case this.gameBoard.dims - 1:
          this.currentCoord[0] = 0;
          break;
      }
      newDiv = getDivFromCoord(this.currentCoord);
    } else if (newDiv.classList.contains('wall')) {
      this.currentCoord = oldCoord;
      newDiv = getDivFromCoord(this.currentCoord);
    } else if (newDiv.classList.contains('point')) {
      newDiv.classList.remove('point');
      this.player.addPoint(1);
      // console.log(this.player.points);
    }
    if (newDiv.classList.contains('ghost')) {
      return 1;
    } 
    if (document.querySelectorAll('.point').length === 0) {
      winGame(this.player);
    }
    const oldDiv = getDivFromCoord(oldCoord);
    this.redraw(oldDiv, newDiv);
  }

  redraw(oldDiv, newDiv) {
    oldDiv.classList.remove('pacman');
    newDiv.classList.add('pacman');
  }

  get currentCoord() {
    return this._currentCoord;
  }
  set currentCoord(newCoord) {
    this._currentCoord = newCoord;
  }
}


class Ghost extends Entity {
  constructor(spawnPoint, direction, territory) {
    super(spawnPoint, direction);
    this.routeToPacman = [];
    this.boundaries = 11;
    this.territory = territory;
    this.mode = 'relax';
    this.pacmanInterval = 0;
    //greater than 11 or less than 11

  }
  set routeToPacman(route) {
    this._routeToPacman = route;
  }

  get routeToPacman() {
    return this._routeToPacman;
  }

  get pacmanInterval() {
    return this._pacmanInterval;
  }

  set pacmanInterval(newID) {
    this._pacmanInterval = newID;
  }

  get mode() {
    return this._mode;
  }

  set mode(newMode) {
    this._mode = newMode;
  }

  toggleMode() {
    if (this.mode === 'relax') {
      this.mode = 'chase';
    } else if (this.mode === 'chase') {
      this.mode = 'relax';
    }
  }

  spawn() {
    const thisDiv = getDivFromCoord(this.spawnPoint);
    thisDiv.classList.add('ghost');
  }

  formPath(cameFrom, current) {
    const totalPath = [current];
    cameFrom = Object.entries(cameFrom);
    for (let i = 0; i < Object.entries(cameFrom).length - 1; i++) {
      cameFrom[i][0] = stringCoordToInt(cameFrom[i][0]);
    }
    cameFrom[cameFrom.length - 1][0] = stringCoordToInt(cameFrom[cameFrom.length - 1][0]);

    while (checkKeys(current, cameFrom)) {
      current = getCoordAtIndex(current, cameFrom);
      totalPath.unshift(current)
    }
    return totalPath;
  }

  pathToPacman(start) {
    const openList = [start];
    const pacmanCoord = findPacman();
    const h = (current) => {
      return manhattanDist(current, pacmanCoord);
    }

    const gScore = new Map();
    gScore[start] = 0;

    const fScore = new Map();
    fScore[start] = h(start);

    const cameFrom = new Map();

    const gridElements = document.querySelectorAll('.grid');
    for (let i = 0; i < gridElements.length; i++) {
      gridElements[i].classList.remove('read');
    }

    while (openList.length !== 0) {
      let current = openList[0];
      for (let i = openList.length - 1; i >= 0; i--) {
        if (fScore[openList[i]] < fScore[current]) {
          current = openList[i];
        }
      }

      const readDiv = getDivFromCoord(current);
      readDiv.classList.add('read');

      if (arraysMatch(current, pacmanCoord)) {
        return this.formPath(cameFrom, pacmanCoord);
      }

      openList.splice(openList.indexOf(current), 1);
      const neighbours = this.findNeighbours(current);
      for (let i = 0; i < neighbours.length; i++) {

        const tentativeGscore = gScore[current] + 1;
        const neighbour = neighbours[i];

        if (gScore[neighbour] === undefined) {
          gScore[neighbour] = Infinity;
          fScore[neighbour] = Infinity;
        }

        if (tentativeGscore < gScore[neighbour]) {
          cameFrom[neighbour] = current;
          gScore[neighbour] = tentativeGscore;
          fScore[neighbour] = gScore[neighbour] + h(neighbour);

          if (!checkArrayContains(openList, neighbour)) {
            openList.push(neighbour);
          }
        }
      }
    }
  }

  findNeighbours(coord) {
    coord = convertArrayToInt(coord);
    const N = [coord[0], coord[1] - 1];
    const E = [coord[0] + 1, coord[1]];
    const S = [coord[0], coord[1] + 1];
    const W = [coord[0] - 1, coord[1]];
    const directionsArray = [N, E, S, W];
    const answerArray = [];

    for (let i = 0; i < directionsArray.length; i++) {
      if (!checkWall(directionsArray[i])) {
        answerArray.push(directionsArray[i]);
      }
    }
    if (directionsArray.length > 1) {
      // console.log(directionsArray[1])
    }
    return answerArray;
  }

  doesThisMove() {
    const pacmanLocation = findPacman();
    const pacmanX = pacmanLocation[0];
    const pacmanY = pacmanLocation[1];
    switch (this.territory) {
      case 0:
        if (pacmanX <= this.boundaries && pacmanY <= this.boundaries) {
          this.mode = 'chase';
        } else {
          this.mode = 'rest';
        }
        break;
      case 1:
        if (pacmanX >= this.boundaries && pacmanY <= this.boundaries) {
          this.mode = 'chase';
        } else {
          this.mode = 'rest';
        }
        break;
      case 2:
        if (pacmanX <= this.boundaries && pacmanY >= this.boundaries) {
          this.mode = 'chase';
        } else {
          this.mode = 'rest';
        }
        break;
      case 3:
        if (pacmanX >= this.boundaries && pacmanY >= this.boundaries) {
          this.mode = 'chase';
        } else {
          this.mode = 'rest';
        }
        break;
    }
  }

  checkForGhost(newDiv) {
    return newDiv.classList.contains('ghost');
  }

  move() {
    this.doesThisMove();
    const distToPacman = manhattanDist(findPacman(), this.currentCoord);
    // if (this.mode === 'chase') {
    if (distToPacman < 20) {
      this.routeToPacman = this.pathToPacman(this.currentCoord);
      const nextCoord = this.routeToPacman[1];
      if(this.checkForGhost(getDivFromCoord(nextCoord))) {
        return;
      }
      const oldDiv = getDivFromCoord(this.currentCoord);
      oldDiv.classList.remove('ghost');
      this.currentCoord = nextCoord;
      const newDiv = getDivFromCoord(this.currentCoord);
      newDiv.classList.add('ghost');
    } else {

    }
  }

  redrawGhost(oldDiv, newDiv) {
    oldDiv.classList.remove('ghost');
    newDiv.classList.add('ghost');
  }
}


function checkArray(array, array2) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array[i] !== array2[j]) {
        break;
      } else if ((array[i] === array2[j]) && (j === array2.length - 1)) {
        return true;
      }
    }
  }
  return false;
}

function findIndexOfArray(searchValue, array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < searchValue.length; j++) {
      if (array[i][j] !== searchValue[j]) {
        continue;
      } else if ((array[i][j] === searchValue[j]) && (j === searchValue.length - 1)) {
        return i;
      }
    }
  }
  console.log('not found')
}

function getCoordAtIndex(index, array) {
  for (let i = 0; i < array.length; i++) {
    if (arraysMatch(array[i][0], index)) {
      return array[i][1];
    }
  }
  return false;
}

function checkArrayContains(array, array2) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array[i][j] !== array2[j]) {
        break;
      } else if ((array[i][j] === array2[j]) && (j === array2.length - 1)) {
        return true;
      }
    }
  }
  return false;
}

function checkKeys(key, array) {
  array = getKeys(array);
  for (let i = 0; i < array.length; i++) {
    if (arraysMatch(key, array[i])) {
      return true;
    }
  }
  return false;
}

function getKeys(array) {
  const keys = [];
  for (let i = 0; i < array.length; i++) {
    keys.push(array[i][0])
  }
  return keys;
}

function getValues(array) {
  const values = [];
  for (let i = 0; i < array.length; i++) {
    values.push(array[i][1])
  }
  // console.log(values)
  return values;
}

var arraysMatch = function (arr1, arr2) {

  // Check if the arrays are the same length
  if (arr1.length !== arr2.length) return false;

  // Check if all items exist and are in the same order
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  // Otherwise, return true
  return true;

}

function getDivFromCoord(coord) {
  const gridElements = document.querySelectorAll('.grid');
  for (let i = 0; i < gridElements.length; i++) {
    const xCoord = parseInt(gridElements[i].getAttribute('x'));
    const yCoord = parseInt(gridElements[i].getAttribute('y'));
    if ((xCoord === coord[0]) && (yCoord === coord[1])) {
      return gridElements[i];
    }
  }
}

function getCoordFromDiv(div) {
  const xCoord = parseInt(div.getAttribute('x'));
  const yCoord = parseInt(div.getAttribute('y'));
  return [xCoord, yCoord];
}

function manhattanDist(coord1, coord2) {
  return Math.abs(coord2[0] - coord1[0]) + Math.abs(coord2[1] - coord1[1]);
}

function checkForPacman(div) {
  return (div.classList.contains('pacman') ? true : false);
}

function checkWall(coord) {
  const div = getDivFromCoord(coord);
  return div.classList.contains('wall');
}

function stringToCoord(string) {
  const splitString = string.split(',');
  splitString[0] = parseInt(splitString[0]);
  splitString[1] = parseInt(splitString[1]);
  return splitString;
}

function convertArrayToInt(array) {
  let newArray = []

  // console.log(array[0])
  for (let i = 0; i < array.length; i++) {
    newArray.push(parseInt(array[i]));
  }
  return newArray;
}

function convertArrayToString(array) {
  let newArray = []
  for (let i = 0; i < array.length; i++) {
    newArray.push('' + array[i]);
  }
  return [newArray.join(',')];
}

function stringCoordToInt(string) {
  let array = string.split(',');
  for (let i = 0; i < array.length; i++) {
    array[0] = parseInt(array[0]);
    array[1] = parseInt(array[1]);
  }
  return array;
}

function minimumMapKey(map) {
  const arrayFromMap = Object.entries(map);
  // console.log(arrayFromMap)
  let lowest = Infinity;
  let lowestKey;
  let newKey;
  for (let i = 0; i < arrayFromMap.length; i++) {
    if (arrayFromMap[i][1] < lowest) {
      newKey = [];
      lowest = arrayFromMap[i][1];
      lowestKey = arrayFromMap[i][0].split(',');
      newKey.push(parseInt(lowestKey[0]));
      newKey.push(parseInt(lowestKey[1]));
    }
  }
  // lowestKey = stringToCoord(lowestKey);
  // console.log(typeof lowestKey)
  // console.log(newKey)
  return newKey;
}

function findPacman() {
  const pacman = document.querySelector('.pacman');
  const xCoord = parseInt(pacman.getAttribute('x'));
  const yCoord = parseInt(pacman.getAttribute('y'));
  return [xCoord, yCoord];
}

function runGame(name, ghostSpeed) {
  const board = new Gameboard(23);
  console.log(name)
  const player = new Player(name);
  const center = board.getCenter();
  board.createBoard();
  const pacman = new Pacman(board, [center[0] - 1, center[1] - 1], player, 1);
  const ghost1 = new Ghost(board, [1, 1], 0);
  const ghost2 = new Ghost(board, [board.dims - 2, 1], 1);
  const ghost3 = new Ghost(board, [1, board.dims - 2], 2);
  const ghost4 = new Ghost(board, [board.dims - 2, board.dims - 2], 3);
  const speed = 100;
  pacman.spawn();
  ghost1.spawn();
  ghost2.spawn();
  ghost3.spawn();
  ghost4.spawn();
  const ghostInterval = setInterval(() => {
    ghost1.move();
    ghost2.move();
    ghost3.move();
    ghost4.move();
  }, ghostSpeed);
  const pacmanInterval = setInterval(() => {
    if (pacman.move() === 1) {
      clearInterval(pacmanInterval);
      clearInterval(ghostInterval);
      loseGame(player);
    }
  }, speed);
}

function loseGame(player) {
  const playerName = player.name;
  const playerPoints = player.points;
  const homePageDiv = document.querySelector('#home-page');
  const gameDiv = document.querySelector('#game');
  const boardDiv = document.querySelector('#game-board');
  if (document.querySelectorAll('.post-game').length !== 0) {
    document.querySelectorAll('.post-game')[0].parentNode.removeChild(document.querySelectorAll('.post-game')[0]);
  }
  const postGameDiv = document.createElement('p');
  postGameDiv.classList.add('post-game');
  postGameDiv.innerHTML = 'Better luck next time ' + playerName + '!' + ' You got ' + playerPoints + ' points!';
  homePageDiv.append(postGameDiv);
  homePageDiv.style.display = 'flex';
  boardDiv.textContent = '';
  gameDiv.style.display = 'none';
}

function winGame(player) {
  const playerName = player.name;
  const homePageDiv = document.querySelector('#home-page');
  const gameDiv = document.querySelector('#game');
  const boardDiv = document.querySelector('#game-board');
  if (document.querySelectorAll('.post-game').length !== 0) {
    document.querySelectorAll('.post-game')[0].parentNode.removeChild(document.querySelectorAll('.post-game')[0]);
  }
  const postGameDiv = document.createElement('p');
  postGameDiv.classList.add('post-game');
  postGameDiv.innerHTML = 'Congratulations ' + playerName + '!' + ' You Win!';
  homePageDiv.append(postGameDiv);
  homePageDiv.style.display = 'flex';
  boardDiv.textContent = '';
  gameDiv.style.display = 'none';
}

function main() {
  const homePageDiv = document.querySelector('#home-page');
  const gameDiv = document.querySelector('#game');
  const startButton = document.querySelector('#start-button');
  const nameDiv = document.querySelector('#player-name');
  const difficultySelect = document.querySelector('#difficulty-select');
  let speed = 300;

  difficultySelect.addEventListener('change', () => {
    switch (difficultySelect.value) {
      case 'easy':
        speed = 350;
        break;
      case 'medium':
        speed = 250;
        break;
      case 'hard':
        speed = 150;
        break;
    }
  } )

  startButton.addEventListener('click', () => {
    homePageDiv.style.display = 'none';
    gameDiv.style.display = 'flex';
    const name = nameDiv.value;
    runGame(name, speed);
  })
}


window.addEventListener('DOMContentLoaded', main);