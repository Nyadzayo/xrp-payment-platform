import { CurrencyConverter } from '@/components/currency/CurrencyConverter';
import { WalletOverview } from '@/components/wallet/WalletOverview';
import { RecentTransactions } from '@/components/transactions/RecentTransactions';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WalletOverview />
        <CurrencyConverter />
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium mb-4">Recent Transactions</h2>
        <RecentTransactions limit={5} />
      </div>
    </div>
  );
}