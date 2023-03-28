import React, { useCallback, useState } from 'react';
import usePubSub from '../libs/common-lib/hooks/usePubSub';

interface Props {
  actionToSend: string;
  topics: string[];
}

const EventEmitter = ({ actionToSend, topics }: Props) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [counter, setCounter] = useState(1);
  const { publish } = usePubSub({
    topicSubscriptions: topics.map((topic: string) => ({
      topic,
      callback: (args: any) => {
        const { message } = args;
        setMessages((state) => [...state, message]);
      },
    })),
  });

  const sendNewMessage = useCallback(() => {
    publish(actionToSend, { message: `NEW MESSAGE ${counter}` });
    setCounter((state) => state + 1);
  }, [publish, counter, actionToSend]);
  return (
    <>
      Received events
      <br />
      <textarea value={messages.map((v) => `${v}\n`)} readOnly></textarea>
      <br />
      <button onClick={sendNewMessage}>Send event</button>
    </>
  );
};

export default React.memo(EventEmitter);
