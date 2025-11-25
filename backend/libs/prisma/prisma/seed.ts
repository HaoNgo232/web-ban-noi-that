import * as dotenv from 'dotenv';
import * as path from 'path';
import { PrismaClient } from '../src/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

// Load environment variables
const envPath = path.resolve(__dirname, '../../../.env');
dotenv.config({ path: envPath });

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const SALT_ROUNDS = 10;

// ==================== USERS DATA ====================

const usersData = [
  {
    email: 'admin@furniture.com',
    password: 'Admin@123',
    firstName: 'Admin',
    lastName: 'System',
    phone: '0901234567',
    address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
    role: 'ADMIN' as const,
    status: 'ACTIVE' as const,
  },
  {
    email: 'staff@furniture.com',
    password: 'Staff@123',
    firstName: 'Nhân',
    lastName: 'Viên',
    phone: '0902345678',
    address: '456 Lê Lợi, Quận 1, TP.HCM',
    role: 'STAFF' as const,
    status: 'ACTIVE' as const,
  },
  {
    email: 'customer1@gmail.com',
    password: 'Customer@123',
    firstName: 'Minh',
    lastName: 'Nguyễn',
    phone: '0903456789',
    address: '789 Cách Mạng Tháng 8, Quận 3, TP.HCM',
    role: 'CUSTOMER' as const,
    status: 'ACTIVE' as const,
  },
  {
    email: 'customer2@gmail.com',
    password: 'Customer@123',
    firstName: 'Lan',
    lastName: 'Trần',
    phone: '0904567890',
    address: '101 Điện Biên Phủ, Quận Bình Thạnh, TP.HCM',
    role: 'CUSTOMER' as const,
    status: 'ACTIVE' as const,
  },
  {
    email: 'customer3@gmail.com',
    password: 'Customer@123',
    firstName: 'Hùng',
    lastName: 'Lê',
    phone: '0905678901',
    address: '202 Võ Văn Tần, Quận 3, TP.HCM',
    role: 'CUSTOMER' as const,
    status: 'ACTIVE' as const,
  },
];

// ==================== PRODUCTS DATA ====================

