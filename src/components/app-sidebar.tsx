
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, BrainCircuit, Home, Leaf, Timer, Waves, PanelLeft, Sun, Moon, LogIn, LogOut } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAuth } from '@/hooks/use-auth';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Skeleton } from './ui/skeleton';

const navItems = [
  { href: '/', icon: Home, label: 'Dashboard' },
  { href: '/meditations', icon: Leaf, label: 'Meditations' },
  { href: '/sounds', icon: Waves, label: 'Sounds' },
  { href: '/timer', icon: Timer, label: 'Timer' },
  { href: '/tracker', icon: BarChart3, label: 'Tracker' },
  { href: '/ai-prompt', icon: BrainCircuit, label: 'AI Prompts' },
];

const NavLink = ({ item, isMobile }: { item: typeof navItems[0], isMobile: boolean }) => {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  if (isMobile) {
    return (
      <Link
        href={item.href}
        className={cn(
          'flex items-center gap-4 px-2.5',
          isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
        )}
      >
        <item.icon className="h-5 w-5" />
        {item.label}
      </Link>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={item.href}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8',
            isActive
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground bg-transparent'
          )}
        >
          <item.icon className="h-5 w-5" />
          <span className="sr-only">{item.label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  );
}

const ThemeToggle = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="right">Toggle Theme</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const AuthToggle = ({ isMobile = false } : {isMobile?: boolean}) => {
  const { user, logout, loading } = useAuth();

  if (loading) {
     return <Skeleton className="h-8 w-8 rounded-full" />
  }

  const commonClass = "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8";

  if (user) {
    if (isMobile) {
      return (
         <Button onClick={logout} variant="ghost" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
      )
    }
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={logout} variant="ghost" size="icon" className={commonClass}>
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Logout</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">Logout</TooltipContent>
      </Tooltip>
    );
  }

  if(isMobile) {
    return (
      <Link href="/login" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
        <LogIn className="h-5 w-5" />
        Login
      </Link>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href="/login">
           <Button variant="ghost" size="icon" className={commonClass}>
              <LogIn className="h-5 w-5" />
              <span className="sr-only">Login</span>
            </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">Login</TooltipContent>
    </Tooltip>
  )
};


export default function AppSidebar() {
  return (
    <TooltipProvider>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Leaf className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">SereneScape</span>
          </Link>
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} isMobile={false} />
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <ThemeToggle />
          <AuthToggle />
        </nav>
      </aside>
      
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 md:hidden">
        <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Leaf className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">SereneScape</span>
                </Link>
                {navItems.map((item) => (
                  <NavLink key={item.href} item={item} isMobile={true} />
                ))}
                <AuthToggle isMobile={true}/>
              </nav>
            </SheetContent>
          </Sheet>
          <Link
            href="#"
            className="group flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground h-9 w-9 md:h-8 md:w-8 md:text-base sm:hidden"
          >
            <Leaf className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">SereneScape</span>
          </Link>
      </header>
    </TooltipProvider>
  );
}
