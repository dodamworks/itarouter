import type { Metadata } from 'next';
import { Provider } from '@/components/provider';
import './global.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOCS_ORIGIN || 'https://itarouter.com'),
  title: { default: 'ItaRouter docs', template: '%s | ItaRouter docs' },
  description: 'Guides for API keys, models, credits, and usage in ItaRouter.',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen"><Provider>{children}</Provider></body>
    </html>
  );
}
