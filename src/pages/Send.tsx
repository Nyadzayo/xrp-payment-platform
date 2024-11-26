import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useWalletStore } from '@/store/useWalletStore';
import { CurrencyConverter } from '@/components/currency/CurrencyConverter';
import { Currency } from '@/types';
import toast from 'react-hot-toast';

const sendSchema = z.object({
  recipient: z.string().min(1, 'Recipient address is required'),
  amount: z.number().min(0.000001, 'Amount must be greater than 0'),
  memo: z.string().optional(),
});

type SendFormData = z.infer<typeof sendSchema>;

export function Send() {
  const navigate = useNavigate();
  const { wallets, activeWallet } = useWalletStore();
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  
  const activeWalletData = wallets.find(w => w.id === activeWallet);

  const { register, handleSubmit, formState: { errors } } = useForm<SendFormData>({
    resolver: zodResolver(sendSchema)
  });

  const onSubmit = async (data: SendFormData) => {
    try {
      // TODO: Implement actual send logic
      toast.success('Transaction submitted successfully');
      navigate('/history');
    } catch (error) {
      toast.error('Failed to submit transaction');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Send XRP</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              From Wallet
            </label>
            <div className="mt-1 p-3 bg-gray-50 rounded-md">
              <div className="font-mono text-sm">
                {activeWalletData?.address || 'No wallet selected'}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Recipient Address
            </label>
            <input
              type="text"
              {...register('recipient')}
              className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
            />
            {errors.recipient && (
              <p className="mt-1 text-sm text-red-600">{errors.recipient.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              step="0.000001"
              {...register('amount', { valueAsNumber: true })}
              className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Memo (Optional)
            </label>
            <input
              type="text"
              {...register('memo')}
              className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Send XRP
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium mb-4">Currency Converter</h2>
        <CurrencyConverter
          defaultFrom="XRP"
          defaultTo="USD"
          onConvert={(amount, from, to, result) => setConvertedAmount(result)}
        />
      </div>
    </div>
  );
}