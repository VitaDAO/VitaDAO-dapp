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

export class EmergencyNFTApproval extends ethereum.Event {
  get params(): EmergencyNFTApproval__Params {
    return new EmergencyNFTApproval__Params(this);
  }
}

export class EmergencyNFTApproval__Params {
  _event: EmergencyNFTApproval;

  constructor(event: EmergencyNFTApproval) {
    this._event = event;
  }

  get triggeredBy(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get nftContractAddresses(): Array<Address> {
    return this._event.parameters[1].value.toAddressArray();
  }

  get startIndex(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get endIndex(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class EmergencyNFTApprovalFail extends ethereum.Event {
  get params(): EmergencyNFTApprovalFail__Params {
    return new EmergencyNFTApprovalFail__Params(this);
  }
}

export class EmergencyNFTApprovalFail__Params {
  _event: EmergencyNFTApprovalFail;

  constructor(event: EmergencyNFTApprovalFail) {
    this._event = event;
  }

  get nftContractAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class EmergencyShutdown extends ethereum.Event {
  get params(): EmergencyShutdown__Params {
    return new EmergencyShutdown__Params(this);
  }
}

export class EmergencyShutdown__Params {
  _event: EmergencyShutdown;

  constructor(event: EmergencyShutdown) {
    this._event = event;
  }

  get triggeredBy(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get currentBlock(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class NFTReceived extends ethereum.Event {
  get params(): NFTReceived__Params {
    return new NFTReceived__Params(this);
  }
}

export class NFTReceived__Params {
  _event: NFTReceived;

  constructor(event: NFTReceived) {
    this._event = event;
  }

  get nftContract(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get sender(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class NFTTransferred extends ethereum.Event {
  get params(): NFTTransferred__Params {
    return new NFTTransferred__Params(this);
  }
}

export class NFTTransferred__Params {
  _event: NFTTransferred;

  constructor(event: NFTTransferred) {
    this._event = event;
  }

  get nftContract(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class NativeTokenChanged extends ethereum.Event {
  get params(): NativeTokenChanged__Params {
    return new NativeTokenChanged__Params(this);
  }
}

export class NativeTokenChanged__Params {
  _event: NativeTokenChanged;

  constructor(event: NativeTokenChanged) {
    this._event = event;
  }

  get newAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get oldAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get changedBy(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class NativeTokenTransferred extends ethereum.Event {
  get params(): NativeTokenTransferred__Params {
    return new NativeTokenTransferred__Params(this);
  }
}

export class NativeTokenTransferred__Params {
  _event: NativeTokenTransferred;

  constructor(event: NativeTokenTransferred) {
    this._event = event;
  }

  get authorizedBy(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class ProposalCreated extends ethereum.Event {
  get params(): ProposalCreated__Params {
    return new ProposalCreated__Params(this);
  }
}

export class ProposalCreated__Params {
  _event: ProposalCreated;

  constructor(event: ProposalCreated) {
    this._event = event;
  }

  get proposalId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get details(): string {
    return this._event.parameters[1].value.toString();
  }

  get vote_start(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get vote_end(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class ProposalStatusChanged extends ethereum.Event {
  get params(): ProposalStatusChanged__Params {
    return new ProposalStatusChanged__Params(this);
  }
}

export class ProposalStatusChanged__Params {
  _event: ProposalStatusChanged;

  constructor(event: ProposalStatusChanged) {
    this._event = event;
  }

  get proposalId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get newStatus(): i32 {
    return this._event.parameters[1].value.toI32();
  }
}

export class StakingAddressChanged extends ethereum.Event {
  get params(): StakingAddressChanged__Params {
    return new StakingAddressChanged__Params(this);
  }
}

export class StakingAddressChanged__Params {
  _event: StakingAddressChanged;

  constructor(event: StakingAddressChanged) {
    this._event = event;
  }

  get newAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get oldAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get changedBy(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class Voted extends ethereum.Event {
  get params(): Voted__Params {
    return new Voted__Params(this);
  }
}

export class Voted__Params {
  _event: Voted;

  constructor(event: Voted) {
    this._event = event;
  }

  get voter(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get proposalId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get weight(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get direction(): boolean {
    return this._event.parameters[3].value.toBoolean();
  }
}

export class VotingDelayChanged extends ethereum.Event {
  get params(): VotingDelayChanged__Params {
    return new VotingDelayChanged__Params(this);
  }
}

export class VotingDelayChanged__Params {
  _event: VotingDelayChanged;

  constructor(event: VotingDelayChanged) {
    this._event = event;
  }

  get newDuration(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class VotingDurationChanged extends ethereum.Event {
  get params(): VotingDurationChanged__Params {
    return new VotingDurationChanged__Params(this);
  }
}

export class VotingDurationChanged__Params {
  _event: VotingDurationChanged;

  constructor(event: VotingDurationChanged) {
    this._event = event;
  }

  get newDuration(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class Raphael__getProposalDataResult {
  value0: string;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;
  value5: i32;

  constructor(
    value0: string,
    value1: BigInt,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt,
    value5: i32
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromString(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    map.set(
      "value5",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value5))
    );
    return map;
  }
}

export class Raphael extends ethereum.SmartContract {
  static bind(address: Address): Raphael {
    return new Raphael("Raphael", address);
  }

  CREATE_TO_VOTE_PROPOSAL_DELAY(): BigInt {
    let result = super.call(
      "CREATE_TO_VOTE_PROPOSAL_DELAY",
      "CREATE_TO_VOTE_PROPOSAL_DELAY():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_CREATE_TO_VOTE_PROPOSAL_DELAY(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "CREATE_TO_VOTE_PROPOSAL_DELAY",
      "CREATE_TO_VOTE_PROPOSAL_DELAY():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  MAX_DURATION(): BigInt {
    let result = super.call("MAX_DURATION", "MAX_DURATION():(uint256)", []);

    return result[0].toBigInt();
  }

  try_MAX_DURATION(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("MAX_DURATION", "MAX_DURATION():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  MIN_DURATION(): BigInt {
    let result = super.call("MIN_DURATION", "MIN_DURATION():(uint256)", []);

    return result[0].toBigInt();
  }

  try_MIN_DURATION(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("MIN_DURATION", "MIN_DURATION():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  VOTING_DURATION(): BigInt {
    let result = super.call(
      "VOTING_DURATION",
      "VOTING_DURATION():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_VOTING_DURATION(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "VOTING_DURATION",
      "VOTING_DURATION():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getDidVote(proposalIndex: BigInt): boolean {
    let result = super.call("getDidVote", "getDidVote(uint256):(bool)", [
      ethereum.Value.fromUnsignedBigInt(proposalIndex)
    ]);

    return result[0].toBoolean();
  }

  try_getDidVote(proposalIndex: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall("getDidVote", "getDidVote(uint256):(bool)", [
      ethereum.Value.fromUnsignedBigInt(proposalIndex)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  getMinVotesNeeded(): BigInt {
    let result = super.call(
      "getMinVotesNeeded",
      "getMinVotesNeeded():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getMinVotesNeeded(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getMinVotesNeeded",
      "getMinVotesNeeded():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getNativeTokenAddress(): Address {
    let result = super.call(
      "getNativeTokenAddress",
      "getNativeTokenAddress():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_getNativeTokenAddress(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getNativeTokenAddress",
      "getNativeTokenAddress():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getNativeTokenBalance(): BigInt {
    let result = super.call(
      "getNativeTokenBalance",
      "getNativeTokenBalance():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getNativeTokenBalance(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getNativeTokenBalance",
      "getNativeTokenBalance():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getNftContractAddresses(): Array<Address> {
    let result = super.call(
      "getNftContractAddresses",
      "getNftContractAddresses():(address[])",
      []
    );

    return result[0].toAddressArray();
  }

  try_getNftContractAddresses(): ethereum.CallResult<Array<Address>> {
    let result = super.tryCall(
      "getNftContractAddresses",
      "getNftContractAddresses():(address[])",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddressArray());
  }

  getProposalData(proposalIndex: BigInt): Raphael__getProposalDataResult {
    let result = super.call(
      "getProposalData",
      "getProposalData(uint256):(string,uint256,uint256,uint256,uint256,uint8)",
      [ethereum.Value.fromUnsignedBigInt(proposalIndex)]
    );

    return new Raphael__getProposalDataResult(
      result[0].toString(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt(),
      result[5].toI32()
    );
  }

  try_getProposalData(
    proposalIndex: BigInt
  ): ethereum.CallResult<Raphael__getProposalDataResult> {
    let result = super.tryCall(
      "getProposalData",
      "getProposalData(uint256):(string,uint256,uint256,uint256,uint256,uint8)",
      [ethereum.Value.fromUnsignedBigInt(proposalIndex)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Raphael__getProposalDataResult(
        value[0].toString(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toBigInt(),
        value[5].toI32()
      )
    );
  }

  getProposalResult(proposalIndex: BigInt): boolean {
    let result = super.call(
      "getProposalResult",
      "getProposalResult(uint256):(bool)",
      [ethereum.Value.fromUnsignedBigInt(proposalIndex)]
    );

    return result[0].toBoolean();
  }

  try_getProposalResult(proposalIndex: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "getProposalResult",
      "getProposalResult(uint256):(bool)",
      [ethereum.Value.fromUnsignedBigInt(proposalIndex)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  getStakingAddress(): Address {
    let result = super.call(
      "getStakingAddress",
      "getStakingAddress():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_getStakingAddress(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getStakingAddress",
      "getStakingAddress():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  isShutdown(): boolean {
    let result = super.call("isShutdown", "isShutdown():(bool)", []);

    return result[0].toBoolean();
  }

  try_isShutdown(): ethereum.CallResult<boolean> {
    let result = super.tryCall("isShutdown", "isShutdown():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  onERC721Received(
    operator: Address,
    from: Address,
    tokenId: BigInt,
    data: Bytes
  ): Bytes {
    let result = super.call(
      "onERC721Received",
      "onERC721Received(address,address,uint256,bytes):(bytes4)",
      [
        ethereum.Value.fromAddress(operator),
        ethereum.Value.fromAddress(from),
        ethereum.Value.fromUnsignedBigInt(tokenId),
        ethereum.Value.fromBytes(data)
      ]
    );

    return result[0].toBytes();
  }

  try_onERC721Received(
    operator: Address,
    from: Address,
    tokenId: BigInt,
    data: Bytes
  ): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "onERC721Received",
      "onERC721Received(address,address,uint256,bytes):(bytes4)",
      [
        ethereum.Value.fromAddress(operator),
        ethereum.Value.fromAddress(from),
        ethereum.Value.fromUnsignedBigInt(tokenId),
        ethereum.Value.fromBytes(data)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  proposalCount(): BigInt {
    let result = super.call("proposalCount", "proposalCount():(uint256)", []);

    return result[0].toBigInt();
  }

  try_proposalCount(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "proposalCount",
      "proposalCount():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  transferNFT(
    nftContractAddress: Address,
    recipient: Address,
    tokenId: BigInt
  ): boolean {
    let result = super.call(
      "transferNFT",
      "transferNFT(address,address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(nftContractAddress),
        ethereum.Value.fromAddress(recipient),
        ethereum.Value.fromUnsignedBigInt(tokenId)
      ]
    );

    return result[0].toBoolean();
  }

  try_transferNFT(
    nftContractAddress: Address,
    recipient: Address,
    tokenId: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "transferNFT",
      "transferNFT(address,address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(nftContractAddress),
        ethereum.Value.fromAddress(recipient),
        ethereum.Value.fromUnsignedBigInt(tokenId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  transferNativeToken(to: Address, amount: BigInt): boolean {
    let result = super.call(
      "transferNativeToken",
      "transferNativeToken(address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(to),
        ethereum.Value.fromUnsignedBigInt(amount)
      ]
    );

    return result[0].toBoolean();
  }

  try_transferNativeToken(
    to: Address,
    amount: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "transferNativeToken",
      "transferNativeToken(address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(to),
        ethereum.Value.fromUnsignedBigInt(amount)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
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
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class CreateProposalCall extends ethereum.Call {
  get inputs(): CreateProposalCall__Inputs {
    return new CreateProposalCall__Inputs(this);
  }

  get outputs(): CreateProposalCall__Outputs {
    return new CreateProposalCall__Outputs(this);
  }
}

export class CreateProposalCall__Inputs {
  _call: CreateProposalCall;

  constructor(call: CreateProposalCall) {
    this._call = call;
  }

  get details(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class CreateProposalCall__Outputs {
  _call: CreateProposalCall;

  constructor(call: CreateProposalCall) {
    this._call = call;
  }
}

export class EmergencyNftApprovalCall extends ethereum.Call {
  get inputs(): EmergencyNftApprovalCall__Inputs {
    return new EmergencyNftApprovalCall__Inputs(this);
  }

  get outputs(): EmergencyNftApprovalCall__Outputs {
    return new EmergencyNftApprovalCall__Outputs(this);
  }
}

export class EmergencyNftApprovalCall__Inputs {
  _call: EmergencyNftApprovalCall;

  constructor(call: EmergencyNftApprovalCall) {
    this._call = call;
  }

  get startIndex(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get endIndex(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class EmergencyNftApprovalCall__Outputs {
  _call: EmergencyNftApprovalCall;

  constructor(call: EmergencyNftApprovalCall) {
    this._call = call;
  }
}

export class EmergencyProposalCancellationCall extends ethereum.Call {
  get inputs(): EmergencyProposalCancellationCall__Inputs {
    return new EmergencyProposalCancellationCall__Inputs(this);
  }

  get outputs(): EmergencyProposalCancellationCall__Outputs {
    return new EmergencyProposalCancellationCall__Outputs(this);
  }
}

export class EmergencyProposalCancellationCall__Inputs {
  _call: EmergencyProposalCancellationCall;

  constructor(call: EmergencyProposalCancellationCall) {
    this._call = call;
  }

  get startIndex(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get endIndex(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class EmergencyProposalCancellationCall__Outputs {
  _call: EmergencyProposalCancellationCall;

  constructor(call: EmergencyProposalCancellationCall) {
    this._call = call;
  }
}

export class EmergencyShutdownCall extends ethereum.Call {
  get inputs(): EmergencyShutdownCall__Inputs {
    return new EmergencyShutdownCall__Inputs(this);
  }

  get outputs(): EmergencyShutdownCall__Outputs {
    return new EmergencyShutdownCall__Outputs(this);
  }
}

export class EmergencyShutdownCall__Inputs {
  _call: EmergencyShutdownCall;

  constructor(call: EmergencyShutdownCall) {
    this._call = call;
  }
}

export class EmergencyShutdownCall__Outputs {
  _call: EmergencyShutdownCall;

  constructor(call: EmergencyShutdownCall) {
    this._call = call;
  }
}

export class MintNativeTokenCall extends ethereum.Call {
  get inputs(): MintNativeTokenCall__Inputs {
    return new MintNativeTokenCall__Inputs(this);
  }

  get outputs(): MintNativeTokenCall__Outputs {
    return new MintNativeTokenCall__Outputs(this);
  }
}

export class MintNativeTokenCall__Inputs {
  _call: MintNativeTokenCall;

  constructor(call: MintNativeTokenCall) {
    this._call = call;
  }

  get _amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class MintNativeTokenCall__Outputs {
  _call: MintNativeTokenCall;

  constructor(call: MintNativeTokenCall) {
    this._call = call;
  }
}

export class OnERC721ReceivedCall extends ethereum.Call {
  get inputs(): OnERC721ReceivedCall__Inputs {
    return new OnERC721ReceivedCall__Inputs(this);
  }

  get outputs(): OnERC721ReceivedCall__Outputs {
    return new OnERC721ReceivedCall__Outputs(this);
  }
}

export class OnERC721ReceivedCall__Inputs {
  _call: OnERC721ReceivedCall;

  constructor(call: OnERC721ReceivedCall) {
    this._call = call;
  }

  get operator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get from(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get data(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class OnERC721ReceivedCall__Outputs {
  _call: OnERC721ReceivedCall;

  constructor(call: OnERC721ReceivedCall) {
    this._call = call;
  }

  get value0(): Bytes {
    return this._call.outputValues[0].value.toBytes();
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SetMinVotesNeededCall extends ethereum.Call {
  get inputs(): SetMinVotesNeededCall__Inputs {
    return new SetMinVotesNeededCall__Inputs(this);
  }

  get outputs(): SetMinVotesNeededCall__Outputs {
    return new SetMinVotesNeededCall__Outputs(this);
  }
}

export class SetMinVotesNeededCall__Inputs {
  _call: SetMinVotesNeededCall;

  constructor(call: SetMinVotesNeededCall) {
    this._call = call;
  }

  get newVotesNeeded(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetMinVotesNeededCall__Outputs {
  _call: SetMinVotesNeededCall;

  constructor(call: SetMinVotesNeededCall) {
    this._call = call;
  }
}

export class SetNativeTokenAddressCall extends ethereum.Call {
  get inputs(): SetNativeTokenAddressCall__Inputs {
    return new SetNativeTokenAddressCall__Inputs(this);
  }

  get outputs(): SetNativeTokenAddressCall__Outputs {
    return new SetNativeTokenAddressCall__Outputs(this);
  }
}

export class SetNativeTokenAddressCall__Inputs {
  _call: SetNativeTokenAddressCall;

  constructor(call: SetNativeTokenAddressCall) {
    this._call = call;
  }

  get tokenContractAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetNativeTokenAddressCall__Outputs {
  _call: SetNativeTokenAddressCall;

  constructor(call: SetNativeTokenAddressCall) {
    this._call = call;
  }
}

export class SetProposalToCancelledCall extends ethereum.Call {
  get inputs(): SetProposalToCancelledCall__Inputs {
    return new SetProposalToCancelledCall__Inputs(this);
  }

  get outputs(): SetProposalToCancelledCall__Outputs {
    return new SetProposalToCancelledCall__Outputs(this);
  }
}

export class SetProposalToCancelledCall__Inputs {
  _call: SetProposalToCancelledCall;

  constructor(call: SetProposalToCancelledCall) {
    this._call = call;
  }

  get proposalIndex(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetProposalToCancelledCall__Outputs {
  _call: SetProposalToCancelledCall;

  constructor(call: SetProposalToCancelledCall) {
    this._call = call;
  }
}

export class SetProposalToResolvedCall extends ethereum.Call {
  get inputs(): SetProposalToResolvedCall__Inputs {
    return new SetProposalToResolvedCall__Inputs(this);
  }

  get outputs(): SetProposalToResolvedCall__Outputs {
    return new SetProposalToResolvedCall__Outputs(this);
  }
}

export class SetProposalToResolvedCall__Inputs {
  _call: SetProposalToResolvedCall;

  constructor(call: SetProposalToResolvedCall) {
    this._call = call;
  }

  get proposalIndex(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetProposalToResolvedCall__Outputs {
  _call: SetProposalToResolvedCall;

  constructor(call: SetProposalToResolvedCall) {
    this._call = call;
  }
}

export class SetStakingAddressCall extends ethereum.Call {
  get inputs(): SetStakingAddressCall__Inputs {
    return new SetStakingAddressCall__Inputs(this);
  }

  get outputs(): SetStakingAddressCall__Outputs {
    return new SetStakingAddressCall__Outputs(this);
  }
}

export class SetStakingAddressCall__Inputs {
  _call: SetStakingAddressCall;

  constructor(call: SetStakingAddressCall) {
    this._call = call;
  }

  get _stakingContractAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetStakingAddressCall__Outputs {
  _call: SetStakingAddressCall;

  constructor(call: SetStakingAddressCall) {
    this._call = call;
  }
}

export class SetVotingDelayDurationCall extends ethereum.Call {
  get inputs(): SetVotingDelayDurationCall__Inputs {
    return new SetVotingDelayDurationCall__Inputs(this);
  }

  get outputs(): SetVotingDelayDurationCall__Outputs {
    return new SetVotingDelayDurationCall__Outputs(this);
  }
}

export class SetVotingDelayDurationCall__Inputs {
  _call: SetVotingDelayDurationCall;

  constructor(call: SetVotingDelayDurationCall) {
    this._call = call;
  }

  get newDuration(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetVotingDelayDurationCall__Outputs {
  _call: SetVotingDelayDurationCall;

  constructor(call: SetVotingDelayDurationCall) {
    this._call = call;
  }
}

export class SetVotingDurationCall extends ethereum.Call {
  get inputs(): SetVotingDurationCall__Inputs {
    return new SetVotingDurationCall__Inputs(this);
  }

  get outputs(): SetVotingDurationCall__Outputs {
    return new SetVotingDurationCall__Outputs(this);
  }
}

export class SetVotingDurationCall__Inputs {
  _call: SetVotingDurationCall;

  constructor(call: SetVotingDurationCall) {
    this._call = call;
  }

  get newDuration(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetVotingDurationCall__Outputs {
  _call: SetVotingDurationCall;

  constructor(call: SetVotingDurationCall) {
    this._call = call;
  }
}

export class TransferNFTCall extends ethereum.Call {
  get inputs(): TransferNFTCall__Inputs {
    return new TransferNFTCall__Inputs(this);
  }

  get outputs(): TransferNFTCall__Outputs {
    return new TransferNFTCall__Outputs(this);
  }
}

export class TransferNFTCall__Inputs {
  _call: TransferNFTCall;

  constructor(call: TransferNFTCall) {
    this._call = call;
  }

  get nftContractAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get recipient(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferNFTCall__Outputs {
  _call: TransferNFTCall;

  constructor(call: TransferNFTCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class TransferNativeTokenCall extends ethereum.Call {
  get inputs(): TransferNativeTokenCall__Inputs {
    return new TransferNativeTokenCall__Inputs(this);
  }

  get outputs(): TransferNativeTokenCall__Outputs {
    return new TransferNativeTokenCall__Outputs(this);
  }
}

export class TransferNativeTokenCall__Inputs {
  _call: TransferNativeTokenCall;

  constructor(call: TransferNativeTokenCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class TransferNativeTokenCall__Outputs {
  _call: TransferNativeTokenCall;

  constructor(call: TransferNativeTokenCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class UpdateProposalStatusCall extends ethereum.Call {
  get inputs(): UpdateProposalStatusCall__Inputs {
    return new UpdateProposalStatusCall__Inputs(this);
  }

  get outputs(): UpdateProposalStatusCall__Outputs {
    return new UpdateProposalStatusCall__Outputs(this);
  }
}

export class UpdateProposalStatusCall__Inputs {
  _call: UpdateProposalStatusCall;

  constructor(call: UpdateProposalStatusCall) {
    this._call = call;
  }

  get proposalIndex(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class UpdateProposalStatusCall__Outputs {
  _call: UpdateProposalStatusCall;

  constructor(call: UpdateProposalStatusCall) {
    this._call = call;
  }
}

export class VoteCall extends ethereum.Call {
  get inputs(): VoteCall__Inputs {
    return new VoteCall__Inputs(this);
  }

  get outputs(): VoteCall__Outputs {
    return new VoteCall__Outputs(this);
  }
}

export class VoteCall__Inputs {
  _call: VoteCall;

  constructor(call: VoteCall) {
    this._call = call;
  }

  get proposalIndex(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _vote(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class VoteCall__Outputs {
  _call: VoteCall;

  constructor(call: VoteCall) {
    this._call = call;
  }
}
