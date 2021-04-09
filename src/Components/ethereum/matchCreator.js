import web3 from "./web3";
import matchCreator from "./build/contracts/matchCreator.json";

const instance = new web3.eth.Contract(matchCreator.abi,
    "0x3a5FD2387f309cEC1df7942AD0D4A4EEa4986C09");


export default instance