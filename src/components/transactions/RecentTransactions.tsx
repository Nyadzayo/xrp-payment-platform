import { useTransactionStore } from '@/store/useTransactionStore';
import { formatCurrency, formatXRP } from '@/lib/utils';
import { format } from 'date-fns';

interface RecentTransactionsProps {
  limit?: number;
}

export function RecentTransactions({ limit = 5 }: RecentTransactionsProps) {
  const { transactions } = useTransactionStore();
  
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          {recentTransactions.map((transaction) => (
            <li key={transaction.id} className="px-6 py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {transaction.type === 'send' ? 'Sent to' : 'Received from'}
                    {' '}
                    <span className="font-mono">
                      {transaction.type === 'send' ? transaction.recipient : transaction.sender}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(transaction.timestamp), 'PPp')}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    transaction.type === 'send' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {transaction.type === 'send' ? '-' : '+'}
                    {transaction.currency === 'XRP'
                      ? formatXRP(transaction.amount)
                      : formatCurrency(transaction.amount, transaction.currency)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Fee: {formatXRP(transaction.fee)}
                  </p>
                </div>
              </div>
            </li>
          ))}

          {recentTransactions.length === 0 && (
            <li className="px-6 py-4 text-center text-gray-500">
              No recent transactions
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}