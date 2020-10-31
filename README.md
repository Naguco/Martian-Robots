# NODE - Martian Robots
Martian Robots it's a project that solves the problem suggested by the Guidesmiths IT Recruiter department.
This problem has been fully solved by Francisco Gubbins Corral.

## 1. How to run this project
You have two options to play this Martian Robots game and test this project.

### 1.1. HTTP - REST Solution

First of all save this link, you will need it for the next steps: https://martian-robots-fgc.herokuapp.com/

Install a tool that allows you to make POST requests to a HTTP endpoint. In my case, I will use [Postman](https://www.postman.com/downloads/).

You have available the next endpoints:
HTTP Method | Endpoint | Description
----------- | -------- | -----------
GET | https://martian-robots-fgc.herokuapp.com/ | Simple and basic welcome if visiting page.
GET | https://martian-robots-fgc.herokuapp.com/RobotsGame/games | Retrieve all the succesfull games done.
GET | https://martian-robots-fgc.herokuapp.com/RobotsGame/robotsLost | Retrieve all the total robots that have been lost in all games.
POST | https://martian-robots-fgc.herokuapp.com/RobotsGame | Request that starts a new game instance.





