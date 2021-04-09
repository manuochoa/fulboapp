import web3 from "./web3";
import app1 from "./build/contracts/App1.json";

export default (address) => {
    return new web3.eth.Contract(app1.abi,
        address);
};
