import { createFileRoute, Link } from '@tanstack/react-router';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import type { Idea } from '@/types';
import api from '@/lib/axios';

const fetchAllIdeas = async (limit?: number): Promise<Idea[]> => {
  const res = await api.get('/ideas', {
    params: limit ? { _limit: limit } : {},
  });

  return res.data;
};

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

      <ul className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        {ideas.map((idea) => (
          <li
            className='border border-gray-300 p-4 rounded shadow bg-white flex flex-col justify-between'
            key={idea.id}
          >
            <div>
              <h2 className='text-lg font-semibold'>{idea.title}</h2>
              <p className='text-gray-700 mt-2'>{idea.summary}</p>

              <Link
                to='/ideas/$ideaId'
                params={{ ideaId: idea.id.toString() }}
                className='text-center mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'
              >
                View Idea
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
