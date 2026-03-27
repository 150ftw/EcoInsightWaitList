import { useState, useEffect, useRef } from 'react';

// Real-time market data base values for realistic simulation
const BASE_INDICES = {
  Nifty: 22819.60,
  Sensex: 73583.22,
  USDINR: 94.65,
};

export const useMarketData = () => {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dataRef = useRef([]);

  useEffect(() => {
    let mounted = true;

    // Fetch crypto directly from Binance API (no CORS issues for public endpoints)
    const fetchCrypto = async () => {
      try {
        const res = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbols=%5B%22BTCUSDT%22,%22ETHUSDT%22,%22SOLUSDT%22%5D');
        const data = await res.json();
        
        if (!mounted) return [];

        return data.map(coin => {
          let label = coin.symbol.replace('USDT', '');
          let value = parseFloat(coin.lastPrice).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: label === 'BTC' ? 0 : 2
          });
          let change = parseFloat(coin.priceChangePercent);
          
          return {
            id: coin.symbol,
            label: label,
            value: value,
            changePercent: `${change > 0 ? '+' : ''}${change.toFixed(2)}%`,
            trend: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral'
          };
        });
      } catch (error) {
        console.error("Failed to fetch crypto", error);
        return [];
      }
    };

    // Initialize data
    const initData = async () => {
      const cyptoData = await fetchCrypto();
      
      const initialIndices = Object.entries(BASE_INDICES).map(([key, val]) => ({
        id: key,
        label: key === 'USDINR' ? 'USD/INR' : key,
        value: key === 'USDINR' ? `₹${val.toFixed(2)}` : val.toLocaleString('en-IN'),
        changePercent: '+0.00%',
        trend: 'neutral',
        rawVal: val,
      }));

      const combinedData = [...initialIndices, ...cyptoData];
      
      if (mounted) {
        setMarketData(combinedData);
        dataRef.current = combinedData;
        setLoading(false);
      }
    };

    initData();

    // Pulse: Update the simulated indices every 3.5 seconds
    const interval = setInterval(() => {
      const currentData = [...dataRef.current];
      
      const updatedData = currentData.map(item => {
        // Only simulate indices (Nifty, Sensex, USDINR)
        if (BASE_INDICES[item.id]) {
          const isForex = item.id === 'USDINR';
          const maxVolatility = isForex ? 0.0005 : 0.001; // Tiny fluctuations
          
          const changeFactor = 1 + (Math.random() * maxVolatility * 2 - maxVolatility);
          const newVal = item.rawVal * changeFactor;
          
          const percentChange = ((newVal - BASE_INDICES[item.id]) / BASE_INDICES[item.id]) * 100;
          
          return {
            ...item,
            value: isForex ? `₹${newVal.toFixed(3)}` : newVal.toLocaleString('en-IN', { maximumFractionDigits: 1 }),
            changePercent: `${percentChange > 0 ? '+' : ''}${percentChange.toFixed(2)}%`,
            trend: percentChange > 0 ? 'up' : percentChange < 0 ? 'down' : 'neutral',
            rawVal: newVal,
          };
        }
        return item; // Keep crypto as fetched, until next big poll
      });
      
      if (mounted) {
        setMarketData(updatedData);
        dataRef.current = updatedData;
      }
    }, 3500);

    // Poll Binance every 60 seconds
    const cryptoInterval = setInterval(async () => {
      const newCrypto = await fetchCrypto();
      if (!mounted) return;
      
      const currentData = [...dataRef.current];
      const updatedData = currentData.map(item => {
        const matchedCrypto = newCrypto.find(c => c.id === item.id);
        if (matchedCrypto) return matchedCrypto;
        return item;
      });

      setMarketData(updatedData);
      dataRef.current = updatedData;
    }, 60000);

    return () => {
      mounted = false;
      clearInterval(interval);
      clearInterval(cryptoInterval);
    };
  }, []);

  return { marketData, loading };
};
