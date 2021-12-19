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