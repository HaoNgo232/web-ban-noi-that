import type { Collection } from "@/features/collections/types"
import type { Product } from "@/lib/types"

// Mock products data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Sofa Minimalist Oak",
    slug: "sofa-minimalist-oak",
    description: "Sofa gỗ sồi tối giản với đệm vải cao cấp",
    price: 15900000,
    images: ["/minimalist-oak-sofa-with-fabric-cushions.jpg"],
    category: "living-room",
    inStock: true,
    featured: true,
    createdAt: "2025-01-01",
  },
  {
    id: "2",
    name: "Bàn ăn Scandinavian",
    slug: "ban-an-scandinavian",
    description: "Bàn ăn phong cách Bắc Âu cho 6 người",
    price: 12500000,
    images: ["/scandinavian-dining-table-for-6.jpg"],
    category: "dining",
    inStock: true,
    featured: true,
    createdAt: "2025-01-02",
  },
  {
    id: "3",
    name: "Giường ngủ Platform",
    slug: "giuong-ngu-platform",
    description: "Giường ngủ kiểu platform hiện đại",
    price: 18900000,
    images: ["/modern-platform-bed-minimal-design.jpg"],
    category: "bedroom",
    inStock: true,
    featured: true,
    createdAt: "2025-01-03",
  },
  {
    id: "4",
    name: "Tủ sách modular",
    slug: "tu-sach-modular",
    description: "Hệ thống tủ sách module linh hoạt",
    price: 8900000,
    images: ["/modular-bookshelf-minimalist-white.jpg"],
    category: "office",
    inStock: true,
    featured: true,
    createdAt: "2025-01-04",
  },
]

// Mock collections data
const mockCollections: Collection[] = [
  {
    id: "1",
    name: "Phong cách Scandinavian",
    slug: "phong-cach-scandinavian",
    description:
      "Bộ sưu tập lấy cảm hứng từ phong cách Bắc Âu với thiết kế tối giản, màu sắc trung tính và chất liệu tự nhiên. Tạo không gian sống ấm áp, gần gũi và đầy ánh sáng.",
    image: "/scandinavian-living-room-natural-wood.jpg",
    productCount: 12,
    products: [mockProducts[0], mockProducts[1], mockProducts[3]],
  },
  {
    id: "2",
    name: "Hiện đại tối giản",
    slug: "hien-dai-toi-gian",
    description:
      "Nội thất hiện đại với đường nét gọn gàng, màu sắc đơn sắc và chức năng tối ưu. Phù hợp cho những ai yêu thích sự đơn giản nhưng vẫn sang trọng và tinh tế.",
    image: "/minimalist-modern-living-room-with-neutral-tones-a.jpg",
    productCount: 15,
    products: [mockProducts[0], mockProducts[2], mockProducts[3]],
  },
  {
    id: "3",
    name: "Rustic ấm cúng",
    slug: "rustic-am-cung",
    description:
      "Mang đến không gian ấm cúng với gỗ tự nhiên, kết cấu thô mộc và tông màu đất. Tạo cảm giác thân thiện, gần gũi với thiên nhiên cho ngôi nhà của bạn.",
    image: "/rustic-wooden-dining-room-cozy-atmosphere.jpg",
    productCount: 10,
    products: [mockProducts[1], mockProducts[0]],
  },
  {
    id: "4",
    name: "Không gian làm việc",
    slug: "khong-gian-lam-viec",
    description:
      "Bộ sưu tập dành riêng cho văn phòng tại nhà với thiết kế ergonomic, giúp tăng năng suất và tạo môi trường làm việc chuyên nghiệp, thoải mái.",
    image: "/minimalist-home-office-workspace.jpg",
    productCount: 8,
    products: [mockProducts[3]],
  },
]

export const collectionsApi = {
  getCollections: async (): Promise<Collection[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockCollections
  },

  getCollection: async (slug: string): Promise<Collection> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const collection = mockCollections.find((c) => c.slug === slug)

    if (!collection) {
      throw new Error("Collection not found")
    }

    return collection
  },
}
