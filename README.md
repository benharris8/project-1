# Project 1
Basic Pacman with A* ghost pathfinding.
## Introduction
For this project I created a very simplistic implementation of Pacman and implemented an A* pathfinding algorithm for the ghosts.

## A* Search Algorithms
An A* search is an algorithm which finds the shortest possible path between two points regardless of any objects seperating them.
The first step is to work out the Manhattan distance between the two points which is done using the basic distance between two points formula.

### sqrt(p(x2 − x1)^2 + (y2 − y1)^2)

This is calculated for every coordinate around the origin and if it gets higher then that coordinate/path is less likely to get searched as it clearly moves away from the goal.
This coordinate may eventually be searched if all other routes lead to dead ends.

### FScore

The FScore is equal to the number of nodes read to get to the node currently being read (g) plus the Manhattan distance (h).
The list of coordinates currently being read is sorted so the coordinate with the lowest FScore will be read/explored first.

A coordinate which is being read will then add all of it's neighbours to the list of open coordinates (if they aren't a wall) and each of those will have fscores calculated and so on.
When each coordinate is read it is mapped to an object where the key is the coordinate which the currently read coordinate came from (the previously read coordinate) and the value is the currently read coordinate.

This continues until the coordinate currently being read is equal to the goal coordinate where the route map is traced back using the keys and which coordinate their values point to. 

After this the ghost uses this path to decide it's next move.

## Implementation

I used the DOM to create a grid of squares each with an x and y coordinate. There is an array of coordinates which, when the grid is generated, each square coordinate is checked against and if it is in the list of walls it is given the CSS class 'wall'
which turns it grey and is used for the collision checking with Pacman and the Ghosts.

I contained all of the game board logic to a board class and had Pacman and Ghost be extended off of an entities class which contained the coordinate definitions.

Pacman has a direction variable which controls which coordinate is continuously iterated as Pacman needs to continuously move. The direction is changed with event listeners listening for wasd key presses.

The ghosts have the A* logic and will continuously generate an array of coordinates which is the shortest possible route to Pacman. They will then move to the first coordinate and regenerate the list.


