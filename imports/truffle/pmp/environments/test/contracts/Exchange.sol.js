// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"_offerId","type":"uint256"}],"name":"deleteOrder","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"_offerId","type":"uint256"}],"name":"claimOrder","outputs":[{"name":"_success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"_offerCurrency","type":"address"},{"name":"_offerAmount","type":"uint256"},{"name":"_wantCurrency","type":"address"},{"name":"_wantAmount","type":"uint256"}],"name":"placeOrder","outputs":[{"name":"_offerId","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_offerId","type":"uint256"},{"name":"_offerAmount","type":"uint256"},{"name":"_wantAmount","type":"uint256"}],"name":"claimOrderPartial","outputs":[{"name":"_success","type":"bool"}],"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"currencyPair","type":"bytes32"},{"indexed":true,"name":"seller","type":"address"},{"indexed":false,"name":"offerAmount","type":"uint256"},{"indexed":true,"name":"buyer","type":"address"},{"indexed":false,"name":"wantAmount","type":"uint256"}],"name":"Traded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"currencyPair","type":"bytes32"},{"indexed":true,"name":"seller","type":"address"},{"indexed":false,"name":"offerAmount","type":"uint256"},{"indexed":true,"name":"buyer","type":"address"},{"indexed":false,"name":"wantAmount","type":"uint256"}],"name":"Partial","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}],
    binary: "60606040526001600455610a84806100176000396000f3606060405236156100825760e060020a6000350463095ea7b3811461008457806311a003271461009657806318160ddd1461022357806323b872dd1461022c5780633a3f82391461024357806370a08231146105c5578063a9059cbb14610084578063afe18413146105da578063dd62ed3e14610666578063f0543c9d14610674575b005b61022f6004356024355b600092915050565b6100826004356000818152600360209081526040808320805482516001830154600293909301547fa9059cbb000000000000000000000000000000000000000000000000000000008252600160a060020a0392831660048301526024820152925191169363a9059cbb936044848101949193929183900301908290876161da5a03f11561000257505050604051805190602001505060006003600050600083815260200190815260200160002060005060000160006101000a815481600160a060020a030219169083021790555060006003600050600083815260200190815260200160002060005060010160006101000a815481600160a060020a03021916908302179055506000600360005060008381526020019081526020016000206000506002016000508190555060006003600050600083815260200190815260200160002060005060030160006101000a815481600160a060020a03021916908302179055506000600360005060008381526020019081526020016000206000506004016000508190555050565b6105c860005481565b60005b604080519115158252519081900360200190f35b60048035600081815260036020818152604080842092830154835493870154825160e060020a6323b872dd028152600160a060020a033381169982019990995294881660248601526044850152905161022f9685949216926323b872dd9260648181019391829003018187876161da5a03f115610002575050604051511590506106b3576003600050600084815260200190815260200160002060005060010160009054906101000a9004600160a060020a0316600160a060020a031663a9059cbb3360036000506000878152602001908152602001600020600050600201600050546040518360e060020a0281526004018083600160a060020a03168152602001828152602001925050506020604051808303816000876161da5a03f1156100025750505060405180519060200150506401000000006003600050600085815260200190815260200160002060005060030160009054906101000a9004600160a060020a0316600160a060020a0316046401000000006003600050600086815260200190815260200160002060005060010160009054906101000a9004600160a060020a0316600160a060020a031604608060020a0201600102905033600160a060020a03166003600050600085815260200190815260200160002060005060000160009054906101000a9004600160a060020a0316600160a060020a031682600019167f55bd1162278904aa010f5658c5c186f65183c2b6910e922aa86f826d1c1f2bec60036000506000888152602001908152602001600020600050600201600050546003600050600089815260200190815260200160002060005060040160005054604051808381526020018281526020019250505060405180910390a460006003600050600085815260200190815260200160002060005060000160006101000a815481600160a060020a030219169083021790555060006003600050600085815260200190815260200160002060005060010160006101000a815481600160a060020a03021916908302179055506000600360005060008581526020019081526020016000206000506002016000508190555060006003600050600085815260200190815260200160002060005060030160006101000a815481600160a060020a0302191690830217905550600060036000506000858152602001908152602001600020600050600401600050819055506001915081506106b8565b60005b60408051918252519081900360200190f35b6105c8600435602435604435606435600084600160a060020a03166323b872dd3330876040518460e060020a0281526004018084600160a060020a0316815260200183600160a060020a0316815260200182815260200193505050506020604051808303816000876161da5a03f115610002575050604051511590506106be576106ca8585858561070f565b6105c860043560243561008e565b61022f6004356024356044356000838152600360205260408120600201548190841015806106a9575060408120600401548310155b1561077457610002565b600091505b50919050565b5060005b949350505050565b6106c2565b600091505b6000858152600360208190526040909120600181015460028201549282015460049290920154610a7c93600160a060020a0392831693909216905b60048054600181810183556000918252600360208190526040909220805473ffffffffffffffffffffffffffffffffffffffff199081163317825591810180548316909817909755600287019590955585018054909416929092179092559190910155565b600085815260036020526040902060048101546002919091015484029085021461079d57610002565b6000858152600360208181526040808420928301548354600494850154835160e060020a6323b872dd028152600160a060020a03338116978201979097529186166024830152604482015291519316936323b872dd936064838101949391929183900301908290876161da5a03f115610002575050604051511590506106cf576003600050600086815260200190815260200160002060005060010160009054906101000a9004600160a060020a0316600160a060020a031663a9059cbb3360036000506000898152602001908152602001600020600050600201600050546040518360e060020a0281526004018083600160a060020a03168152602001828152602001925050506020604051808303816000876161da5a03f1156100025750505060405180519060200150506401000000006003600050600087815260200190815260200160002060005060030160009054906101000a9004600160a060020a0316600160a060020a0316046401000000006003600050600088815260200190815260200160002060005060010160009054906101000a9004600160a060020a0316600160a060020a031604608060020a020160010290508360036000506000878152602001908152602001600020600050600201600082828250540392505081905550826003600050600087815260200190815260200160002060005060040160008282825054039250508190555033600160a060020a03166003600050600087815260200190815260200160002060005060000160009054906101000a9004600160a060020a0316600160a060020a031682600019167f4b61bc315ec13b7261ed1db4713334df5c13e08552846345e41549cb4120829f600360005060008a815260200190815260200160002060005060020160005054600360005060008b815260200190815260200160002060005060040160005054604051808381526020018281526020019250505060405180910390a4600191506106d4565b50939250505056",
    unlinked_binary: "60606040526001600455610a84806100176000396000f3606060405236156100825760e060020a6000350463095ea7b3811461008457806311a003271461009657806318160ddd1461022357806323b872dd1461022c5780633a3f82391461024357806370a08231146105c5578063a9059cbb14610084578063afe18413146105da578063dd62ed3e14610666578063f0543c9d14610674575b005b61022f6004356024355b600092915050565b6100826004356000818152600360209081526040808320805482516001830154600293909301547fa9059cbb000000000000000000000000000000000000000000000000000000008252600160a060020a0392831660048301526024820152925191169363a9059cbb936044848101949193929183900301908290876161da5a03f11561000257505050604051805190602001505060006003600050600083815260200190815260200160002060005060000160006101000a815481600160a060020a030219169083021790555060006003600050600083815260200190815260200160002060005060010160006101000a815481600160a060020a03021916908302179055506000600360005060008381526020019081526020016000206000506002016000508190555060006003600050600083815260200190815260200160002060005060030160006101000a815481600160a060020a03021916908302179055506000600360005060008381526020019081526020016000206000506004016000508190555050565b6105c860005481565b60005b604080519115158252519081900360200190f35b60048035600081815260036020818152604080842092830154835493870154825160e060020a6323b872dd028152600160a060020a033381169982019990995294881660248601526044850152905161022f9685949216926323b872dd9260648181019391829003018187876161da5a03f115610002575050604051511590506106b3576003600050600084815260200190815260200160002060005060010160009054906101000a9004600160a060020a0316600160a060020a031663a9059cbb3360036000506000878152602001908152602001600020600050600201600050546040518360e060020a0281526004018083600160a060020a03168152602001828152602001925050506020604051808303816000876161da5a03f1156100025750505060405180519060200150506401000000006003600050600085815260200190815260200160002060005060030160009054906101000a9004600160a060020a0316600160a060020a0316046401000000006003600050600086815260200190815260200160002060005060010160009054906101000a9004600160a060020a0316600160a060020a031604608060020a0201600102905033600160a060020a03166003600050600085815260200190815260200160002060005060000160009054906101000a9004600160a060020a0316600160a060020a031682600019167f55bd1162278904aa010f5658c5c186f65183c2b6910e922aa86f826d1c1f2bec60036000506000888152602001908152602001600020600050600201600050546003600050600089815260200190815260200160002060005060040160005054604051808381526020018281526020019250505060405180910390a460006003600050600085815260200190815260200160002060005060000160006101000a815481600160a060020a030219169083021790555060006003600050600085815260200190815260200160002060005060010160006101000a815481600160a060020a03021916908302179055506000600360005060008581526020019081526020016000206000506002016000508190555060006003600050600085815260200190815260200160002060005060030160006101000a815481600160a060020a0302191690830217905550600060036000506000858152602001908152602001600020600050600401600050819055506001915081506106b8565b60005b60408051918252519081900360200190f35b6105c8600435602435604435606435600084600160a060020a03166323b872dd3330876040518460e060020a0281526004018084600160a060020a0316815260200183600160a060020a0316815260200182815260200193505050506020604051808303816000876161da5a03f115610002575050604051511590506106be576106ca8585858561070f565b6105c860043560243561008e565b61022f6004356024356044356000838152600360205260408120600201548190841015806106a9575060408120600401548310155b1561077457610002565b600091505b50919050565b5060005b949350505050565b6106c2565b600091505b6000858152600360208190526040909120600181015460028201549282015460049290920154610a7c93600160a060020a0392831693909216905b60048054600181810183556000918252600360208190526040909220805473ffffffffffffffffffffffffffffffffffffffff199081163317825591810180548316909817909755600287019590955585018054909416929092179092559190910155565b600085815260036020526040902060048101546002919091015484029085021461079d57610002565b6000858152600360208181526040808420928301548354600494850154835160e060020a6323b872dd028152600160a060020a03338116978201979097529186166024830152604482015291519316936323b872dd936064838101949391929183900301908290876161da5a03f115610002575050604051511590506106cf576003600050600086815260200190815260200160002060005060010160009054906101000a9004600160a060020a0316600160a060020a031663a9059cbb3360036000506000898152602001908152602001600020600050600201600050546040518360e060020a0281526004018083600160a060020a03168152602001828152602001925050506020604051808303816000876161da5a03f1156100025750505060405180519060200150506401000000006003600050600087815260200190815260200160002060005060030160009054906101000a9004600160a060020a0316600160a060020a0316046401000000006003600050600088815260200190815260200160002060005060010160009054906101000a9004600160a060020a0316600160a060020a031604608060020a020160010290508360036000506000878152602001908152602001600020600050600201600082828250540392505081905550826003600050600087815260200190815260200160002060005060040160008282825054039250508190555033600160a060020a03166003600050600087815260200190815260200160002060005060000160009054906101000a9004600160a060020a0316600160a060020a031682600019167f4b61bc315ec13b7261ed1db4713334df5c13e08552846345e41549cb4120829f600360005060008a815260200190815260200160002060005060020160005054600360005060008b815260200190815260200160002060005060040160005054604051808381526020018281526020019250505060405180910390a4600191506106d4565b50939250505056",
    address: "0x794f8f779220eb231f42baa40f01784c36f2486c",
    generated_with: "2.0.9",
    contract_name: "Exchange"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("Exchange error: Please call load() first before creating new instance of this contract.");
    }

    Contract.Pudding.apply(this, arguments);
  };

  Contract.load = function(Pudding) {
    Contract.Pudding = Pudding;

    Pudding.whisk(contract_data, Contract);

    // Return itself for backwards compatibility.
    return Contract;
  }

  Contract.new = function() {
    if (Contract.Pudding == null) {
      throw new Error("Exchange error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("Exchange error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("Exchange error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.Exchange = Contract;
  }

})();
