var ChatApp = artifacts.require("ChatApp");

module.exports = function (deployer) {
  // const gasPrice = web3.utils.toWei("1", "gwei");
  deployer.deploy(ChatApp);
};
