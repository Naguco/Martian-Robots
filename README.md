# NODE - Martian Robots
Martian Robots it's a project that solves the problem suggested by the Guidesmiths IT Recruiter department.
This problem has been fully solved by Francisco Gubbins Corral.

## Table of contents

- [How to run this project](#how-to-run-this-project)
  * [1 HTTP - REST Solution](#public-http:-rest-solution)
    + [1.1 Endpoints](#1.1-endpoints:)
    + [1.2 Data accepted](#1.2-data-accepted:)
    + [1.3 Examples](#1.3-examples)
  * [2 Installing it in your device](#installing-it-in-your-device)
    + [2.1 Previous instalations](#2.1-previous-instalations)
    + [2.2 Running the project](#2.2-running-the-project)
      + [2.2.1 First steps](#2.2.1-first-steps)

## How to run this project
You have two options to play this Martian Robots game and test this project.

### 1 Public HTTP: REST Solution

First of all save this link, you will need it for the next steps: https://martian-robots-fgc.herokuapp.com/

Install a tool that allows you to make POST requests to an HTTP endpoint. In my case, I will use [Postman](https://www.postman.com/downloads/).

### 1.1 Endpoints

HTTP Method | Endpoint | Description
----------- | -------- | -----------
GET | https://martian-robots-fgc.herokuapp.com/ | Simple and basic welcome message on visiting page.
GET | https://martian-robots-fgc.herokuapp.com/RobotsGame/games | Retrieve all the succesfull games done.
GET | https://martian-robots-fgc.herokuapp.com/RobotsGame/robotsLost | Retrieve all the total robots that have been lost in all games.
POST | https://martian-robots-fgc.herokuapp.com/RobotsGame | Request that starts a new game instance.

### 1.2 Data accepted

The program only accepts this type of data (as described on the PDF sent by the IT Recruitment department):
```
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

### 1.3 Examples

If you want to send it as a JSON format:
```javascript
{ "data": "5 3\n1 1 E\nRFRFRFRF\n3 2 N\nFRRFLLFFRRFLL\n0 3 W\nLLFFFLFLFL" }
```

As you can see, you have to take much care while building your input. "Whitespaces" and "\n" are crucial.

__Example 1:__ ![Imagen en JSON](https://i.postimg.cc/7hYgV0Dm/POST-JSON.png)
__Example 2:__ ![Imagen en urlencoded](https://i.postimg.cc/8CSf4MmM/POST-NO-JSON.png)


### 2 Installing it in your device

If you want to use this program as a Script, as a CLI or run this project as a REST in localhost, then follow the next steps.

### 2.1 Previous instalations

* To run this project you will need to:
  * Download this code.
  * (Optional)Download and install [MongoDB Community Server](https://www.mongodb.com/try/download/community) and follow [this documentation](https://docs.mongodb.com/manual/administration/install-community/) to complete the instalation correctly.
  * Download and install [Node.js](https://nodejs.org/es/). Make sure that your installation was done correctly.
  
### 2.2 Running the project

Once you have completed all the instalations, now we can start to run our game.

### 2.2.1 First steps

Open your preferred CLI and go to the directory that contains the project ("Martian-Robots/"). Make sure that you are in the same level as "package.json".

Run the following command:
```bash
npm install
```
Once completed, now you have to choose between running this project with your own database or use the public database that I've provided to the project.
If you want to use the public one, just skip the 2.2.1.1 step.

### 2.2.1.1 Running a local databse
If you want to run this project with your own database, make sure that your [MongoDB Community Server](https://www.mongodb.com/try/download/community) was properly installed.
Then go to 'Database/database.js' and change this code:
```javascript
module.exports = async function startDatabaseInstance() {

    console.log("Trying to connect to database, please wait.");

    let connected = false;
    await mongoose.connect(DatabaseConfig.publicMongoDBInstance, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => { connected = true; console.log("Connected!"); })
        .catch(() => { connected = false; });
    return connected;

};
```
with this code:
```javascript
module.exports = async function startDatabaseInstance() {

    console.log("Trying to connect to database, please wait.");

    let connected = false;
    await mongoose.connect(DatabaseConfig.localMongoDBInstance, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => { connected = true; console.log("Connected!"); })
        .catch(() => { connected = false; });
    return connected;

};
```
__If you are having problems while trying to use your own mongoDB database, please use the public one.__

### 2.2.2 Running the project

With your preferred CLI, go to the project directory ("Martian-Robots/").

Now you have to decide if you want to run it as a CLI, as a Script or as an API Rest.

### 2.2.2.1 As a Script

To run this project as a Script just run this command:
```bash
node MartianRobots SCRIPT
```
The output will be: the game execution output, the past executions output and how many robots are lost in total in all the games played.

To change the input you have to go to "/Script/config/scriptConfig.js" and change the stringInput variable with your own input.

Example input (/Script/config/scriptConfig.js"):
```javascript
module.exports.stringInput = "5 3\n1 1 E\nRFRFRFRF\n3 2 N\nFRRFLLFFRRFLL\n0 3 W\nLLFFFLFLFL";
```

### 2.2.2.2 As a CLI







