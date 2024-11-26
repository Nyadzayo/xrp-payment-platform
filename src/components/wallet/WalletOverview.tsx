import { useWalletStore } from '@/store/useWalletStore';
import { formatCurrency, formatXRP } from '@/lib/utils';
import { ArrowUpRight, ArrowDownLeft, RefreshCw } from 'lucide-react';
import { useTransactionStore } from '@/store/useTransactionStore';

export function WalletOverview() {
  const { wallets, activeWallet } = useWalletStore();
  const { transactions } = useTransactionStore();
  
  const activeWalletData = wallets.find(w => w.id === activeWallet);

  if (!activeWalletData) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-500">No active wallet selected</p>
      </div>
    );
  }

  const recentTransactions = transactions
    .filter(t => t.sender === activeWallet || t.recipient === activeWallet)
    .slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-medium">Active Wallet</h2>
        <div className="mt-2 space-y-1">
          <div className="text-2xl font-semibold">
            {activeWalletData.currency === 'XRP'
              ? formatXRP(activeWalletData.balance)
              : formatCurrency(activeWalletData.balance, activeWalletData.currency)}
          </div>
          <div className="text-sm text-gray-500 font-mono">
            {activeWalletData.address}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="inline-flex p-2 bg-green-100 rounded-full">
              <ArrowDownLeft className="w-5 h-5 text-green-600" />
            </div>
            <div className="mt-1">
              <div className="text-2xl font-medium">
                {transactions.filter(t => 
                  t.recipient === activeWallet && 
                  t.status === 'completed'
                ).length}
              </div>
              <div className="text-sm text-gray-500">Received</div>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex p-2 bg-red-100 rounded-full">
              <ArrowUpRight className="w-5 h-5 text-red-600" />
            </div>
            <div className="mt-1">
              <div className="text-2xl font-medium">
                {transactions.filter(t => 
                  t.sender === activeWallet && 
                  t.status === 'completed'
                ).length}
              </div>
              <div className="text-sm text-gray-500">Sent</div>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex p-2 bg-blue-100 rounded-full">
              <RefreshCw className="w-5 h-5 text-blue-600" />
            </div>
            <div className="mt-1">
              <div className="text-2xl font-medium">
                {transactions.filter(t => 
                  (t.sender === activeWallet || t.recipient === activeWallet) && 
                  t.status === 'pending'
                ).length}
              </div>
              <div className="text-sm text-gray-500">Pending</div>
            </div>
          </div>
        </div>
      </div>

      {recentTransactions.length > 0 && (
        <div className="border-t px-6 py-4">
          <h3 className="text-sm font-medium text-gray-500">Recent Activity</h3>
          <div className="mt-2 space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {transaction.type === 'send' ? (
                    <ArrowUpRight className="w-4 h-4 text-red-600" />
                  ) : (
                    <ArrowDownLeft className="w-4 h-4 text-green-600" />
                  )}
                  <div className="text-sm">
                    <div className="font-medium">
                      {transaction.type === 'send' ? 'Sent' : 'Received'}
                    </div>
                    <div className="text-gray-500">
                      {new Date(transaction.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium">
                  {transaction.currency === 'XRP'
                    ? formatXRP(transaction.amount)
                    : formatCurrency(transaction.amount, transaction.currency)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}