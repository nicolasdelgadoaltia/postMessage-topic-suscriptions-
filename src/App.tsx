import { useCallback, useRef, useState } from 'react';
import EventEmitter from './components/eventEmitter';
import PubSubToPostConnector from './components/connectors/pubSubToPostConnector';
import './styles.css';

const eventEmitterTopics = ['ON_CHILD_ACTION'];

export default function App() {
  const windowRef = useRef<Window>();
  const [configured, setConfigured] = useState(false);

  const createWindow = useCallback(() => {
    const newWindowRef = window.open(
      process.env.REACT_APP_NEW_WINDOW_REF,
      '_blank'
    );
    if (newWindowRef) {
      windowRef.current = newWindowRef;
      setConfigured(true);
    }
  }, []);

  return (
    <div className="App">
      {configured && windowRef.current && (
        <PubSubToPostConnector
          windowRef={windowRef.current}
          senderId={'HOST'}
          topics={['DO_CHILD_ACTION']}
        />
      )}
      <EventEmitter
        actionToSend={'DO_CHILD_ACTION'}
        topics={eventEmitterTopics}
      />
      <br />
      <br />
      {!configured && <button onClick={createWindow}>Create window</button>}
    </div>
  );
}
