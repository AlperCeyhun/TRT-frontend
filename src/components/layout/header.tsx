'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import en from '@/assets/flags/en.png';
import tr from '@/assets/flags/tr.png';
import AccountButton from '@/components/layout/accountButton';

export function Header() {
  const t = useTranslations('layout');
  const locale = useLocale();
  const router = useRouter();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'tr', label: 'Türkçe' }
  ];

  const changeLanguage = (lang: string) => {
    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`;
    router.refresh();
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white text-black overflow-hidden">
      <h1 className="truncate text-lg font-bold">{t('title')}</h1>
      <div className="flex items-center gap-4">
        <AccountButton />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              {locale.toUpperCase()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={lang.code === locale ? 'font-semibold' : ''}
              >
                <img
                  src={lang.code === 'tr' ? tr.src : en.src}
                  alt={lang.label}
                  className="rounded-full"
                  width={16}
                  height={16}
                />
                {lang.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}