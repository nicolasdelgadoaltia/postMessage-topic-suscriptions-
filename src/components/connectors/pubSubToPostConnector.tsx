import usePubSubToPost from "../../hooks/pubsubToPost";

const PubSubToPostConnector = ({
  windowRef,
  senderId,
  topics
}: {
  windowRef: Window;
  senderId: string;
  topics: string[];
}) => {
  usePubSubToPost({
    topics,
    windowRef: windowRef,
    senderId
  });
  return null;
};

export default PubSubToPostConnector;
