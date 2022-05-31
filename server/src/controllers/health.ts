type HealtResponse = {
  message: string;
};

export const getMessage = (): HealtResponse => {
  return {
    message: "Running Super Ok!",
  };
};
