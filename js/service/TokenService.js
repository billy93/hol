const constant = require("../constants/index.js");
const bnbProvider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.ninicoin.io/');
const maticProvider = new ethers.providers.JsonRpcProvider('https://rpc-mainnet.maticvigil.com/');
const ethProvider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');

const getFullDisplayBalance = (balance, decimals = 18) => {
    return new ethers.BigNumber.from(balance).div(new ethers.BigNumber.from(10).pow(decimals))
}

function doRequest(url) {
    const request = require('request')

    return new Promise(function (resolve, reject) {
        request(url, function (error, res, body) {
        if (!error && res.statusCode == 200) {
            resolve(body);
        } else {
            reject(error);
        }
        });
    });
}

module.exports = { 
    getBalance: async function (tokenName) {
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
    },
    getFee: async function (tokenName){
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
    },
    getPrice: async function(tokenName){
        if(tokenName == "root"){
            const router = new ethers.Contract(
                constant.root.routerAddress,
                [
                    'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
                    'function getAmountsIn(uint amountOut, address[] calldata path) external view returns (uint[] memory amounts)',
                    'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
                    'function swapExactTokensForTokensSupportingFeeOnTransferTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline) external'
                
                ],
                ethProvider
            );

            const getPrice = await doRequest('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT');
            const price = JSON.parse(getPrice).price;
            const tokenIn = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
            const tokenOut = constant.root.rootedAddress;
            const amounts = await router.getAmountsOut("1", [tokenIn, tokenOut]);
            console.log(amounts[1].toNumber());
            const upTokenPrice = price / parseFloat(amounts[1].toString())

            return [price, amounts[1].toString(), upTokenPrice];
        }
        else if(tokenName == "upbnb"){
            const router = new ethers.Contract(
                constant.upbnb.routerAddress,
                [
                    'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
                    'function getAmountsIn(uint amountOut, address[] calldata path) external view returns (uint[] memory amounts)',
                    'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
                    'function swapExactTokensForTokensSupportingFeeOnTransferTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline) external'
                
                ],
                bnbProvider
            );

            const getPrice = await doRequest('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT');
            const price = JSON.parse(getPrice).price;

            const tokenIn = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
            const tokenOut = constant.upbnb.rootedAddress;
            const amounts = await router.getAmountsOut(1, [tokenIn, tokenOut]);

            const upTokenPrice = price / parseFloat(amounts[1].toString())

            return [price, amounts[1].toString(), upTokenPrice];
        }
        else if(tokenName == "upcake"){
            const router = new ethers.Contract(
                constant.upcake.routerAddress,
                [
                    'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
                    'function getAmountsIn(uint amountOut, address[] calldata path) external view returns (uint[] memory amounts)',
                    'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
                    'function swapExactTokensForTokensSupportingFeeOnTransferTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline) external'
                
                ],
                bnbProvider
            );

            const getPrice = await doRequest('https://api.binance.com/api/v3/ticker/price?symbol=CAKEUSDT');
            const price = JSON.parse(getPrice).price;

            const tokenIn = "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82";
            const tokenOut = constant.upcake.rootedAddress;
            const amounts = await router.getAmountsOut(1, [tokenIn, tokenOut]);

            const upTokenPrice = price / parseFloat(amounts[1].toString())

            return [price, amounts[1].toString(), upTokenPrice];
        }
        else if(tokenName == "upmatic"){
            const router = new ethers.Contract(
                constant.upmatic.routerAddress,
                [
                    'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
                    'function getAmountsIn(uint amountOut, address[] calldata path) external view returns (uint[] memory amounts)',
                    'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
                    'function swapExactTokensForTokensSupportingFeeOnTransferTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline) external'
                
                ],
                maticProvider
            );

            const getPrice = await doRequest('https://api.binance.com/api/v3/ticker/price?symbol=MATICUSDT');
            const price = JSON.parse(getPrice).price;

            const tokenIn = "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270";
            const tokenOut = constant.upmatic.rootedAddress;
            const amounts = await router.getAmountsOut(1, [tokenIn, tokenOut]);

            const upTokenPrice = price / parseFloat(amounts[1].toString())

            return [price, amounts[1].toString(), upTokenPrice];
        }
    }
}