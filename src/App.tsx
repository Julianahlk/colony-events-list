import { useState, useEffect } from 'react';
import { ColonyClient } from '@colony/colony-js';
import { getColonyEvents, getFormattedLogs } from './data';
import EventList from './components/eventsList.component';
import { ColonyEvent } from './types';
import colonyClient from './colonyClient';
import './App.css';

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
        // sort in reverse chronological order
        formattedLogs.sort((a, b) => b.logTime - a.logTime)
        setEvents(formattedLogs);
      };
      fetchEvents();
    }
  }, [client]);

  return (
    <div className="AppContainer">
      <EventList events={events}></EventList>
    </div>
  );
};

export default App;
