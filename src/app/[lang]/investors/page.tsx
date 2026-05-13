import { redirect } from 'next/navigation';

export default function InvestorsPage({ params: { lang } }: { params: { lang: string } }) {
  // Redirect to the default category (reports)
  redirect(`/${lang}/investors/reports`);
}
