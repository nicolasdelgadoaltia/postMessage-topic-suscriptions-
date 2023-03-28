const namespace = "mfe-event-messages";

type topicType = string;
type listenerCallback = (data?: any) => void;

const listeners: any = {};
const listenersHandlersReference: any = {};

let callbackId = 0;

const eventListenerId = (topic: any) => `${namespace}:${topic}`;

const nextCallbackId = () => {
  callbackId = callbackId + 1;
  return callbackId;
};

const eventListenerFactory = (listeners: any, topic: any) => (event: any) => {
  listeners[topic].forEach(({ callback }: any) => {
    callback(event.detail);
  });
};

export const refreshTopicPool = (topic: topicType) => {
  window.removeEventListener(
    eventListenerId(topic),
    listenersHandlersReference[topic]
  );
  const listenerForTopic = eventListenerFactory(listeners, topic);
  listenersHandlersReference[topic] = listenerForTopic;
  window.addEventListener(
    eventListenerId(topic),
    listenersHandlersReference[topic]
  );
};

export const listen = (topic: topicType, callback: listenerCallback) => {
  const id = nextCallbackId();
  if (!listeners[topic]) {
    listeners[topic] = [{ id, callback }];
  } else {
    listeners[topic].push({ id, callback });
  }
  refreshTopicPool(topic);
  return id;
};

export const publish = (topic: topicType, data: any) => {
  window.dispatchEvent(
    new CustomEvent(`${namespace}:${topic}`, { detail: data })
  );
};

export const removeListener = (topic: topicType, id: number) => {
  const listenerToRemove = listeners[topic].find((v: any) => v.id === id);
  if (listenerToRemove) {
    listeners[topic] = listeners[topic].filter((v: any) => v.id !== id);
  }
  refreshTopicPool(topic);
};
