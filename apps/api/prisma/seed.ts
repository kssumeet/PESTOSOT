import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const SEED_ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL ?? 'admin@pestosot.com';
const SEED_ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD ?? 'Admin@12345';

interface ServiceSeed {
  slug: string;
  name: string;
  category: string;
  shortDesc: string;
  isPopular: boolean;
}

interface LocationSeed {
  slug: string;
  name: string;
}

const services: ServiceSeed[] = [
  {
    slug: 'cockroach-control',
    name: 'Cockroach Control',
    category: 'pest-control',
    shortDesc: 'Targeted gel and spray treatment to eliminate cockroach infestations.',
    isPopular: true,
  },
  {
    slug: 'termite-control',
    name: 'Termite Control',
    category: 'pest-control',
    shortDesc: 'Anti-termite drilling and chemical barrier treatment for homes and offices.',
    isPopular: true,
  },
  {
    slug: 'rodent-control',
    name: 'Rodent Control',
    category: 'pest-control',
    shortDesc: 'Safe trapping and baiting to keep rats and mice away.',
    isPopular: false,
  },
  {
    slug: 'bed-bug-control',
    name: 'Bed Bug Control',
    category: 'pest-control',
    shortDesc: 'Heat and chemical treatment to fully remove bed bugs.',
    isPopular: false,
  },
  {
    slug: 'mosquito-control',
    name: 'Mosquito Control',
    category: 'pest-control',
    shortDesc: 'Fogging and larvicidal treatment for mosquito-free spaces.',
    isPopular: true,
  },
  {
    slug: 'kitchen-deep-cleaning',
    name: 'Kitchen Deep Cleaning',
    category: 'deep-cleaning',
    shortDesc: 'Degreasing, sanitisation and detailed cleaning of your kitchen.',
    isPopular: true,
  },
  {
    slug: 'sofa-cleaning',
    name: 'Sofa Cleaning',
    category: 'deep-cleaning',
    shortDesc: 'Deep shampoo and vacuum cleaning for upholstery and sofas.',
    isPopular: false,
  },
  {
    slug: 'amc',
    name: 'Annual Maintenance Contract',
    category: 'pest-control',
    shortDesc: 'Year-round scheduled pest-control visits at a discounted package.',
    isPopular: false,
  },
];

const locations: LocationSeed[] = [
  { slug: 'whitefield', name: 'Whitefield' },
  { slug: 'hsr-layout', name: 'HSR Layout' },
  { slug: 'koramangala', name: 'Koramangala' },
  { slug: 'electronic-city', name: 'Electronic City' },
  { slug: 'indiranagar', name: 'Indiranagar' },
  { slug: 'marathahalli', name: 'Marathahalli' },
];

async function main(): Promise<void> {
  const passwordHash = await bcrypt.hash(SEED_ADMIN_PASSWORD, 10);

  const admin = await prisma.user.upsert({
    where: { email: SEED_ADMIN_EMAIL },
    update: {
      passwordHash,
      name: 'PESTOSOT Admin',
      role: Role.ADMIN,
      isActive: true,
    },
    create: {
      email: SEED_ADMIN_EMAIL,
      passwordHash,
      name: 'PESTOSOT Admin',
      role: Role.ADMIN,
      isActive: true,
    },
  });

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {
        name: service.name,
        category: service.category,
        shortDesc: service.shortDesc,
        isPopular: service.isPopular,
      },
      create: service,
    });
  }

  for (const location of locations) {
    await prisma.location.upsert({
      where: { slug: location.slug },
      update: { name: location.name },
      create: location,
    });
  }

  console.log('Seed complete:');
  console.log(`  Admin user: ${admin.email} (role=${admin.role})`);
  console.log(`  Services upserted: ${services.length}`);
  console.log(`  Locations upserted: ${locations.length}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error('Seed failed:', error);
    await prisma.$disconnect();
    process.exit(1);
  });
