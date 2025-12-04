import type { Product } from "@/lib/types"

// Mock data cho development
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Sofa Minimalist Oak",
    slug: "sofa-minimalist-oak",
    description:
      "Sofa gỗ sồi tối giản với đệm vải cao cấp, thiết kế hiện đại và thoải mái. Phù hợp cho không gian phòng khách hiện đại, mang lại sự sang trọng và tinh tế cho ngôi nhà của bạn.",
    price: 15900000,
    images: ["/minimalist-oak-sofa-with-fabric-cushions.jpg", "/modern-living-room-minimal-furniture.jpg"],
    category: "living-room",
    inStock: true,
    featured: true,
    dimensions: {
      width: 200,
      height: 85,
      depth: 90,
    },
    material: "Gỗ sồi tự nhiên, vải bố cao cấp",
    color: "Nâu gỗ tự nhiên",
    createdAt: "2025-01-01",
  },
  {
    id: "2",
    name: "Bàn ăn Scandinavian",
    slug: "ban-an-scandinavian",
    description:
      "Bàn ăn phong cách Bắc Âu cho 6 người, gỗ tự nhiên bền đẹp. Thiết kế tối giản nhưng không kém phần sang trọng, phù hợp với mọi không gian phòng ăn.",
    price: 12500000,
    images: ["/scandinavian-dining-table-for-6.jpg", "/scandinavian-dining-room-wood-table.jpg"],
    category: "dining",
    inStock: true,
    featured: true,
    dimensions: {
      width: 180,
      height: 75,
      depth: 90,
    },
    material: "Gỗ sồi Bắc Âu",
    color: "Nâu sáng",
    createdAt: "2025-01-02",
  },
  {
    id: "3",
    name: "Giường ngủ Platform",
    slug: "giuong-ngu-platform",
    description:
      "Giường ngủ kiểu platform hiện đại, thiết kế tối giản sang trọng. Mang lại giấc ngủ thoải mái và không gian phòng ngủ thanh lịch, hiện đại.",
    price: 18900000,
    images: ["/modern-platform-bed-minimal-design.jpg", "/minimal-bedroom-design-natural-light.jpg"],
    category: "bedroom",
    inStock: true,
    featured: true,
    dimensions: {
      width: 180,
      height: 40,
      depth: 200,
    },
    material: "Gỗ MDF phủ veneer óc chó",
    color: "Nâu óc chó",
    createdAt: "2025-01-03",
  },
  {
    id: "4",
    name: "Tủ sách modular",
    slug: "tu-sach-modular",
    description:
      "Hệ thống tủ sách module linh hoạt, dễ dàng tùy chỉnh theo không gian. Phù hợp cho văn phòng tại nhà hoặc phòng đọc sách.",
    price: 8900000,
    images: ["/modular-bookshelf-minimalist-white.jpg", "/minimalist-home-office-workspace.jpg"],
    category: "office",
    inStock: true,
    featured: true,
    dimensions: {
      width: 120,
      height: 200,
      depth: 35,
    },
    material: "MDF phủ sơn trắng",
    color: "Trắng",
    createdAt: "2025-01-04",
  },
  {
    id: "5",
    name: "Ghế armchair hiện đại",
    slug: "ghe-armchair-hien-dai",
    description: "Ghế armchair thiết kế hiện đại, đệm êm ái cho không gian đọc sách",
    price: 6900000,
    images: ["/placeholder.svg?key=ar3m1"],
    category: "living-room",
    inStock: true,
    createdAt: "2025-01-05",
  },
  {
    id: "6",
    name: "Tủ đầu giường gỗ óc chó",
    slug: "tu-dau-giuong-go-oc-cho",
    description: "Tủ đầu giường gỗ óc chó cao cấp với ngăn kéo tiện dụng",
    price: 4500000,
    images: ["/placeholder.svg?key=n1ght"],
    category: "bedroom",
    inStock: true,
    createdAt: "2025-01-06",
  },
  {
    id: "7",
    name: "Bộ ghế ăn 6 chiếc",
    slug: "bo-ghe-an-6-chiec",
    description: "Bộ 6 ghế ăn thiết kế ergonomic, thoải mái cho bữa ăn gia đình",
    price: 9800000,
    images: ["/placeholder.svg?key=ch41r"],
    category: "dining",
    inStock: false,
    createdAt: "2025-01-07",
  },
  {
    id: "8",
    name: "Bàn làm việc có ngăn kéo",
    slug: "ban-lam-viec-co-ngan-keo",
    description: "Bàn làm việc với ngăn kéo tiện lợi, thiết kế tối ưu cho workspace",
    price: 7200000,
    images: ["/placeholder.svg?key=d3sk1"],
    category: "office",
    inStock: true,
    createdAt: "2025-01-08",
  },
]

interface GetProductsParams {
  filters: {
    category: string
    priceRange: [number, number]
    inStock: boolean
  }
  sortBy: string
  page: number
}

export const productsApi = {
  getProducts: async ({ filters, sortBy, page }: GetProductsParams) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Filter products
    const filtered = mockProducts.filter((product) => {
      const categoryMatch = !filters.category || product.category === filters.category
      const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      const stockMatch = !filters.inStock || product.inStock

      return categoryMatch && priceMatch && stockMatch
    })

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "featured":
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      }
    })

    // Paginate
    const perPage = 9
    const start = (page - 1) * perPage
    const end = start + perPage
    const paginated = sorted.slice(start, end)

    return {
      products: paginated,
      total: sorted.length,
      page,
      perPage,
      totalPages: Math.ceil(sorted.length / perPage),
    }
  },

  getProduct: async (slug: string): Promise<Product> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const product = mockProducts.find((p) => p.slug === slug)

    if (!product) {
      throw new Error("Product not found")
    }

    return product
  },

  getRelatedProducts: async (category: string): Promise<Product[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    return mockProducts.filter((p) => p.category === category).slice(0, 4)
  },
}
