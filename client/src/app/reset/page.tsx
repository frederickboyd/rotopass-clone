import ResetPage from './ResetPageClient';

export default function ResetPageWrapper({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const token = typeof searchParams.token === 'string' ? searchParams.token : null;

  return <ResetPage token={token} />;
}
