const ScriptController = require('./controllers/scriptController');

module.exports = async function startScript(secondArgument) {
    if (secondArgument) {
        let scriptController = new ScriptController();
        let output = await scriptController.checkOption(secondArgument);
        console.log("---------------- Output ----------------\n" + output);
    }
};