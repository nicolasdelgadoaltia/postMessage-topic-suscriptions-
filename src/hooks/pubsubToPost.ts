import { useEffect } from "react";
import usePubSub from "../libs/common-lib/hooks/usePubSub";

interface Props {
  topics: string[];
  windowRef: Window;
  senderId: string;
}
type MessageData = {
  topic: string;
  data: any;
  postMessageType?: boolean;
  senderId?: string;
};

const usePubSubToPost = ({ topics, windowRef, senderId }: Props) => {
  const topicSubscriptions = topics.map((topic) => ({
    topic,
    callback: (data: any) => {
      windowRef.postMessage({ topic, data, postMessageType: true, senderId });
    }
  }));

  const { publish } = usePubSub({ topicSubscriptions });
  useEffect(() => {
    const eventListenerCallback = (event: MessageEvent<MessageData>) => {
      // To avoid infinite loop
      if (event.data.postMessageType && event.data.senderId !== senderId) {
        const { topic, data } = event.data;
        publish(topic, data);
      }
    };
    windowRef.addEventListener("message", eventListenerCallback);
    return () => {
      windowRef.removeEventListener("message", eventListenerCallback);
    };
  }, [publish, senderId, windowRef]);
};

export default usePubSubToPost;
