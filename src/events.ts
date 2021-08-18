import apis from './apis';

export interface WebviewMessage {
  method: 'request';
  params: any;
}

const events = async (message: WebviewMessage): Promise<any> => {
  switch (message.method) {
    case 'request': {
      const data = message?.params?.api ? await apis[message.params.api]() : null;
      return data;
    }
    default:
      return null;
  }
};

export default events;
