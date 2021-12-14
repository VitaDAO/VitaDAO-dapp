// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class ENSReverseRecords extends ethereum.SmartContract {
  static bind(address: Address): ENSReverseRecords {
    return new ENSReverseRecords("ENSReverseRecords", address);
  }

  getNames(addresses: Array<Address>): Array<string> {
    let result = super.call("getNames", "getNames(address[]):(string[])", [
      ethereum.Value.fromAddressArray(addresses)
    ]);

    return result[0].toStringArray();
  }

  try_getNames(addresses: Array<Address>): ethereum.CallResult<Array<string>> {
    let result = super.tryCall("getNames", "getNames(address[]):(string[])", [
      ethereum.Value.fromAddressArray(addresses)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toStringArray());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _ens(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}
