import './eventList.styles.css';
import { ColonyEvent, ColonyEventType } from '../types'; 
import Blockies from 'react-blockies';

type EventListProps = {
  events: ColonyEvent[];
}
const colonyAddress = '0xCFD3aa1EbC6119D80Ed47955a87A9d9C281A97B3';

const EventList = ({ events }: EventListProps) => {
  return (
    <div className="eventList-Container">
      {
        events.map((event, index) => {
          let date = new Date(event.logTime).toLocaleDateString('en-gb', { month:"short", day:"numeric"});
          return (
            <div className='listItem-Container' key={index}>
              <Blockies
                seed={event.userAddress || colonyAddress}
                size={8} 
                scale={5} 
                className="avatar"
              />
              <div className='right-side'>
                {event.name === ColonyEventType.ColonyInitialised &&
                  <p>Congratulations! It's a beautiful baby colony!</p>
                }
                {event.name === ColonyEventType.DomainAdded &&
                  <p>Domain <b>{event.humanReadableDomainId}</b> added</p>
                }
                {event.name === ColonyEventType.PayoutClaimed &&
                  <p>User <b>{event.userAddress}</b> claimed <b>{event.amount}{event.token}</b> payout from pot <b>{event.humanReadableFundingPotId}</b></p>
                }
                {event.name === ColonyEventType.ColonyRoleSet &&
                  <p><b>{event.role}</b> role assigned to user <b>{event.userAddress}</b> in domain <b>{event.humanReadableDomainId}</b></p>
                }
                <div className='secondary'>{date}</div>
              </div>
            </div>
          )
      })}
    </div>
  );
}

export default EventList;