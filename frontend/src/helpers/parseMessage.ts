type ResponseMessage<T> = {
  type: string;
  data: T | string;
  id: number;
};

export const parseMessage = <T>(
  dataMessage: string | undefined
): ResponseMessage<T> => {
  if (dataMessage) {
    let { data, id, type } = JSON.parse(dataMessage) as ResponseMessage<string>;

    if (typeof data === 'string' && data !== '') {
      data = JSON.parse(data);
    }
    return { data, id, type };
  }
  return { data: '', id: 0, type: 'error' };
};
