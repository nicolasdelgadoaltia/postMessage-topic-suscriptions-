import { useCallback, useEffect, useRef } from "react";
import { TopicSubscription } from "../types";
import { listen, publish, removeListener } from "../utils/pubsub";

interface Props {
  topicSubscriptions?: TopicSubscription[];
}

const usePubSub = ({ topicSubscriptions }: Props) => {
  const listeners = useRef<Array<any>>();

  const removeListeners = useCallback(() => {
    if (listeners.current && listeners.current.length > 0) {
      listeners.current.forEach(({ topic, id }) => removeListener(topic, id));
    }
    listeners.current = [];
  }, []);

  const subscribeAll = useCallback(
    (topicSubscriptions: TopicSubscription[], firstTime = false) => {
      const newListeners = topicSubscriptions.map(({ topic, callback }) => ({
        topic,
        id: listen(topic, callback),
      }));
      listeners.current = [...newListeners];
    },
    []
  );

  const refreshSubscriptions = useCallback(
    (topicSubscriptions: TopicSubscription[]) => {
      removeListeners();
      if (topicSubscriptions && topicSubscriptions.length > 0) {
        subscribeAll(topicSubscriptions);
      }
    },
    []
  );

  useEffect(() => {
    if (topicSubscriptions && topicSubscriptions.length > 0) {
      subscribeAll(topicSubscriptions, true);
    }
    return () => {
      removeListeners();
    };
  }, []);

  return { publish, refreshSubscriptions };
};

export default usePubSub;
