export function useMultipleTokenStreams(symbols: string[]) {
  const [data, setData] = useState<Map<string, TokenData>>(new Map());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribers: (() => void)[] = [];

    const initStreams = async () => {
      try {
        setIsLoading(true);
        if (!sdsService.getConnectionStatus()) {
          await sdsService.connect();
        }

        symbols.forEach((symbol) => {
          const unsub = sdsService.subscribeToStream(symbol, (tokenData) => {
            setData((prev) => {
              const newData = new Map(prev);
              newData.set(symbol, tokenData);
              return newData;
            });
            setIsLoading(false);
          });
          unsubscribers.push(unsub);
        });
      } catch (err) {
        console.error('Gagal subscribe SDS streams:', err);
      }
    };

    initStreams();
    return () => unsubscribers.forEach((unsub) => unsub());
  }, [symbols]);

  return { data, isLoading };
}
