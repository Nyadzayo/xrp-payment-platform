import { useState, useEffect } from 'react';
import { Currency } from '@/types';
import { useExchangeRateStore } from '@/store/useExchangeRateStore';
import { formatCurrency, formatXRP } from '@/lib/utils';
import { ArrowDownUp } from 'lucide-react';

interface CurrencyConverterProps {
  defaultAmount?: number;
  defaultFrom?: Currency;
  defaultTo?: Currency;
  onConvert?: (amount: number, from: Currency, to: Currency, result: number) => void;
}

export function CurrencyConverter({
  defaultAmount = 0,
  defaultFrom = 'XRP',
  defaultTo = 'USD',
  onConvert
}: CurrencyConverterProps) {
  const [amount, setAmount] = useState(defaultAmount);
  const [fromCurrency, setFromCurrency] = useState<Currency>(defaultFrom);
  const [toCurrency, setToCurrency] = useState<Currency>(defaultTo);
  
  const { convertAmount, getRate } = useExchangeRateStore();
  const rate = getRate(fromCurrency, toCurrency);
  const convertedAmount = convertAmount(amount, fromCurrency, toCurrency);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  useEffect(() => {
    if (convertedAmount && onConvert) {
      onConvert(amount, fromCurrency, toCurrency, convertedAmount);
    }
  }, [amount, fromCurrency, toCurrency, convertedAmount, onConvert]);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-md"
            min="0"
            step="0.000001"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value as Currency)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="XRP">XRP</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
            </select>
          </div>

          <button
            onClick={handleSwap}
            className="mt-6 p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowDownUp className="w-4 h-4" />
          </button>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value as Currency)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="XRP">XRP</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
            </select>
          </div>
        </div>

        {rate && (
          <div className="text-sm text-gray-500">
            Rate: 1 {fromCurrency} = {rate.toFixed(6)} {toCurrency}
          </div>
        )}

        {convertedAmount && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <div className="text-sm text-gray-500">Converted Amount</div>
            <div className="text-lg font-semibold">
              {toCurrency === 'XRP' 
                ? formatXRP(convertedAmount)
                : formatCurrency(convertedAmount, toCurrency)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}