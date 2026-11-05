import Link from 'next/link';
export default function HomePage() {
  return <main className="mx-auto w-full max-w-3xl px-6 py-20"><h1 className="mb-4 text-3xl font-semibold tracking-tight">ItaRouter docs</h1><p className="mb-6 text-fd-muted-foreground">Connect your app. Manage keys, credits, and usage.</p><Link href="/docs" className="text-fd-primary underline underline-offset-4">Read the getting started guide</Link></main>;
}
