// ColonyRoleSet
// export interface IColonyEvent{
//   userAddress: string; 
//   humanReadableDomainId: string;
//   role: string;
// }

// export interface IColonyEvent {
//   userAddress: string; 
//   amount: string;
//   token: string;
//   humanReadableFundingPotId: string;
//   humanReadableDomainId: string;
// }

// export interface IDomainAddedEvent extends IColonyEvent {
//   humanReadableDomainId: string;
// } 

export interface IColonyEvent {
  name: string;
  date: string;
  blockHash: string;
  logTime: number;
}

// export type ColonyRoleSetData = {
//   userAddress: string; 
//   humanReadableDomainId: string;
//   role: string;
//   name: string;
//   date: string;
//   blockHash: string;
//   logTime: number;
// }

export type ColonyEvent = {
  userAddress: string; 
  amount: string;
  token: string;
  humanReadableFundingPotId: string;
  humanReadableDomainId: string;
  role: string;
  name: string;
  date: string;
  blockHash: string;
  logTime: number;
}

// export type DomainAddedData = {
//   humanReadableDomainId: string;
//   name: string;
//   date: string;
//   blockHash: string;
//   logTime: number;
// }

// export type ColonyEvent = 
//   | ColonyRoleSetData 
//   | PayoutClaimedData 
//   | DomainAddedData;

export const TokenMap = new Map([
  ['0x6B175474E89094C44Da98b954EedeAC495271d0F', 'DAI'],
  ['0x0dd7b8f3d1fa88FAbAa8a04A0c7B52FC35D4312c', 'βLNY'],
])

export enum ColonyEventType {
  ColonyInitialised = 'ColonyInitialised',
  ColonyRoleSet = 'ColonyRoleSet',
  PayoutClaimed = 'PayoutClaimed',
  DomainAdded = 'DomainAdded',
}