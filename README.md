### ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, Software Engineering Immersive

# Pac Man

## Table of Contents
1. [Overview](#Overview)
2. [Technologies Used](#Technologies-Used)
3. [A Star Search Algorithms](#A-Star-Search-Algorithms)
4. [Implementation](#Implementation)
5. [Screenshots](#Screenshots)
6. [Challenges](#Challenges)
7. [Potential Future Features](#Potential-Future-Features)
8. [Lessons Learned](#Lessons-Learned)


# Overview
This was a week long solo project for which I created an implementation of Pac Man using an A Star pathing algorithm for the ghost AI.

# Technologies Used
- JavaScript
- HTML5/CSS3

# A Star Search Algorithms
An A* search is an algorithm which finds the shortest possible path between two points regardless of any objects seperating them. The first step is to work out the Manhattan distance between the two points which is done using the basic distance between two points formula.

### sqrt(p(x2 − x1)^2 + (y2 − y1)^2)

This is calculated for every coordinate around the origin and if it gets higher then that coordinate/path is less likely to get searched as it clearly moves away from the goal. This coordinate may eventually be searched if all other routes lead to dead ends.

## FScore

The FScore is equal to the number of nodes read to get to the node currently being read (g) plus the Manhattan distance (h). The list of coordinates currently being read is sorted so the coordinate with the lowest FScore will be read/explored first.

A coordinate which is being read will then add all of it's neighbours to the list of open coordinates (if they aren't a wall) and each of those will have fscores calculated and so on. When each coordinate is read it is mapped to an object where the key is the coordinate which the currently read coordinate came from (the previously read coordinate) and the value is the currently read coordinate.

This continues until the coordinate currently being read is equal to the goal coordinate where the route map is traced back using the keys and which coordinate their values point to.

After this the ghost uses this path to decide it's next move.

# Implementation
I used the DOM to create a grid of squares each with an x and y coordinate. There is an array of coordinates which, when the grid is generated, each square coordinate is checked against and if it is in the list of walls it is given the CSS class 'wall' which turns it grey and is used for the collision checking with Pac Man and the Ghosts.

```js
createBoard() {
    this.level1();
    for (let i = 0; i < this.dims; i++) {
      const newRow = document.createElement('div');
      newRow.classList.add('row');
      for (let j = 0; j < this.dims; j++) {
        const newGrid = document.createElement('div');
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
```

I contained all of the game board logic to a board class and had Pac Man and Ghost be extended off of an entities class which contained the coordinate definitions.

Pac Man has a direction variable which controls which coordinate is continuously iterated as Pac Man needs to continuously move. The direction is changed with event listeners listening for wasd key presses.

The ghosts have the A* logic and will continuously generate an array of coordinates which is the shortest possible route to Pac Man. They will then move to the first coordinate and regenerate the list.

```js
  pathToPacman(start) {
    const openList = [start];
    const pacmanCoord = findPacman();
    const h = (current) => {
        // manhattenDist is a helper function which calculates the shortest path between two points regardless of obstacles
      return manhattanDist(current, pacmanCoord);
    }

    // "start" is the ghost's starting coordinate
    const gScore = new Map();
    // the gScore for the starting coordinate is 0 because it is the first coordinate of the path, no jumps have been made yet.
    gScore[start] = 0;

    const fScore = new Map();
    // the fScore is equal to the hScore for the starting coordinate because fScore = hScore + gScore and gScore is 0 for the starting coordinate.
    fScore[start] = h(start);

    const cameFrom = new Map();

    // removes green from all squares
    const gridElements = document.querySelectorAll('.grid');
    for (let i = 0; i < gridElements.length; i++) {
      gridElements[i].classList.remove('read');
    }

    // while there are coordinates to be read
    while (openList.length !== 0) {
      // the currently read node is the first in the list of open nodes
      let current = openList[0];
      for (let i = openList.length - 1; i >= 0; i--) {
        if (fScore[openList[i]] < fScore[current]) {
        //resort the list of open nodes based on the fScore and reassign the node currently being read to the lowest fScore
          current = openList[i];
        }
      }

      const readDiv = getDivFromCoord(current);
      //turns read coordinates green
      readDiv.classList.add('read');

      // the currently read coordinate is pacman's coordinate then form the path
      if (arraysMatch(current, pacmanCoord)) {
        return this.formPath(cameFrom, pacmanCoord);
      }
      // Remove the current node from the list of open nodes
      openList.splice(openList.indexOf(current), 1);
      // Find the node's neighbours. This is a helper function which only returns the neighbours if they do not have the 'wall' CSS class.
      const neighbours = this.findNeighbours(current);
      for (let i = 0; i < neighbours.length; i++) {
        // add one to the gScore as a jump has been made which adds 1 to the number of nodes read on this path.
        const tentativeGscore = gScore[current] + 1;
        // get each neighbour and assign it's fScore. Add to the list of open nodes.
        const neighbour = neighbours[i];

        // if the node is new and has no gScore then temporarily make the fScore and gScore infinite so that they pass the very first check.
        if (gScore[neighbour] === undefined) {
          gScore[neighbour] = Infinity;
          fScore[neighbour] = Infinity;
        }

        // if the neighbour moves further away from the source (if it's gScore is higher)
        if (tentativeGscore < gScore[neighbour]) {
          // add an entry to the cameFrom object which will look like {[neighbour coord] : [current coord]}  
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

```

I had to write a lot of helper functions in order to work with Arrays in Javascript effectively.

# Screenshots
![ALTTEXT](imageurl)

# Challenges
I had to do a lot of type conversions and helper functions in order to complete this project due to how JavaScript treats object keys.
The main example of this is from the final path generation. Initially the path is an object with a co-ordinate as the value and the co-ordinate that value "came from" in the path as it's key. 
JavaScript only allows strings as keys so I had to split the full path object into an array of key pairs and then convert each co-ordinate into integers using helper functions.

```js
for (let i = 0; i < Object.entries(cameFrom).length - 1; i++) {
    cameFrom[i][0] = stringCoordToInt(cameFrom[i][0]);
}
```
```js
function stringCoordToInt(string) {
  let array = string.split(',');
  for (let i = 0; i < array.length; i++) {
    array[0] = parseInt(array[0]);
    array[1] = parseInt(array[1]);
  }
  return array;
}
```

Furthermore this method of implementing A Star whilst manipulating the DOM at the same time is very costly. The application lags when the ghosts have to search too far to find Pac Man.

# Potential Future Features
Since completing this project I have learned much more about programming and specifically about CSS and design. 

I would first start with making the site a lot more appealing to look at and would then add more game features such as different levels of increasing difficulty.

Eventually I would add the option for the user to create their own levels by clicking on squares to draw walls.

# Lessons Learned
- Manipulating the DOM so frequently is very costly and can lead to the application lagging if done too often.
- Allow for more time to make the finished product look nice and presentable.
