type ResponseMessage<T> = {
  type: string;
  data: T | string;
  id: number;
};

export const parseMessage = <T>(
  dataMessage: string | undefined
): ResponseMessage<T> => {
  if (dataMessage) {
    const result = JSON.parse(dataMessage) as ResponseMessage<string>;

    if (typeof result.data === 'string' && result.data !== '') {
      result.data = JSON.parse(result.data);
    }
    return { ...result };
  }
  return { data: '', id: 0, type: 'error' };
};
