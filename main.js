const startServer = require('./Server/server');
const startScript = require('./Script/script');

const args = process.argv.slice(2);

switch (args[0]) {
    case "CLI":
        initCLI();
        break;
    case "REST":
        startServer();
        break;
    case "SCRIPT":
        startScript(args[1]);
        break;
    case "help":
        showHelp();
        break;
    default:
        console.log(args[0] + " is not a valid argument. Please insert 'CLI', 'REST' or 'SCRIPT'.\nIf you need help you can also type 'help'.");
        break;
}

function Option(argument, description) {
    this.Argument = argument;
    this.Description = description;
}

function showHelp() {

    var options = {};

    cliText = 'Start this project as a CLI. Command Line will ask you for an input, and inmediately will prompt you the solution.';
    restText = 'Start a localhost server at port 3000. With a post method to http://localhost:3000/api/RobotsGame with a body that contains the data like { data: "your_input_goes_here"}.';
    scriptText = 'Send your input in the second argument of the script execution. The output will be prompted on your command line.';
    helpText = 'It will show you this help';

    options.CLI = new Option('CLI', cliText);
    options.REST = new Option('REST', restText);
    options.SCRIPT = new Option('SCRIPT', scriptText);
    options.help = new Option('help', helpText);

    console.table(options);

}