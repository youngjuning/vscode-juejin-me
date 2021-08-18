import apis from './apis';

export interface WebviewMessage {
  type: 'request';
  api: keyof typeof apis;
}

const events = async (message: WebviewMessage): Promise<any> => {
  switch (message.type) {
    case 'request': {
      const data = await apis[message.api]();
      return data;
    }
    default:
      return null;
  }
};

export default events;
