import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { fetchIdeaById } from '@/api/ideas';

const ideaQueryOptions = (ideaId: string) =>
  queryOptions({
    queryKey: ['idea', ideaId],
    queryFn: () => fetchIdeaById(ideaId),
  });

export const Route = createFileRoute('/ideas/$ideaId/')({
  component: IdeaDetailsPage,

  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId));
  },
});

function IdeaDetailsPage() {
  const { ideaId } = Route.useParams();
  const { data: idea } = useSuspenseQuery(ideaQueryOptions(ideaId));

  return (
    <div className='p-4'>
      <Link to='/ideas' className='text-blue-500 underline block mb-4'>
        Back to Ideas
      </Link>
      <h2 className='text-2xl font-bold'>{idea.title}</h2>
      <p className='mt-2'>{idea.description}</p>
    </div>
  );
}
