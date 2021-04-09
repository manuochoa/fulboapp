const matchCreator = artifacts.require("matchCreator");


module.exports = async function(deployer) {
	
	await deployer.deploy(matchCreator)
	
};