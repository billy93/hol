//=============================================================================
// main.js v1.3.3
//=============================================================================

var pancakeSwapRouterAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
var quickSwapRouterAddress = "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff";
var uniSwapRouterAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

var constant = { 
    root:{
        liquidityControllerAddresses: "0x424eE0bA90c1B07A7c8A1A38aE999a88ED2cA5D1",
        rootedAddress: "0xCb5f72d37685C3D5aD0bB5F982443BC8FcdF570E",
        transferGateAddresses: "0x105E66f0bfD5b3b1E386D0dC6EC00F3342EF3fF6",
        poolAddress: "0x01f8989c1e556f5c89c7d46786db98eeaae82c33",
        routerAddress: uniSwapRouterAddress
    },
    upmatic:{
        liquidityControllerAddresses: "0xD63a09dEf429E7Aa11c46aD02A011552AE9cE5AF",
        rootedAddress: "0xe6a11F125a834E0676F3f8f33eb347D4e1938264",
        transferGateAddresses: "0xf40e1Ad286872f4a43E2FF5ca294e8F4b7772F36",
        poolAddress: "0x928ed5a1259b1ce7b7c99ac5f100cf0db16b424e",
        routerAddress: quickSwapRouterAddress
    },
    uptether:{
        liquidityControllerAddresses: "0x4C66a6f06B8bC4243479121A4eF0061650e5D137",
        rootedAddress: "0xCb5f72d37685C3D5aD0bB5F982443BC8FcdF570E",
        transferGateAddresses: "0x621642243CC6bE2D18b451e2386c52d1e9f7eDF6",
        poolAddress: "0x50db5be8c0c878e28fe231c647ef41b395463ffb",
        routerAddress: quickSwapRouterAddress
    },
    upbnb:{
        liquidityControllerAddresses: "0xd22F3E99F7e16566A104A47c9c15e97C6B4Ad122",
        rootedAddress: "0x1759254EB142bcF0175347D5A0f3c19235538a9A",
        transferGateAddresses: "0xF0282B35AA35885AB99c42dbc3Cd76097Be308aB",
        poolAddress: "0x27d078b13C2239606783679895Ec3b164da24D90",
        routerAddress: pancakeSwapRouterAddress
    },
    upcake:{
        liquidityControllerAddresses: "0x929aaf8a649a7193C9cB490936Fa7Bf175931a44",
        rootedAddress: "0x982f535c1dA184876d6e264920EdcA36B78e9f4C",
        transferGateAddresses: "0xe281f2e3447787B46e0eB0b87E3A172CC3B7eBcD",
        poolAddress: "0xB073ac3328B335612C6BB6861d69De475d517dA2",
        routerAddress: pancakeSwapRouterAddress
    }
}

const bnbProvider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.ninicoin.io/');
const maticProvider = new ethers.providers.JsonRpcProvider('https://rpc-mainnet.maticvigil.com/');
const ethProvider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');

const getFullDisplayBalance = (balance, decimals = 18) => {
    return new ethers.BigNumber.from(balance).div(new ethers.BigNumber.from(10).pow(decimals))
}

const scriptUrls = [
    "js/libs/pixi.js",
    "js/libs/pako.min.js",
    "js/libs/localforage.min.js",
    "js/libs/effekseer.min.js",
    "js/libs/vorbisdecoder.js",
    "js/rmmz_core.js",
    "js/rmmz_managers.js",
    "js/rmmz_objects.js",
    "js/rmmz_scenes.js",
    "js/rmmz_sprites.js",
    "js/rmmz_windows.js",
    "js/plugins.js"
];
const effekseerWasmUrl = "js/libs/effekseer.wasm";

