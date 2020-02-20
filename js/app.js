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

  // main logic


  // event listeners


  // functions
  function createBoard() {
    outerWalls();
    drawHorizontalWall([2,2], 9);
    drawHorizontalWall([12, 2], 9);
    drawHorizontalWall([2,dimens - 3], 9);
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
        gridDiv.setAttribute('x', j);
        gridDiv.setAttribute('y', i);
        rowDiv.append(gridDiv);
      }
    }
  }

  function outerWalls() {
    for (let i = 0; i < dimens; i++) {
      walls.push([i, 0]);
    }
    for (let i = 0; i < dimens; i++) {
      walls.push([dimens - 1, i]);
    }
    for (let i = dimens - 1; i !== 0; i--) {
      walls.push([i, dimens - 1]);
    }
    for (let i = dimens - 1; i !== 0; i--) {
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