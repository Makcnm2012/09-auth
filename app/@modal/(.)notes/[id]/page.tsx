import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { NotePreview } from "./NotePreview.client";
import { fetchServerNoteById } from "@/lib/api/serverApi";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NoteModalPage({ params }: Props) {
  const { id } = await params;

  const queryClinet = new QueryClient();

  queryClinet.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchServerNoteById(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClinet)}>
      <NotePreview />
    </HydrationBoundary>
  );
}
