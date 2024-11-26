import { NavLink } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  LayoutDashboard, 
  Send, 
  History, 
  Wallet, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', to: '/', icon: LayoutDashboard },
  { name: 'Send', to: '/send', icon: Send },
  { name: 'History', to: '/history', icon: History },
  { name: 'Wallet', to: '/wallet', icon: Wallet },
  { name: 'Settings', to: '/settings', icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { logout } = useAuthStore();

  return (
    <div className={cn(
      "fixed inset-y-0 z-50 flex flex-col transition-all duration-300 ease-in-out",
      isOpen ? "w-72" : "w-20",
      "hidden lg:flex"
    )}>
      <div className="flex grow flex-col gap-y-5 overflow-hidden border-r border-gray-200 bg-white px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center justify-between">
          <h1 className={cn(
            "text-xl font-semibold transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0 hidden"
          )}>
            XRP Remittance
          </h1>
          <button
            onClick={onToggle}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            {isOpen ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        </div>

        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        cn(
                          'group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 transition-colors duration-150',
                          isActive
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                        )
                      }
                      title={!isOpen ? item.name : undefined}
                    >
                      <item.icon className="h-6 w-6 shrink-0" />
                      <span className={cn(
                        "transition-opacity duration-300",
                        isOpen ? "opacity-100" : "opacity-0 hidden"
                      )}>
                        {item.name}
                      </span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mt-auto">
              <button
                onClick={() => logout()}
                className="group -mx-2 flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
                title={!isOpen ? "Sign out" : undefined}
              >
                <LogOut className="h-6 w-6 shrink-0" />
                <span className={cn(
                  "transition-opacity duration-300",
                  isOpen ? "opacity-100" : "opacity-0 hidden"
                )}>
                  Sign out
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}