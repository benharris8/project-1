function main() {
  // element definitions
  const homePageDiv = document.querySelector('#home-page');
  const gameDiv = document.querySelector('#game');
  const startButton = document.querySelector('#start-button');

  // variable definitions

  // event listeners
  startButton.addEventListener('click', () => {
    // changeStyle(homePageDiv, 'display', 'none');
    homePageDiv.setStyle('display', 'none');
    gameDiv.setStyle('display', 'block');
    runGame();
  });
}

// game logic
function runGame() {
  // element definitions
  const gameBoardDiv = document.querySelector('#game-board');

  // variable definitions
  const dimens = 23;
  const walls = [];
  const center = [Math.floor(dimens / 2), Math.floor(dimens / 2)];
  let pacmanCoord = [center[0], center[1] + 3];
  console.log(pacmanCoord)
  let direction = 0;
  // main logic
  const pacmanInterval = setInterval(() => {
    // console.log(pacmanCoord)
    const oldCoord = [];
    oldCoord.push(pacmanCoord[0])
    oldCoord.push(pacmanCoord[1])
    
    switch (direction) {
      case 0:
        pacmanCoord[1] = pacmanCoord[1] - 1;
        break;
      case 1:
        pacmanCoord[0] = pacmanCoord[0] + 1;
        break;
      case 2:
        pacmanCoord[1] = pacmanCoord[1] + 1;
        break;
      case 3:
        pacmanCoord[0] = pacmanCoord[0] - 1;
        break;
    }
    if(!checkWall(pacmanCoord)){
      movePacman(oldCoord, pacmanCoord);
    } else {
      pacmanCoord = oldCoord;
    }
  }, 100);

  // event listeners
  window.addEventListener('keypress', (event) => {
    switch (event.key) {
      case 'w':
        direction = 0;
        break;
      case 'd':
        direction = 1;
        break;
      case 's':
        direction = 2;
        break;
      case 'a':
        direction = 3;
        break;
    }
  });

  // functions
  function createBoard() {
    outerWalls();
    drawHorizontalWall([2, 2], 9);
    drawHorizontalWall([12, 2], 9);
    drawHorizontalWall([2, dimens - 3], 9);
    drawHorizontalWall([12, dimens - 3], 9);
    drawVerticalWall([2, 2], 9);
    drawVerticalWall([2, 12], 9);
    drawVerticalWall([dimens - 3, 2], 9);
    drawVerticalWall([dimens - 3, 12], 9);


    //loop through rows making a row div
    for (let j = 0; j < dimens; j++) {
      const rowDiv = document.createElement('div');
      rowDiv.classList.add('row');
      gameBoardDiv.append(rowDiv);

      //for each row create a number of grid div elements up to dimens
      for (let i = 0; i < dimens; i++) {
        const gridDiv = document.createElement('div');
        gridDiv.classList.add('grid');

        //draw walls if the grid coords are in the walls array
        if (checkArrayContains(walls, [i, j])) {
          gridDiv.classList.add('wall');
        }

        //set the x and y coords as attributes for reference later
        gridDiv.setAttribute('x', i);
        gridDiv.setAttribute('y', j);
        rowDiv.append(gridDiv);
      }
    }
    spawnPacman();
  }

  function outerWalls() {
    for (let i = 0; i < dimens; i++) {
      walls.push([i, 0]);
    }
    for (let i = 0; i < dimens; i++) {
      if (i === Math.floor(dimens / 2)) {
        continue;
      }
      walls.push([dimens - 1, i]);
    }
    for (let i = dimens - 1; i !== 0; i--) {
      walls.push([i, dimens - 1]);
    }
    for (let i = dimens - 1; i !== 0; i--) {
      if (i === Math.floor(dimens / 2)) {
        continue;
      }
      walls.push([0, i]);
    }
  }

  function drawVerticalWall(point, value) {
    const pointX = point[0];
    const pointY = point[1];

    for (let i = 0; i < value; i++) {
      walls.push([pointX, pointY + i]);
    }
  }

  function drawHorizontalWall(point, value) {
    const pointX = point[0];
    const pointY = point[1];

    for (let i = 0; i < value; i++) {
      walls.push([pointX + i, pointY]);
    }
  }

  function spawnPacman() {
    const spawnDiv = getDivFromCoord(pacmanCoord);
    spawnDiv.classList.add('pacman-open');
    // console.log(spawnDiv)
  }

  function movePacman(oldPoint, point) {
    const oldDiv = getDivFromCoord(oldPoint);
    // console.log(oldDiv.classList)
    const newDiv = getDivFromCoord(point);
    // console.log('new: ' + newDiv.classList)
    oldDiv.classList.remove('pacman-open');
    newDiv.classList.add('pacman-open');
  }

  function checkWall(point) {
    const newDiv = getDivFromCoord(point);
    return (newDiv.classList.contains('wall') ? true : false);
  }

  // function checks every ele with grid class and checks their x and y against input values
  // then returns the match
  function getDivFromCoord(point) {
    const gridElements = document.querySelectorAll('.grid');
    for (let i = 0; i < gridElements.length; i++) {
      const xCoord = parseInt(gridElements[i].getAttribute('x'));
      const yCoord = parseInt(gridElements[i].getAttribute('y'));
      if ((xCoord === point[0]) && (yCoord === point[1])) {
        return gridElements[i];
      }
    }
  }

  createBoard();
}


// useful functions
HTMLElement.prototype.setStyle = function (style, value) {
  this.style[style] = value;
}

HTMLElement.prototype.getStyle = function (style) {
  return this.style[style];
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

window.addEventListener('DOMContentLoaded', main);