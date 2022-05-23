export interface IColonyEvent {
  name: string;
  blockHash: string;
  logTime: number;
}

export interface IColonyRoleSet {
  role: string;
  userAddress: string;
  humanReadableDomainId: string;
}

export interface IColonyDomainAdded {
  humanReadableDomainId: string;
}

export interface IColonyPayoutClaimed {
  userAddress: string;
  amount: string;
  token: string;
  humanReadableFundingPotId: string;
}

export type ColonyEvent = IColonyEvent & IColonyRoleSet & IColonyDomainAdded & IColonyPayoutClaimed;

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