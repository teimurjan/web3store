const shortenAddress = (address: string) => {
  const start = address.slice(0, 5);
  const end = address.slice(-4);

  return `${start}...${end}`;
};

export default shortenAddress;