class Main {
    constructor() {
        this.xhrSucceeded = false;
        this.loadCount = 0;
        this.error = null;
        this.signer = null;
        this.internalTransferAbi = [
            {
                "inputs": [
                    {
                        "internalType": "contract IERC20",
                        "name": "_token",
                        "type": "address"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "_orderId",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "receiveAmount",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "orderBuyerAddress",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "orderSellerAddress",
                        "type": "address"
                    }
                ],
                "name": "BuySuccess",
                "type": "event"
            },
            {
                "inputs": [],
                "name": "buyOrderId",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_receiveAmount",
                        "type": "uint256"
                    }
                ],
                "name": "createBuyOrder",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_receiveAmount",
                        "type": "uint256"
                    }
                ],
                "name": "createSellOrder",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getBaseTokenAmount",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_orderId",
                        "type": "uint256"
                    }
                ],
                "name": "getBuyOrder",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "orderId",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "amount",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "receiveAmount",
                                "type": "uint256"
                            },
                            {
                                "internalType": "string",
                                "name": "orderType",
                                "type": "string"
                            },
                            {
                                "internalType": "address payable",
                                "name": "orderBuyerAddress",
                                "type": "address"
                            },
                            {
                                "internalType": "address payable",
                                "name": "orderSellerAddress",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct InternalSwap.Order",
                        "name": "",
                        "type": "tuple"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getBuyOrders",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "orderId",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "amount",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "receiveAmount",
                                "type": "uint256"
                            },
                            {
                                "internalType": "string",
                                "name": "orderType",
                                "type": "string"
                            },
                            {
                                "internalType": "address payable",
                                "name": "orderBuyerAddress",
                                "type": "address"
                            },
                            {
                                "internalType": "address payable",
                                "name": "orderSellerAddress",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct InternalSwap.Order[]",
                        "name": "orders",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_orderId",
                        "type": "uint256"
                    }
                ],
                "name": "getSellOrder",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "orderId",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "amount",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "receiveAmount",
                                "type": "uint256"
                            },
                            {
                                "internalType": "string",
                                "name": "orderType",
                                "type": "string"
                            },
                            {
                                "internalType": "address payable",
                                "name": "orderBuyerAddress",
                                "type": "address"
                            },
                            {
                                "internalType": "address payable",
                                "name": "orderSellerAddress",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct InternalSwap.Order",
                        "name": "",
                        "type": "tuple"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getSellOrders",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "orderId",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "amount",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "receiveAmount",
                                "type": "uint256"
                            },
                            {
                                "internalType": "string",
                                "name": "orderType",
                                "type": "string"
                            },
                            {
                                "internalType": "address payable",
                                "name": "orderBuyerAddress",
                                "type": "address"
                            },
                            {
                                "internalType": "address payable",
                                "name": "orderSellerAddress",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct InternalSwap.Order[]",
                        "name": "orders",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getTokenAmount",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_orderId",
                        "type": "uint256"
                    }
                ],
                "name": "instantBuy",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "sellOrderId",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];
        this.internalTransferAddress = "0x94b796003e46fEE7744922E241201324c2d72B49";
    }

    run() {
        this.showLoadingSpinner();
        this.testXhr();
        this.loadMainScripts();
    }

    
    async getBalance(tokenName) {
        try{
            if(tokenName == "root"){
                let liqControllerAddress = constant.root.liquidityControllerAddresses;
                const contract = new ethers.Contract(
                    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
                    [
                        'function approve(address spender, uint amount) public returns(bool)',
                        'function balanceOf(address account) external view returns (uint256)'
                    ],
                    ethProvider
                );
                let balance = await contract.balanceOf(liqControllerAddress);
                return getFullDisplayBalance(balance);
            }
            else if(tokenName == "upbnb"){
                let liqControllerAddress = constant.upbnb.liquidityControllerAddresses;
                const contract = new ethers.Contract(
                    "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
                    [
                        'function approve(address spender, uint amount) public returns(bool)',
                        'function balanceOf(address account) external view returns (uint256)'
                    ],
                    bnbProvider
                );
                console.log("Get balance")
                let balance = await contract.balanceOf(liqControllerAddress);
                console.log("After get balance")
                return getFullDisplayBalance(balance);
            }
            else if(tokenName == "upcake"){
                let liqControllerAddress = constant.upcake.liquidityControllerAddresses;
                const contract = new ethers.Contract(
                    "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82",
                    [
                        'function approve(address spender, uint amount) public returns(bool)',
                        'function balanceOf(address account) external view returns (uint256)'
                    ],
                    bnbProvider
                );
                let balance = await contract.balanceOf(liqControllerAddress);
                return getFullDisplayBalance(balance);
            }

            else if(tokenName == "upmatic"){
                let liqControllerAddress = constant.upmatic.liquidityControllerAddresses;
                const contract = new ethers.Contract(
                    "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
                    [
                        'function approve(address spender, uint amount) public returns(bool)',
                        'function balanceOf(address account) external view returns (uint256)'
                    ],
                    maticProvider
                );
                let balance = await contract.balanceOf(liqControllerAddress);
                return getFullDisplayBalance(balance);
            }

            else if(tokenName == "uptether"){
                let liqControllerAddress = constant.uptether.liquidityControllerAddresses;
                const contract = new ethers.Contract(
                    "0xbfdf833e65bd8b27c84fbe55dd17f7648c532168",
                    [
                        'function approve(address spender, uint amount) public returns(bool)',
                        'function balanceOf(address account) external view returns (uint256)'
                    ],
                    maticProvider
                );
                let balance = await contract.balanceOf(liqControllerAddress);
                console.log("BALANCE : "+balance);
                return getFullDisplayBalance(balance, 6);
            }
        } catch(e) {
            console.log(e);
        }
        return 0;
    }

    async getFee (tokenName){
        try{
            if(tokenName == "root"){
                const contract = new ethers.Contract(
                    constant.root.transferGateAddresses,
                    [
                        // 'function approve(address spender, uint amount) public returns(bool)',
                        // 'function balanceOf(address account) external view returns (uint256)',
                        'function getDumpTax() external view returns (uint256)',                        
                        'function parameters() external view returns (address, uint16, uint16, uint16, address)',
                        'function poolsTaxRates(address account) external view returns (uint16)',
                    ],
                    ethProvider
                );
                
                // Buy Fee
                const params = await contract.parameters();
                const stakeRate = parseFloat(params[1].toString());
                const burnRate = parseFloat(params[2].toString());
                const devRate = parseFloat(params[3].toString());
                const totalTax = stakeRate + burnRate + devRate;
                const buyTax = totalTax/100;
                

                // Sell fee
                const poolAddress = constant.root.poolAddress;
                const dumpTax = await contract.getDumpTax();
                const poolTax = await contract.poolsTaxRates(poolAddress);
                let sellTax = parseFloat((poolTax).toString()) + parseFloat((dumpTax).toString());

                const devAndStateRate = stakeRate + devRate;
                sellTax = poolTax > burnRate ? sellTax + devAndStateRate : devAndStateRate + burnRate;
                return [parseFloat(buyTax), parseFloat(sellTax/100)]
            }
            else if(tokenName == "upbnb"){
                const contract = new ethers.Contract(
                    constant.upbnb.transferGateAddresses,
                    [
                        'function approve(address spender, uint amount) public returns(bool)',
                        'function balanceOf(address account) external view returns (uint256)',
                        'function feesRate() external view returns (uint16)',
                        'function getDumpTax() external view returns (uint256)',
                        'function poolsTaxRates(address account) external view returns (uint16)',
                    ],
                    bnbProvider
                );
                const buyTax = await contract.feesRate();

                const poolAddress = constant.upbnb.poolAddress;
                const dumpTax = await contract.getDumpTax();
                const poolTax = await contract.poolsTaxRates(poolAddress);
                let totalTax = parseFloat((poolTax).toString()) + parseFloat((dumpTax).toString());
                const sellTax = totalTax/100;                

                // console.log("Dump Tax : "+dumpTax)
                // console.log("Pool Tax : "+poolTax)
                return [parseFloat((buyTax).toString())/100, sellTax];
            }
            else if(tokenName == "upcake"){
                const contract = new ethers.Contract(
                    constant.upcake.transferGateAddresses,
                    [
                        'function approve(address spender, uint amount) public returns(bool)',
                        'function balanceOf(address account) external view returns (uint256)',
                        'function feesRate() external view returns (uint16)',
                        'function getDumpTax() external view returns (uint256)',
                        'function poolsTaxRates(address account) external view returns (uint16)',
                    ],
                    bnbProvider
                );
                const buyTax = await contract.feesRate();

                const poolAddress = constant.upcake.poolAddress;
                const dumpTax = await contract.getDumpTax();
                const poolTax = await contract.poolsTaxRates(poolAddress);
                let totalTax = parseFloat((poolTax).toString()) + parseFloat((dumpTax).toString());
                const sellTax = totalTax/100;                

                // console.log("Dump Tax : "+dumpTax)
                // console.log("Pool Tax : "+poolTax)
                return [parseFloat((buyTax).toString())/100, sellTax];
            }
            else if(tokenName == "upmatic"){
                const contract = new ethers.Contract(
                    constant.upmatic.transferGateAddresses,
                    [
                        'function approve(address spender, uint amount) public returns(bool)',
                        'function balanceOf(address account) external view returns (uint256)',
                        'function feesRate() external view returns (uint16)',
                        'function getDumpTax() external view returns (uint256)',
                        'function poolsTaxRates(address account) external view returns (uint16)',
                    ],
                    maticProvider
                );
                const buyTax = await contract.feesRate();

                const poolAddress = constant.upmatic.poolAddress;
                const dumpTax = await contract.getDumpTax();
                const poolTax = await contract.poolsTaxRates(poolAddress);
                let totalTax = parseFloat((poolTax).toString()) + parseFloat((dumpTax).toString());
                const sellTax = totalTax/100;                

                // console.log("Dump Tax : "+dumpTax)
                // console.log("Pool Tax : "+poolTax)
                return [parseFloat((buyTax).toString())/100, sellTax];
            }
            else if(tokenName == "uptether"){
                const contract = new ethers.Contract(
                    constant.uptether.transferGateAddresses,
                    [
                        'function approve(address spender, uint amount) public returns(bool)',
                        'function balanceOf(address account) external view returns (uint256)',
                        'function feesRate() external view returns (uint16)',
                        'function getDumpTax() external view returns (uint256)',
                        'function poolsTaxRates(address account) external view returns (uint16)',
                    ],
                    maticProvider
                );
                const buyTax = await contract.feesRate();

                const poolAddress = constant.uptether.poolAddress;
                const dumpTax = await contract.getDumpTax();
                const poolTax = await contract.poolsTaxRates(poolAddress);
                let totalTax = parseFloat((poolTax).toString()) + parseFloat((dumpTax).toString());
                const sellTax = totalTax/100;                

                // console.log("Dump Tax : "+dumpTax)
                // console.log("Pool Tax : "+poolTax)
                return [parseFloat((buyTax).toString())/100, sellTax];
            }
        } catch(e) {
            console.log(e);
            return [-1,-1];
        }
    }

    async connect(){
        this.provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        // Prompt user for account connections
        await this.provider.send("eth_requestAccounts", []);
        this.signer = this.provider.getSigner();
        const network = await this.provider.getNetwork();
        this.chainId = network.chainId;
        this.address = await this.signer.getAddress();
        this.provider.on("network", (newNetwork, oldNetwork) => {
            if (oldNetwork) {
                this.chainId = newNetwork.chainId;
            }
        });
        this.internalTransferContract = new ethers.Contract(this.internalTransferAddress, this.internalTransferAbi, this.signer);
    }

    // create sell order
    async createSellOrder(){
        return await this.internalTransferContract.createSellOrder("1000000000000000000", "1000000000000000");
    }

    async instantBuy(){
        return await this.internalTransferContract.instantBuy(await this.internalTransferContract.sellOrderId());
    }

    
    showLoadingSpinner() {
        const loadingSpinner = document.createElement("div");
        const loadingSpinnerImage = document.createElement("div");
        loadingSpinner.id = "loadingSpinner";
        loadingSpinnerImage.id = "loadingSpinnerImage";
        loadingSpinner.appendChild(loadingSpinnerImage);
        document.body.appendChild(loadingSpinner);
    }

    eraseLoadingSpinner() {
        const loadingSpinner = document.getElementById("loadingSpinner");
        if (loadingSpinner) {
            document.body.removeChild(loadingSpinner);
        }
    }

    testXhr() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", document.currentScript.src);
        xhr.onload = () => (this.xhrSucceeded = true);
        xhr.send();
    }

    loadMainScripts() {
        for (const url of scriptUrls) {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = url;
            script.async = false;
            script.defer = true;
            script.onload = this.onScriptLoad.bind(this);
            script.onerror = this.onScriptError.bind(this);
            script._url = url;
            document.body.appendChild(script);
        }
        this.numScripts = scriptUrls.length;
        window.addEventListener("load", this.onWindowLoad.bind(this));
        window.addEventListener("error", this.onWindowError.bind(this));
    }

    onScriptLoad() {
        if (++this.loadCount === this.numScripts) {
            PluginManager.setup($plugins);
        }
    }

    onScriptError(e) {
        this.printError("Failed to load", e.target._url);
    }

    printError(name, message) {
        this.eraseLoadingSpinner();
        if (!document.getElementById("errorPrinter")) {
            const errorPrinter = document.createElement("div");
            errorPrinter.id = "errorPrinter";
            errorPrinter.innerHTML = this.makeErrorHtml(name, message);
            document.body.appendChild(errorPrinter);
        }
    }

    makeErrorHtml(name, message) {
        const nameDiv = document.createElement("div");
        const messageDiv = document.createElement("div");
        nameDiv.id = "errorName";
        messageDiv.id = "errorMessage";
        nameDiv.innerHTML = name;
        messageDiv.innerHTML = message;
        return nameDiv.outerHTML + messageDiv.outerHTML;
    }

    onWindowLoad() {
        if (!this.xhrSucceeded) {
            const message = "Your browser does not allow to read local files.";
            this.printError("Error", message);
        } else if (this.isPathRandomized()) {
            const message = "Please move the Game.app to a different folder.";
            this.printError("Error", message);
        } else if (this.error) {
            this.printError(this.error.name, this.error.message);
        } else {
            this.initEffekseerRuntime();
        }
    }

    onWindowError(event) {
        if (!this.error) {
            this.error = event.error;
        }
    }

    isPathRandomized() {
        // [Note] We cannot save the game properly when Gatekeeper Path
        //   Randomization is in effect.
        return (
            Utils.isNwjs() &&
            process.mainModule.filename.startsWith("/private/var")
        );
    }

    initEffekseerRuntime() {
        const onLoad = this.onEffekseerLoad.bind(this);
        const onError = this.onEffekseerError.bind(this);
        effekseer.initRuntime(effekseerWasmUrl, onLoad, onError);
    }

    onEffekseerLoad() {
        this.eraseLoadingSpinner();
        SceneManager.run(Scene_Boot);
    }

    onEffekseerError() {
        this.printError("Failed to load", effekseerWasmUrl);
    }
}

const main = new Main();
main.run();

//-----------------------------------------------------------------------------
