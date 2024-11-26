import { Menu } from '@headlessui/react';
import { useAuthStore } from '@/store/useAuthStore';
import { Menu as MenuIcon, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuthStore();

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button 
        type="button" 
        className="p-2.5 text-gray-700 lg:hidden hover:bg-gray-100 rounded-md"
        onClick={onMenuClick}
      >
        <span className="sr-only">Toggle sidebar</span>
        <MenuIcon className="h-6 w-6" />
      </button>

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1" />
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <Menu as="div" className="relative">
            <Menu.Button className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">Open user menu</span>
              <div className="flex items-center gap-x-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <span className="hidden lg:flex lg:items-center">
                  <span className="text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                    {user?.email}
                  </span>
                </span>
              </div>
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => logout()}
                    className={cn(
                      'flex w-full items-center gap-x-3 px-3 py-1 text-sm leading-6 transition-colors duration-150',
                      active ? 'bg-red-50 text-red-600' : 'text-gray-700'
                    )}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </div>
  );
}