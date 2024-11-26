import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useWalletStore } from '@/store/useWalletStore';
import { Currency } from '@/types';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

const walletSchema = z.object({
  name: z.string().min(1, 'Wallet name is required'),
  currency: z.enum(['XRP', 'USD', 'EUR', 'GBP', 'JPY'] as const),
  isDefault: z.boolean(),
});

type WalletFormData = z.infer<typeof walletSchema>;

interface WalletCreateProps {
  onClose: () => void;
}

export function WalletCreate({ onClose }: WalletCreateProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { addWallet } = useWalletStore();

  const { register, handleSubmit, formState: { errors } } = useForm<WalletFormData>({
    resolver: zodResolver(walletSchema),
    defaultValues: {
      currency: 'XRP',
      isDefault: false,
    },
  });

  const onSubmit = async (data: WalletFormData) => {
    try {
      setIsLoading(true);
      // TODO: Implement actual wallet creation logic
      const newWallet = {
        id: crypto.randomUUID(),
        address: 'rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // Generate real address
        balance: 0,
        ...data,
      };
      
      addWallet(newWallet);
      toast.success('Wallet created successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to create wallet');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium">Create New Wallet</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Wallet Name
            </label>
            <input
              type="text"
              {...register('name')}
              className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Currency
            </label>
            <select
              {...register('currency')}
              className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
            >
              <option value="XRP">XRP</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
            </select>
            {errors.currency && (
              <p className="mt-1 text-sm text-red-600">{errors.currency.message}</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('isDefault')}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">
              Set as default wallet
            </label>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {isLoading ? 'Creating...' : 'Create Wallet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}