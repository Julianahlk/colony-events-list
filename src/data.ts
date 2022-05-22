import { utils } from 'ethers';
import { getLogs, ColonyRole } from '@colony/colony-js';
import { getBlockTime } from '@colony/colony-js';
import { ColonyEventType, TokenMap, ColonyEvent } from './types';
import { BigNumber } from 'ethers/utils';

export const getColonyEvents = async (colonyClient:any) : Promise<utils.LogDescription[]> => {
  const colonyInitFilter = colonyClient.filters.ColonyInitialised();
  const payoutClaimedFilter = colonyClient.filters.PayoutClaimed();
  const colonyRoleSetFilter = colonyClient.filters.ColonyRoleSet();
  const domainAddedFilter = colonyClient.filters.DomainAdded();

  const eventLogs1 = await getLogs(colonyClient, colonyInitFilter);
  const eventLogs2 = await getLogs(colonyClient, payoutClaimedFilter);
  const eventLogs3 = await getLogs(colonyClient, colonyRoleSetFilter);
  const eventLogs4 = await getLogs(colonyClient, domainAddedFilter);
  const combinedEventLogs = [...eventLogs1, ...eventLogs2, ...eventLogs3, ...eventLogs4];

  const parsedLogs = combinedEventLogs.map(event => {
    let parsedLog = colonyClient.interface.parseLog(event);
    const blockHash = event.blockHash;
    return { ...parsedLog, blockHash };
  });
   
  return parsedLogs;
} 

export const getFormattedLogs = async (colonyClient:any, events:utils.LogDescription[]): Promise<ColonyEvent[]> => {

 return Promise.all( 
    events.map(async (eventLog:any) => {
      const logTime = await getBlockTime(
        colonyClient.provider,
        eventLog.blockHash || ""
      );
        
      if (eventLog.name === ColonyEventType.PayoutClaimed) {
        const humanReadableAmount = new utils.BigNumber(eventLog.values.amount);
        const wei = new utils.BigNumber(10);
        const amount = humanReadableAmount.div(wei.pow(18)).toString();

        const humanReadableFundingPotId = new utils.BigNumber(
          eventLog.values.fundingPotId
        ).toString();
          
        const { associatedTypeId } = await colonyClient.getFundingPot(humanReadableFundingPotId);
        const { recipient } = await colonyClient.getPayment(associatedTypeId);
        const userAddress = recipient;
        const token = TokenMap.get(eventLog.values.token);

        return {
          ...eventLog,
          userAddress,
          humanReadableFundingPotId,
          amount,
          token,
          logTime,
        } as ColonyEvent;
      } else if (eventLog.name === ColonyEventType.DomainAdded) {
          const humanReadableDomainId = new BigNumber(
            eventLog.values.domainId
          ).toString();
        return {
          ...eventLog,
          humanReadableDomainId,
          logTime,
        } as ColonyEvent;
      } else if (eventLog.name === ColonyEventType.ColonyRoleSet) {
        const role = ColonyRole[eventLog.values.role];
        const humanReadableDomainId = new BigNumber(
          eventLog.values.domainId
        ).toString();
        const userAddress = eventLog.values.user;
        return {
          ...eventLog,
          role,
          humanReadableDomainId,
          userAddress,
          logTime,
        } as ColonyEvent;
      } else {
        return { ...eventLog, logTime } as ColonyEvent;
      }
    })
  )
}