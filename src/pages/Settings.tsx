import { useSettingsStore } from '@/store/useSettingsStore';
import { useForm } from 'react-hook-form';
import { UserPreferences } from '@/types';
import toast from 'react-hot-toast';

export function Settings() {
  const { preferences, updatePreferences } = useSettingsStore();
  const { register, handleSubmit } = useForm<UserPreferences>({
    defaultValues: preferences
  });

  const onSubmit = (data: UserPreferences) => {
    updatePreferences(data);
    toast.success('Settings updated successfully');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">General Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Default Currency
              </label>
              <select
                {...register('defaultCurrency')}
                className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
              >
                <option value="XRP">XRP</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Theme
              </label>
              <select
                {...register('theme')}
                className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Language
              </label>
              <select
                {...register('language')}
                className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="ja">Japanese</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Notifications</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Email Notifications
              </label>
              <input
                type="checkbox"
                {...register('notifications.email')}
                className="h-4 w-4 text-blue-600 rounded"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Push Notifications
              </label>
              <input
                type="checkbox"
                {...register('notifications.push')}
                className="h-4 w-4 text-blue-600 rounded"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Transaction Notifications
              </label>
              <input
                type="checkbox"
                {...register('notifications.transactions')}
                className="h-4 w-4 text-blue-600 rounded"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}