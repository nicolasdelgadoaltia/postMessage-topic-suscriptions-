import { TopicSubscription } from "../types";
interface Props {
  topicSubscriptions?: TopicSubscription[];
}
declare const usePubSub: ({
  topicSubscriptions
}: Props) => {
  publish: <T>(topic: string, data: T) => void;
  refreshSubscriptions: (topicSubscriptions: TopicSubscription[]) => void;
};
export default usePubSub;
