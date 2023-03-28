import EventEmitter from "./components/eventEmitter";
import PubSubToPostConnector from "./components/connectors/pubSubToPostConnector";
import "./styles.css";

const eventEmitterTopics = ["DO_CHILD_ACTION"];

const TTT = () => {
  return (
    <div className="App">
      <PubSubToPostConnector
        windowRef={window.parent}
        senderId={"TTT"}
        topics={["ON_CHILD_ACTION"]}
      />

      <EventEmitter
        actionToSend={"ON_CHILD_ACTION"}
        topics={eventEmitterTopics}
      />
      <br />
      <br />
    </div>
  );
};

export default TTT;
