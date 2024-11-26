import { WalletList } from '@/components/wallet/WalletList';
import { WalletCreate } from '@/components/wallet/WalletCreate';
import { useState } from 'react';
import { Plus } from 'lucide-react';

export function Wallet() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Wallets</h1>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Wallet
        </button>
      </div>

      <WalletList />
      
      {showCreate && (
        <WalletCreate onClose={() => setShowCreate(false)} />
      )}
    </div>
  );
}