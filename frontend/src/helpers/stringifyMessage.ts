type PropsStringifyMessage<T> = {
  type: string;
  data: T;
};

export const stringifyMessage = <T>({
  data,
  type,
}: PropsStringifyMessage<T>): string => {
  const dataString = JSON.stringify(data);

  const responseTurn = JSON.stringify({
    type,
    data: dataString,
    id: 0,
  });

  return responseTurn;
};
