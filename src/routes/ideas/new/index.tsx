import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/ideas/new/')({
  component: NewIdeasPage,
});

function NewIdeasPage() {
  return <div>Hello "/ideas/new/"!</div>;
}
