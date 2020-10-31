# NODE - Martian Robots
Martian Robots it's a project that solves the problem suggested by the Guidesmiths IT Recruiter department.
This problem has been fully solved by Francisco Gubbins Corral.

## How to run this project
You have two options to play this Martian Robots game and test this project.

### 1. HTTP - REST Solution

First of all save this link, you will need it for the next steps: https://martian-robots-fgc.herokuapp.com/

Install a tool that allows you to make POST requests to an HTTP endpoint. In my case, I will use [Postman](https://www.postman.com/downloads/).

### 1.1. Endpoints:
HTTP Method | Endpoint | Description
----------- | -------- | -----------
GET | https://martian-robots-fgc.herokuapp.com/ | Simple and basic welcome if visiting page.
GET | https://martian-robots-fgc.herokuapp.com/RobotsGame/games | Retrieve all the succesfull games done.
GET | https://martian-robots-fgc.herokuapp.com/RobotsGame/robotsLost | Retrieve all the total robots that have been lost in all games.
POST | https://martian-robots-fgc.herokuapp.com/RobotsGame | Request that starts a new game instance.

### 1.2. Data accepted:

The program only accepts this type of data (as described on the PDF sent by the IT Recruitment department):
```bash
5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL
```

The first line of input is the upper-right coordinates of the rectangular world, the
lower-left coordinates are assumed to be 0, 0.
The remaining input consists of a sequence of robot positions and instructions (two lines
per robot). A position consists of two integers specifying the initial coordinates of the
robot and an orientation (N, S, E, W), all separated by whitespace on one line. A robot
instruction is a string of the letters "L", "R", and "F" on one line.
Each robot is processed sequentially, i.e., finishes executing the robot instructions
before the next robot begins execution.
The maximum value for any coordinate is 50.
All instruction strings will be less than 100 characters in length.