const productsData = [
  // SOFA
  {
    name: 'Sofa góc L cao cấp Milano',
    description:
      'Sofa góc chữ L thiết kế hiện đại, bọc da thật cao cấp nhập khẩu từ Ý. Khung gỗ sồi tự nhiên, đệm mút D40 siêu êm. Kích thước 2800x1800x850mm. Phù hợp phòng khách rộng từ 25m2.',
    price: 45000000,
    stock: 15,
    category: 'SOFA' as const,
    material: 'Da thật, gỗ sồi',
    images: [
      'https://example.com/sofa-milano-1.jpg',
      'https://example.com/sofa-milano-2.jpg',
    ],
    discountPercentage: 10,
  },
  {
    name: 'Sofa băng 3 chỗ Nordic',
    description:
      'Sofa băng 3 chỗ phong cách Bắc Âu tối giản. Vải bọc cotton pha lanh cao cấp, dễ vệ sinh. Chân gỗ tần bì tự nhiên. Kích thước 2100x850x800mm.',
    price: 18500000,
    stock: 25,
    category: 'SOFA' as const,
    material: 'Vải cotton, gỗ tần bì',
    images: ['https://example.com/sofa-nordic-1.jpg'],
    discountPercentage: 5,
  },
  {
    name: 'Sofa đơn thư giãn Relax',
    description:
      'Ghế sofa đơn có chức năng ngả lưng, tích hợp massage. Bọc da công nghiệp cao cấp, khung thép không gỉ. Kích thước 950x900x1050mm.',
    price: 12000000,
    stock: 30,
    category: 'SOFA' as const,
    material: 'Da công nghiệp, thép',
    images: ['https://example.com/sofa-relax-1.jpg'],
    discountPercentage: 0,
  },

  // TABLE
  {
    name: 'Bàn ăn gỗ óc chó 6 ghế Walnut',
    description:
      'Bàn ăn gỗ óc chó nguyên khối nhập khẩu Bắc Mỹ. Thiết kế sang trọng, vân gỗ tự nhiên đẹp mắt. Kích thước 1800x900x750mm. Kèm 6 ghế ăn cùng bộ.',
    price: 65000000,
    stock: 8,
    category: 'TABLE' as const,
    material: 'Gỗ óc chó',
    images: [
      'https://example.com/ban-oc-cho-1.jpg',
      'https://example.com/ban-oc-cho-2.jpg',
    ],
    discountPercentage: 15,
  },
  {
    name: 'Bàn trà kính cường lực Modern',
    description:
      'Bàn trà mặt kính cường lực 10mm, chân inox mạ vàng PVD. Thiết kế hiện đại, dễ vệ sinh. Kích thước 1200x600x450mm.',
    price: 8500000,
    stock: 40,
    category: 'TABLE' as const,
    material: 'Kính cường lực, inox',
    images: ['https://example.com/ban-tra-kinh-1.jpg'],
    discountPercentage: 0,
  },
  {
    name: 'Bàn làm việc gỗ công nghiệp Workspace',
    description:
      'Bàn làm việc gỗ MDF phủ melamine chống xước. Có ngăn kéo và kệ đựng đồ. Chân sắt sơn tĩnh điện. Kích thước 1400x600x750mm.',
    price: 3500000,
    stock: 50,
    category: 'TABLE' as const,
    material: 'Gỗ MDF, sắt',
    images: ['https://example.com/ban-lam-viec-1.jpg'],
    discountPercentage: 8,
  },

  // CHAIR
  {
    name: 'Ghế văn phòng ergonomic ProMax',
    description:
      'Ghế công thái học cao cấp, tựa đầu điều chỉnh 3D, tay vịn 4D. Lưng lưới mesh thoáng khí, đệm ngồi mút memory foam. Chân xoay 360 độ.',
    price: 8900000,
    stock: 35,
    category: 'CHAIR' as const,
    material: 'Lưới mesh, nhựa cao cấp',
    images: ['https://example.com/ghe-ergonomic-1.jpg'],
    discountPercentage: 12,
  },
  {
    name: 'Ghế ăn gỗ sồi Scandinavian',
    description:
      'Ghế ăn phong cách Scandinavian, gỗ sồi tự nhiên sơn PU bóng. Đệm ngồi bọc vải nỉ cao cấp. Kích thước 450x520x820mm.',
    price: 2800000,
    stock: 60,
    category: 'CHAIR' as const,
    material: 'Gỗ sồi, vải nỉ',
    images: ['https://example.com/ghe-an-soi-1.jpg'],
    discountPercentage: 0,
  },
  {
    name: 'Ghế bar chân cao Industrial',
    description:
      'Ghế bar phong cách công nghiệp, khung sắt sơn tĩnh điện đen. Mặt ngồi gỗ thông tự nhiên. Chiều cao 750mm, có chỗ để chân.',
    price: 1800000,
    stock: 45,
    category: 'CHAIR' as const,
    material: 'Sắt, gỗ thông',
    images: ['https://example.com/ghe-bar-1.jpg'],
    discountPercentage: 5,
  },

  // BED
  {
    name: 'Giường ngủ gỗ sồi King Size Royal',
    description:
      'Giường ngủ King Size gỗ sồi Mỹ nguyên khối. Đầu giường bọc da cao cấp, có ngăn kéo đựng đồ. Kích thước 2000x2200mm. Kèm dát giường.',
    price: 38000000,
    stock: 12,
    category: 'BED' as const,
    material: 'Gỗ sồi Mỹ, da',
    images: [
      'https://example.com/giuong-soi-1.jpg',
      'https://example.com/giuong-soi-2.jpg',
    ],
    discountPercentage: 10,
  },
  {
    name: 'Giường tầng trẻ em Dreamland',
    description:
      'Giường tầng cho trẻ em, gỗ thông nhập khẩu New Zealand. Thiết kế an toàn với thanh chắn, cầu thang có ngăn kéo. Kích thước tầng 1200x2000mm.',
    price: 15000000,
    stock: 20,
    category: 'BED' as const,
    material: 'Gỗ thông',
    images: ['https://example.com/giuong-tang-1.jpg'],
    discountPercentage: 0,
  },
  {
    name: 'Giường đơn có ngăn kéo Storage',
    description:
      'Giường đơn thông minh với 3 ngăn kéo lớn bên dưới. Gỗ công nghiệp MDF phủ melamine chống ẩm. Kích thước 1200x2000mm.',
    price: 6500000,
    stock: 28,
    category: 'BED' as const,
    material: 'Gỗ MDF',
    images: ['https://example.com/giuong-ngan-keo-1.jpg'],
    discountPercentage: 7,
  },

  // CABINET
  {
    name: 'Tủ quần áo 4 cánh gỗ công nghiệp Premium',
    description:
      'Tủ quần áo 4 cánh, 2 cánh gương soi toàn thân. Gỗ MDF phủ melamine vân gỗ óc chó. Có thanh treo, ngăn kéo và kệ đựng đồ. Kích thước 2000x600x2200mm.',
    price: 12500000,
    stock: 18,
    category: 'CABINET' as const,
    material: 'Gỗ MDF',
    images: ['https://example.com/tu-quan-ao-1.jpg'],
    discountPercentage: 10,
  },
  {
    name: 'Tủ bếp chữ L Modular Kitchen',
    description:
      'Tủ bếp modular thiết kế chữ L, gỗ Acrylic bóng gương. Tích hợp bồn rửa inox, bếp từ. Kích thước 3000x2000mm. Bao gồm lắp đặt.',
    price: 85000000,
    stock: 5,
    category: 'CABINET' as const,
    material: 'Gỗ Acrylic, inox',
    images: [
      'https://example.com/tu-bep-1.jpg',
      'https://example.com/tu-bep-2.jpg',
    ],
    discountPercentage: 5,
  },
  {
    name: 'Tủ giày thông minh 5 tầng',
    description:
      'Tủ giày 5 tầng xoay, chứa được 30 đôi giày. Gỗ công nghiệp chống ẩm, có quạt thông gió. Kích thước 600x350x1700mm.',
    price: 4200000,
    stock: 35,
    category: 'CABINET' as const,
    material: 'Gỗ công nghiệp',
    images: ['https://example.com/tu-giay-1.jpg'],
    discountPercentage: 0,
  },

  // SHELF
  {
    name: 'Kệ sách gỗ 5 tầng Bookworm',
    description:
      'Kệ sách 5 tầng gỗ cao su tự nhiên, thiết kế đơn giản hiện đại. Sức chứa lớn, có thể điều chỉnh khoảng cách giữa các tầng. Kích thước 800x300x1800mm.',
    price: 3800000,
    stock: 40,
    category: 'SHELF' as const,
    material: 'Gỗ cao su',
    images: ['https://example.com/ke-sach-1.jpg'],
    discountPercentage: 8,
  },
  {
    name: 'Kệ trang trí treo tường Floating',
    description:
      'Bộ 3 kệ treo tường floating shelf, gỗ MDF phủ veneer óc chó. Chịu lực tốt, dễ lắp đặt. Kích thước 600x200x30mm, 800x200x30mm, 1000x200x30mm.',
    price: 1500000,
    stock: 55,
    category: 'SHELF' as const,
    material: 'Gỗ MDF veneer',
    images: ['https://example.com/ke-treo-tuong-1.jpg'],
    discountPercentage: 0,
  },
  {
    name: 'Kệ TV gỗ công nghiệp Entertainment',
    description:
      'Kệ TV kết hợp tủ đựng đồ, gỗ MDF phủ melamine. Có ngăn để loa, đầu đĩa và ngăn kéo. Phù hợp TV 55-75 inch. Kích thước 1800x400x500mm.',
    price: 5500000,
    stock: 25,
    category: 'SHELF' as const,
    material: 'Gỗ MDF',
    images: ['https://example.com/ke-tv-1.jpg'],
    discountPercentage: 12,
  },

  // LIGHTING
  {
    name: 'Đèn chùm pha lê Crystal Chandelier',
    description:
      'Đèn chùm pha lê K9 cao cấp, 12 bóng LED. Thiết kế sang trọng, phù hợp phòng khách và phòng ăn. Đường kính 800mm, chiều cao 600mm.',
    price: 18000000,
    stock: 10,
    category: 'LIGHTING' as const,
    material: 'Pha lê K9, inox',
    images: ['https://example.com/den-chum-1.jpg'],
    discountPercentage: 15,
  },
  {
    name: 'Đèn sàn đọc sách Floor Lamp',
    description:
      'Đèn sàn đọc sách, thân kim loại mạ đồng. Có điều chỉnh độ sáng 3 mức và góc chiếu. Chiều cao 1600mm, bóng LED 12W.',
    price: 2800000,
    stock: 30,
    category: 'LIGHTING' as const,
    material: 'Kim loại mạ đồng',
    images: ['https://example.com/den-san-1.jpg'],
    discountPercentage: 0,
  },
  {
    name: 'Đèn bàn làm việc LED Smart',
    description:
      'Đèn bàn LED thông minh, điều khiển qua app. Có 5 chế độ ánh sáng, hẹn giờ tắt. Thiết kế gập gọn, cổng sạc USB. Công suất 10W.',
    price: 1200000,
    stock: 50,
    category: 'LIGHTING' as const,
    material: 'Nhựa ABS, nhôm',
    images: ['https://example.com/den-ban-1.jpg'],
    discountPercentage: 5,
  },

  // DECORATION
  {
    name: 'Tranh canvas nghệ thuật Abstract',
    description:
      'Bộ 3 tranh canvas trừu tượng, in UV chất lượng cao. Khung gỗ thông chống cong vênh. Kích thước mỗi tấm 400x600mm. Phù hợp trang trí phòng khách, phòng ngủ.',
    price: 1800000,
    stock: 45,
    category: 'DECORATION' as const,
    material: 'Canvas, gỗ thông',
    images: ['https://example.com/tranh-canvas-1.jpg'],
    discountPercentage: 0,
  },
  {
    name: 'Gương trang trí khung mây Bohemian',
    description:
      'Gương trang trí khung mây đan thủ công phong cách Bohemian. Gương Bỉ chống mốc. Đường kính 600mm, phù hợp treo tường phòng khách, phòng ngủ.',
    price: 2500000,
    stock: 25,
    category: 'DECORATION' as const,
    material: 'Mây, gương Bỉ',
    images: ['https://example.com/guong-may-1.jpg'],
    discountPercentage: 10,
  },
  {
    name: 'Bình hoa gốm sứ Bát Tràng',
    description:
      'Bình hoa gốm sứ Bát Tràng vẽ tay họa tiết hoa sen. Sản phẩm thủ công mỹ nghệ, mỗi sản phẩm là duy nhất. Chiều cao 350mm, đường kính miệng 80mm.',
    price: 850000,
    stock: 60,
    category: 'DECORATION' as const,
    material: 'Gốm sứ',
    images: ['https://example.com/binh-hoa-1.jpg'],
    discountPercentage: 0,
  },
  {
    name: 'Thảm trải sàn len Vintage',
    description:
      'Thảm trải sàn len tự nhiên dệt thủ công, họa tiết Vintage. Mềm mại, giữ ấm tốt. Kích thước 2000x3000mm. Phù hợp phòng khách, phòng ngủ.',
    price: 6500000,
    stock: 15,
    category: 'DECORATION' as const,
    material: 'Len tự nhiên',
    images: ['https://example.com/tham-len-1.jpg'],
    discountPercentage: 8,
  },
];

// ==================== SEED FUNCTIONS ====================

async function seedUsers(): Promise<void> {
  console.log('🌱 Seeding users...');

  for (const userData of usersData) {
    const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);

    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        ...userData,
        password: hashedPassword,
      },
    });

    console.log(`  ✅ Created user: ${user.email} (${user.role})`);
  }

  console.log(`✅ Seeded ${usersData.length} users\n`);
}

async function seedProducts(): Promise<void> {
  console.log('🌱 Seeding products...');

  for (const productData of productsData) {
    const product = await prisma.product.create({
      data: productData,
    });

    console.log(`  ✅ Created product: ${product.name}`);
  }

  console.log(`✅ Seeded ${productsData.length} products\n`);
}

async function main(): Promise<void> {
  console.log('🚀 Starting database seed...\n');

  try {
    // Xóa dữ liệu cũ (optional - bỏ comment nếu muốn reset)
    // await prisma.product.deleteMany();
    // await prisma.user.deleteMany();
    // console.log('🗑️  Cleared existing data\n');

    await seedUsers();
    await seedProducts();

    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
