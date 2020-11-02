const startServer = require('./Server/server');
const startScript = require('./Script/script');
const startCLI = require('./Cli/cli');
const startDatabaseInstance = require('./Database/database');

/**
 * Main body of the project.
*/

async function main () {

    let connected;
    const args = process.argv.slice(2);

    if (args[0] === 'help') {
        showHelp();
        return;
    }

    connected = await startDatabaseInstance();

    if (connected) {

        switch (args[0]) {
            case "CLI":
                startCLI(args[1]);
                break;
            case "REST":
                startServer();
                break;
            case "SCRIPT":
                startScript();
                break;
            default:
                console.log(args[0] + " is not a valid argument. Please insert 'CLI', 'REST' or 'SCRIPT'.\nIf you need help you can also type 'help'.");
                break;
        }

    } else {
        console.log("Database not connected properly, please check documentation for more information.");
    }

}

/**
 * Generates an option object for showing help
 * @param {string} argument 
 * @param {string} description 
*/
function Option(argument, description) {
    this.Argument = argument;
    this.Description = description;
}

/**
 * Displays a table in console with all the help and options of the main project.
*/
function showHelp() {

    var options = {};

    cliText = 'Start this project as a CLI. Command Line will ask you for an input, and inmediately will prompt you the solution.';
    restText = 'Start a localhost server at port 3000. With a post method to http://localhost:3000/api/RobotsGame with a body that contains the data like { data: "your_input_goes_here"}.';
    scriptText = 'Send your input in the second argument of the script execution. The output will be prompted on your command line.';
    helpText = 'It will show you this help. For more information visit: https://github.com/Naguco/Martian-Robots';

    options.CLI = new Option('CLI', cliText);
    options.REST = new Option('REST', restText);
    options.SCRIPT = new Option('SCRIPT', scriptText);
    options.help = new Option('help', helpText);

    console.table(options);

}


/**
 * Main project call.
 */
main();