import { createFileRoute } from '@tanstack/react-router';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { fetchAllIdeas } from '@/api/ideas';
import IdeaCard from '@/components/IdeaCard';

const ideasQueryOptions = () =>
  queryOptions({
    queryKey: ['ideas'],
    queryFn: () => fetchAllIdeas(),
  });

export const Route = createFileRoute('/ideas/')({
  head: () => ({
    meta: [
      {
        title: 'IdeaDrop - Browse Ideas',
      },
    ],
  }),
  component: IdeasPage,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideasQueryOptions());
  },
});

function IdeasPage() {
  const { data: ideas } = useSuspenseQuery(ideasQueryOptions());

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Ideas</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} button={true} />
        ))}
      </div>
    </div>
  );
}
