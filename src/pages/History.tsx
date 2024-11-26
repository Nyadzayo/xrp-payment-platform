import { TransactionList } from '@/components/transactions/TransactionList';
import { useWalletStore } from '@/store/useWalletStore';

export function History() {
  const { activeWallet } = useWalletStore();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Transaction History</h1>
      <TransactionList walletId={activeWallet || undefined} />
    </div>
  );
}