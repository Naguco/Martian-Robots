const CLIController = require('./controllers/cliController');

module.exports = async function startCLI(secondArgument) {
    if (secondArgument) {
        let cliController = new CLIController();
        let output = await cliController.checkOption(secondArgument);
        console.log("---------------- Output ----------------\n" + output);
    }
};