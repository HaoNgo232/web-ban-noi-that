import type { Metadata } from "next"
import { CollectionDetailContent } from "@/features/collections/components/collection-detail-content"

export const metadata: Metadata = {
  title: "Chi tiết bộ sưu tập - Habitat",
  description: "Xem chi tiết bộ sưu tập nội thất",
}

export default function CollectionDetailPage({ params }: { params: { slug: string } }) {
  return <CollectionDetailContent slug={params.slug} />
}
