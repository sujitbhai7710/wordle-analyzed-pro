'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  {
    href: '/tools',
    label: 'Tools',
    children: [
      { href: '/tools/best-words', label: 'Best Words' },
      { href: '/tools/letter-frequency', label: 'Letter Frequency' },
      { href: '/tools/daily-challenge', label: 'Daily Challenge' },
      { href: '/tools/stats-calculator', label: 'Stats Calculator' },
    ],
  },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60" role="banner">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="Wordle Analyzer - Home">
            <div className="flex gap-0.5" aria-hidden="true">
              <div className="w-5 h-5 rounded bg-[#6aaa64] flex items-center justify-center text-white text-[8px] font-bold">W</div>
              <div className="w-5 h-5 rounded bg-[#c9b458] flex items-center justify-center text-white text-[8px] font-bold">O</div>
              <div className="w-5 h-5 rounded bg-[#787c7e] flex items-center justify-center text-white text-[8px] font-bold">R</div>
            </div>
            <span className="text-lg font-bold tracking-tight">
              Wordle <span className="text-[#6aaa64]">Analyzer</span> <span className="text-[#c9b458] font-extrabold text-sm">Pro</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => {
              if (link.children) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setToolsOpen(true)}
                    onMouseLeave={() => setToolsOpen(false)}
                  >
                    <button
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground ${
                        isActive(pathname, link.href) ? 'text-[#6aaa64]' : 'text-muted-foreground'
                      }`}
                      aria-expanded={toolsOpen}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                    <AnimatePresence>
                      {toolsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-48 bg-popover border border-border rounded-lg shadow-lg overflow-hidden"
                          role="menu"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`block px-4 py-2.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                                pathname === child.href ? 'text-[#6aaa64] bg-accent/50' : 'text-muted-foreground'
                              }`}
                              role="menuitem"
                              aria-current={pathname === child.href ? 'page' : undefined}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground ${
                    isActive(pathname, link.href) ? 'text-[#6aaa64] bg-accent/50' : 'text-muted-foreground'
                  }`}
                  aria-current={isActive(pathname, link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="h-9 w-9"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border/40 bg-background overflow-hidden"
            id="mobile-navigation"
          >
            <nav className="max-w-6xl mx-auto px-4 py-4 space-y-1" role="navigation" aria-label="Mobile navigation">
              {navLinks.map((link) => {
                if (link.children) {
                  return (
                    <div key={link.href}>
                      <button
                        onClick={() => setToolsOpen(!toolsOpen)}
                        className={`flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-md transition-colors hover:bg-accent ${
                          isActive(pathname, link.href) ? 'text-[#6aaa64]' : 'text-muted-foreground'
                        }`}
                        aria-expanded={toolsOpen}
                        aria-haspopup="true"
                      >
                        {link.label}
                        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                      </button>
                      <AnimatePresence>
                        {toolsOpen && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                            role="menu"
                          >
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={`block pl-6 pr-3 py-2 text-sm rounded-md transition-colors hover:bg-accent ${
                                  pathname === child.href ? 'text-[#6aaa64]' : 'text-muted-foreground'
                                }`}
                                role="menuitem"
                                aria-current={pathname === child.href ? 'page' : undefined}
                                onClick={() => setMobileOpen(false)}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-3 py-2.5 text-sm font-medium rounded-md transition-colors hover:bg-accent ${
                      isActive(pathname, link.href) ? 'text-[#6aaa64] bg-accent/50' : 'text-muted-foreground'
                    }`}
                    aria-current={isActive(pathname, link.href) ? 'page' : undefined}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
