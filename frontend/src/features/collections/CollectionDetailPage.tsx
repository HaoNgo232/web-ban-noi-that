import { useParams } from "react-router";
import { CollectionDetailContent } from "./components/CollectionDetailContent";

export function CollectionDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return (
      <div className="container py-16 px-4">
        <p className="text-center text-muted-foreground">Slug không hợp lệ</p>
      </div>
    );
  }

  return <CollectionDetailContent slug={slug} />;
}

