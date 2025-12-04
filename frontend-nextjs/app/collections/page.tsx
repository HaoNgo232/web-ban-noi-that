import type { Metadata } from "next"
import { CollectionsContent } from "@/features/collections/components/collections-content"

export const metadata: Metadata = {
  title: "Bộ sưu tập - Habitat",
  description: "Khám phá các bộ sưu tập nội thất được tuyển chọn theo phong cách và không gian",
}

export default function CollectionsPage() {
  return <CollectionsContent />
}
