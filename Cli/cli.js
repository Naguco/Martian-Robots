const CLIController = require('./controllers/cliController');

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