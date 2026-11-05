import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { gitConfig, siteUrl } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <span className="inline-flex items-center gap-2"><img src="/icon.svg" alt="" width={28} height={28} /><span className="brand-wordmark">ItaRouter</span><span className="text-fd-muted-foreground text-sm font-normal">Docs</span></span>,
      url: siteUrl,
    },
    links: [
      { text: 'Models', url: `${siteUrl}/pricing`, external: true },
      { text: 'Console', url: `${siteUrl}/dashboard`, external: true },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
