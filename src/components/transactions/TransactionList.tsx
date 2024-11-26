import { useState } from 'react';
import { Transaction, Currency } from '@/types';
import { useTransactionStore } from '@/store/useTransactionStore';
import { formatCurrency, formatXRP } from '@/lib/utils';
import { format } from 'date-fns';
import { Search, Download } from 'lucide-react';

interface TransactionListProps {
  walletId?: string;
}

export function TransactionList({ walletId }: TransactionListProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'send' | 'receive' | 'convert'>('all');
  
  const { transactions, getTransactionsByWallet } = useTransactionStore();
  
  const filteredTransactions = walletId 
    ? getTransactionsByWallet(walletId)
    : transactions;

  const displayedTransactions = filteredTransactions
    .filter((t) => filter === 'all' || t.type === filter)
    .filter((t) => 
      t.recipient?.toLowerCase().includes(search.toLowerCase()) ||
      t.sender?.toLowerCase().includes(search.toLowerCase()) ||
      t.memo?.toLowerCase().includes(search.toLowerCase())
    );

  const exportTransactions = () => {
    const csv = [
      ['Date', 'Type', 'Amount', 'Currency', 'Status', 'Recipient', 'Sender', 'Fee', 'Memo'].join(','),
      ...displayedTransactions.map((t) => [
        format(new Date(t.timestamp), 'yyyy-MM-dd HH:mm:ss'),
        t.type,
        t.amount,
        t.currency,
        t.status,
        t.recipient || '',
        t.sender || '',
        t.fee,
        t.memo || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-md"
          />
        </div>

        <div className="flex items-center gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="all">All</option>
            <option value="send">Sent</option>
            <option value="receive">Received</option>
            <option value="convert">Converted</option>
          </select>

          <button
            onClick={exportTransactions}
            className="flex items-center gap-2 px-4 py-2 bg-white border rounded-md hover:bg-gray-50"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayedTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(transaction.timestamp), 'MMM d, yyyy HH:mm')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`capitalize ${
                    transaction.type === 'send' ? 'text-red-600' :
                    transaction.type === 'receive' ? 'text-green-600' :
                    'text-blue-600'
                  }`}>
                    {transaction.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {transaction.currency === 'XRP'
                    ? formatXRP(transaction.amount)
                    : formatCurrency(transaction.amount, transaction.currency)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                    transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.memo || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}