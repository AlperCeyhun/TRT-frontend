'use client';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('layout');
  return (
    <footer className="text-center text-white mt-auto">
      <p>&copy; {new Date().getFullYear()} {t('footer_content')}</p>
    </footer>
  );
}