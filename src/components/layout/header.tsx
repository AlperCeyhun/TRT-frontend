'use client';
import { useTranslations } from 'next-intl';

export function Header() {
  const t = useTranslations('layout');
  return (
    <nav className="flex items-center justify-between p-4 bg-white text-black overflow-hidden">
      <h1 className="truncate text-lg font-bold">{t('title')}</h1>
    </nav>
  );
}
