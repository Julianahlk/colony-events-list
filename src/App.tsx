import colonyClient from './colonyClient';
import { ColonyClient } from '@colony/colony-js';
import { getColonyEvents, getFormattedLogs } from './data';
import { useState, useEffect } from 'react';
import EventList from './components/eventsList.component';
import './App.css';
import { ColonyEvent } from './types';

const App = () => {

  const [events, setEvents] = useState<ColonyEvent[]>([]);
  const [client, setClient] = useState<ColonyClient>();

  useEffect(() => {
    const fetchClient = async () => {
      const client = await colonyClient();
      setClient(client);
    };
    fetchClient();
  }, [])

  useEffect(() => {
    if (client) {
      const fetchEvents = async () => {
        const colonyEvents = await getColonyEvents(client);
        const formattedLogs = await getFormattedLogs(client, colonyEvents);
        console.log(formattedLogs);
        // sort in reverse chronological order
        formattedLogs.sort((a, b) => b.logTime - a.logTime)
        setEvents(formattedLogs);
      };
      fetchEvents();
    }
  }, [client])

  return (
    <div className="App-container">
      <EventList events={events}/>
    </div>
  );
}

export default App;
