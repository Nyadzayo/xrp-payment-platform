import { useWalletStore } from '@/store/useWalletStore';
import { formatCurrency, formatXRP } from '@/lib/utils';
import { Wallet, Check, MoreVertical } from 'lucide-react';
import { Menu } from '@headlessui/react';
import { cn } from '@/lib/utils';

export function WalletList() {
  const { wallets, activeWallet, setActiveWallet, removeWallet } = useWalletStore();

  return (
    <div className="space-y-4">
      {wallets.map((wallet) => (
        <div
          key={wallet.id}
          className={cn(
            "bg-white rounded-lg shadow p-4",
            activeWallet === wallet.id && "ring-2 ring-blue-500"
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Wallet className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">{wallet.name}</h3>
                <p className="text-sm text-gray-500 font-mono">{wallet.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="font-medium">
                  {wallet.currency === 'XRP' 
                    ? formatXRP(wallet.balance)
                    : formatCurrency(wallet.balance, wallet.currency)}
                </div>
                {wallet.isDefault && (
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    Default
                  </div>
                )}
              </div>

              <Menu as="div" className="relative">
                <Menu.Button className="p-1 hover:bg-gray-100 rounded-full">
                  <MoreVertical className="w-4 h-4" />
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setActiveWallet(wallet.id)}
                        className={cn(
                          "w-full text-left px-4 py-2 text-sm",
                          active && "bg-gray-100"
                        )}
                      >
                        Set as Active
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => removeWallet(wallet.id)}
                        className={cn(
                          "w-full text-left px-4 py-2 text-sm text-red-600",
                          active && "bg-gray-100"
                        )}
                      >
                        Remove Wallet
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
          </div>
        </div>
      ))}

      {wallets.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Wallet className="w-12 h-12 mx-auto text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No wallets</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new wallet.
          </p>
        </div>
      )}
    </div>
  );
}