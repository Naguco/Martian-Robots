const CLIController = require('./controllers/cliController');

/**
 * Function that starts the CLI process.
 * @param {any} secondArgument Second argument of the execution.
*/
module.exports = async function startCLI(secondArgument) {
    if (secondArgument) {
        let cliController = new CLIController();
        let output = await cliController.checkOption(secondArgument);
        if (output) {
            console.log("---------------- Output ----------------\n" + output);
        }
    }

    process.exit(1);
};