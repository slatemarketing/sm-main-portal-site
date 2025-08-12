import { PrismaClient, CompanyStatus, UserRole } from "@/generated/prisma";
import { auth } from "@/lib/auth";
import { hashPassword } from "better-auth/crypto";

const prisma = new PrismaClient();

// Sample company data
const companyNames = [
  "TechCorp Solutions",
  "InnovateLab Inc",
  "Digital Dynamics",
  "FutureWave Technologies",
  "SmartSystems Ltd",
  "CloudFirst Solutions",
  "DataDriven Enterprises",
  "NextGen Software",
  "CyberShield Security",
  "AI Innovations",
  "BlockChain Builders",
  "QuantumLeap Technologies",
  "GreenTech Solutions",
  "HealthTech Innovations",
  "EduTech Systems",
  "FinTech Solutions",
  "RetailTech Corp",
  "MediaTech Studios",
  "SportsTech Analytics",
  "TravelTech Solutions",
  "FoodTech Innovations",
  "AgriTech Systems",
  "PropTech Solutions",
  "AutoTech Industries",
  "BioTech Research",
];

const companyDescriptions = [
  "Leading provider of innovative technology solutions",
  "Pioneering the future of digital transformation",
  "Revolutionizing business through cutting-edge technology",
  "Delivering next-generation software solutions",
  "Empowering businesses with smart technology",
  "Transforming industries through innovation",
  "Building tomorrow's technology today",
  "Creating seamless digital experiences",
];

const domains = [
  "techcorp.com",
  "innovatelab.com",
  "digitaldynamics.io",
  "futurewave.tech",
  "smartsystems.net",
  "cloudfirst.co",
  "datadriven.biz",
  "nextgensoft.com",
  "cybershield.security",
  "aiinnovations.ai",
  "blockchain.builders",
  "quantumleap.tech",
  "greentech.eco",
  "healthtech.med",
  "edutech.edu",
  "fintech.finance",
  "retailtech.store",
  "mediatech.studio",
  "sportstech.analytics",
  "traveltech.travel",
  "foodtech.kitchen",
  "agritech.farm",
  "proptech.realty",
  "autotech.auto",
  "biotech.research",
];

// Sample user data
const firstNames = [
  "James",
  "Mary",
  "John",
  "Patricia",
  "Robert",
  "Jennifer",
  "Michael",
  "Linda",
  "David",
  "Elizabeth",
  "William",
  "Barbara",
  "Richard",
  "Susan",
  "Joseph",
  "Jessica",
  "Thomas",
  "Sarah",
  "Christopher",
  "Karen",
  "Charles",
  "Nancy",
  "Daniel",
  "Lisa",
  "Matthew",
  "Betty",
  "Anthony",
  "Helen",
  "Mark",
  "Sandra",
  "Donald",
  "Donna",
  "Steven",
  "Carol",
  "Paul",
  "Ruth",
  "Andrew",
  "Sharon",
  "Joshua",
  "Michelle",
  "Kenneth",
  "Laura",
  "Kevin",
  "Sarah",
  "Brian",
  "Kimberly",
  "George",
  "Deborah",
  "Timothy",
  "Dorothy",
  "Ronald",
  "Lisa",
  "Jason",
  "Nancy",
  "Edward",
  "Karen",
];

const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Perez",
  "Thompson",
  "White",
  "Harris",
  "Sanchez",
  "Clark",
  "Ramirez",
  "Lewis",
  "Robinson",
  "Walker",
  "Young",
  "Allen",
  "King",
  "Wright",
  "Scott",
  "Torres",
  "Nguyen",
  "Hill",
  "Flores",
  "Green",
  "Adams",
  "Nelson",
  "Baker",
  "Hall",
  "Rivera",
  "Campbell",
  "Mitchell",
];

const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "Fort Worth",
  "Columbus",
  "Charlotte",
  "San Francisco",
  "Indianapolis",
  "Seattle",
  "Denver",
  "Washington",
  "Boston",
  "El Paso",
  "Detroit",
  "Nashville",
  "Portland",
];

const states = [
  "NY",
  "CA",
  "IL",
  "TX",
  "AZ",
  "PA",
  "FL",
  "OH",
  "NC",
  "WA",
  "CO",
  "DC",
  "MA",
  "MI",
  "TN",
  "OR",
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateCompanyEmail(companyName: string, domain: string): string {
  const prefix = companyName.toLowerCase().replace(/[^a-z0-9]/g, "");
  return `contact@${domain}`;
}

function generateUserEmail(
  firstName: string,
  lastName: string,
  domain: string
): string {
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
}

function generateGenericUserEmail(
  firstName: string,
  lastName: string
): string {
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'protonmail.com'];
  const domain = getRandomElement(domains);
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
}

function generateAddress(): string {
  const streetNumber = getRandomInt(100, 9999);
  const streetNames = [
    "Main St",
    "Oak Ave",
    "First St",
    "Second Ave",
    "Park Rd",
    "Center St",
    "Elm St",
    "Maple Ave",
  ];
  return `${streetNumber} ${getRandomElement(streetNames)}`;
}

async function createSlateMarketing() {
  console.log("Generating SLATE MARKETING as a company, if not already found");

  const slateMarketing = await prisma.company.findUnique({
    where: { id: process.env.SM_COMPANY_ID },
  });

  if (slateMarketing) {
    console.log("SLATE MARKETING ALREADY A COMPANY. SKIPPING GENERATION");
    return;
  }

  console.log("Generating SM Company");

  const company = await prisma.company.create({
    data: {
      id: process.env.SM_COMPANY_ID,
      name: "Slate Marketing",
      description: "The Marketing Agency who created this.",
      logo: `https://ui.avatars.com/api/?name=${encodeURIComponent(
        "Slate Marketing"
      )}`,
      email: "admin@slatemarketing.org",
      phone: "+13134827898",
      status: "ACTIVE",
      address: "347 Neff Rd",
      city: "Grosse Pointe",
      state: "MI",
      postalCode: "48230",
      country: "USA",
      billingEmail: "billing@slatemarketing.org",
      billingAddress: "347 Neff Rd",
      billingCity: "Grosse Pointe",
      billingState: "MI",
      billingPostalCode: "48230",
      billingCountry: "USA",
      taxId: null,
    },
  });

  console.log("Generated SM Company");

  // Create Users

  console.log("Generating SM Users");
  const slateUsers = [
    {
      name: "Nicholas Walsh",
      email: "nickw@slatemarketing.org",
      password: "N!cholas0821",
    },
    {
      name: "Arieh Zeitlin",
      email: "ariz@slatemarketing.org",
      password: "N!cholas0821",
    },
    {
      name: "Support Marketing",
      email: "support@slatemarketing.org",
      password: "N!cholas0821",
    },
  ];

  for (let i = 0; i < slateUsers.length; i++) {
    const userData = slateUsers[i];
    const hashedPassword = await hashPassword(userData.password);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      console.log(`User ${userData.email} already exists, skipping`);
      continue;
    }

    const user = await prisma.user.create({
      data: {
        id: `sm_user_${i}`,
        name: userData.name,
        email: userData.email,
        emailVerified: true,
        role: UserRole.ADMIN,
        companyId: company.id,
        image: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          userData.name
        )}&background=random`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Create account with hashed password
    await prisma.account.create({
      data: {
        id: `account_${user.id}`,
        userId: user.id,
        accountId: user.email,
        providerId: "credential",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Create profile
    const [firstName, ...lastNameParts] = userData.name.split(" ");
    const lastName = lastNameParts.join(" ");

    await prisma.profile.create({
      data: {
        userId: user.id,
        firstName: firstName,
        lastName: lastName,
        company: company.name,
        phone: "+13134827898",
        bio: `${firstName} is a key member of the Slate Marketing team.`,
        avatar: user.image,
      },
    });

    console.log(`Created SM user: ${user.name}`);
  }
  console.log("Generated SM Users");
}

async function createCompanies() {
  console.log("Creating 25 sample companies...");

  const companies = [];

  for (let i = 0; i < 25; i++) {
    const companyName = companyNames[i];
    const domain = domains[i];
    const city = getRandomElement(cities);
    const state = getRandomElement(states);

    const company = await prisma.company.create({
      data: {
        name: companyName,
        description: getRandomElement(companyDescriptions),
        logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          companyName
        )}&background=random`,
        email: generateCompanyEmail(companyName, domain),
        phone: `+1 (${getRandomInt(200, 999)}) ${getRandomInt(
          200,
          999
        )}-${getRandomInt(1000, 9999)}`,
        status: getRandomElement([
          CompanyStatus.ACTIVE,
          CompanyStatus.PENDING,
          CompanyStatus.INACTIVE,
        ]),
        address: generateAddress(),
        city: city,
        state: state,
        postalCode: getRandomInt(10000, 99999).toString(),
        country: "USA",
        billingEmail: Math.random() > 0.5 ? `billing@${domain}` : null,
        billingAddress: Math.random() > 0.7 ? generateAddress() : null,
        billingCity: Math.random() > 0.7 ? getRandomElement(cities) : null,
        billingState: Math.random() > 0.7 ? getRandomElement(states) : null,
        billingPostalCode:
          Math.random() > 0.7 ? getRandomInt(10000, 99999).toString() : null,
        billingCountry: Math.random() > 0.7 ? "USA" : "",
        taxId:
          Math.random() > 0.6
            ? `${getRandomInt(10, 99)}-${getRandomInt(1000000, 9999999)}`
            : null,
      },
    });

    companies.push(company);
    console.log(`Created company: ${company.name}`);
  }

  return companies;
}

async function createUsers(companies: any[]) {
  console.log("Creating 80 sample users...");

  const users = [];
  let userCount = 0;
  const defaultPassword = await hashPassword("password123"); // Default password for seeded users

  // Ensure each company has at least 1 user
  for (const company of companies) {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const domain = company.email.split("@")[1];
    const email = generateUserEmail(firstName, lastName, domain);

    const user = await prisma.user.create({
      data: {
        id: `user_${Date.now()}_${userCount}`,
        name: `${firstName} ${lastName}`,
        email: email,
        emailVerified: Math.random() > 0.3, // 70% chance of being verified
        image: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          firstName + " " + lastName
        )}&background=random`,
        role: Math.random() > 0.9 ? UserRole.ADMIN : UserRole.CLIENT, // 10% chance of admin
        companyId: company.id,
        createdAt: new Date(
          Date.now() - getRandomInt(1, 365) * 24 * 60 * 60 * 1000
        ), // Random date in last year
        updatedAt: new Date(),
      },
    });

    // Create account with password
    await prisma.account.create({
      data: {
        id: `account_${user.id}`,
        userId: user.id,
        accountId: email,
        providerId: "credential",
        password: defaultPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Create profile for user
    await prisma.profile.create({
      data: {
        userId: user.id,
        firstName: firstName,
        lastName: lastName,
        company: company.name,
        phone: `+1 (${getRandomInt(200, 999)}) ${getRandomInt(
          200,
          999
        )}-${getRandomInt(1000, 9999)}`,
        bio: `${firstName} is a dedicated professional at ${company.name}.`,
        avatar: user.image,
      },
    });

    users.push(user);
    userCount++;
    console.log(`Created user: ${user.name} at ${company.name}`);
  }

  // Create remaining users (40 with companies, 15 without companies)
  const remainingUsersWithCompany = 40;
  const usersWithoutCompany = 15;
  
  // Create 40 more users with companies
  for (let i = 0; i < remainingUsersWithCompany; i++) {
    const company = getRandomElement(companies);
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const domain = company.email.split("@")[1];
    const email = generateUserEmail(firstName, lastName, domain);

    const user = await prisma.user.create({
      data: {
        id: `user_${Date.now()}_${userCount}`,
        name: `${firstName} ${lastName}`,
        email: email,
        emailVerified: Math.random() > 0.3,
        image: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          firstName + " " + lastName
        )}&background=random`,
        role: Math.random() > 0.9 ? UserRole.ADMIN : UserRole.CLIENT,
        companyId: company.id,
        createdAt: new Date(
          Date.now() - getRandomInt(1, 365) * 24 * 60 * 60 * 1000
        ),
        updatedAt: new Date(),
      },
    });

    // Create account with password
    await prisma.account.create({
      data: {
        id: `account_${user.id}`,
        userId: user.id,
        accountId: email,
        providerId: "credential",
        password: defaultPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Create profile for user
    await prisma.profile.create({
      data: {
        userId: user.id,
        firstName: firstName,
        lastName: lastName,
        company: company.name,
        phone: `+1 (${getRandomInt(200, 999)}) ${getRandomInt(
          200,
          999
        )}-${getRandomInt(1000, 9999)}`,
        bio: `${firstName} is a valuable team member at ${company.name}.`,
        avatar: user.image,
      },
    });

    users.push(user);
    userCount++;
    console.log(`Created user: ${user.name} at ${company.name}`);
  }

  // Create 15 users without companies
  for (let i = 0; i < usersWithoutCompany; i++) {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const email = generateGenericUserEmail(firstName, lastName);

    const user = await prisma.user.create({
      data: {
        id: `user_${Date.now()}_${userCount}`,
        name: `${firstName} ${lastName}`,
        email: email,
        emailVerified: Math.random() > 0.3,
        image: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          firstName + " " + lastName
        )}&background=random`,
        role: UserRole.CLIENT, // Independent users are clients
        companyId: null, // No company
        createdAt: new Date(
          Date.now() - getRandomInt(1, 365) * 24 * 60 * 60 * 1000
        ),
        updatedAt: new Date(),
      },
    });

    // Create account with password
    await prisma.account.create({
      data: {
        id: `account_${user.id}`,
        userId: user.id,
        accountId: email,
        providerId: "credential",
        password: defaultPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Create profile for user (no company info)
    await prisma.profile.create({
      data: {
        userId: user.id,
        firstName: firstName,
        lastName: lastName,
        company: null, // No company
        phone: `+1 (${getRandomInt(200, 999)}) ${getRandomInt(
          200,
          999
        )}-${getRandomInt(1000, 9999)}`,
        bio: `${firstName} is an independent professional.`,
        avatar: user.image,
      },
    });

    users.push(user);
    userCount++;
    console.log(`Created independent user: ${user.name}`);
  }

  return users;
}

async function main() {
  console.log("Starting database seeding...");

  try {
    // Create Slate Marketing
    await createSlateMarketing();
    console.log("Slate Marketing Generated!");

    // Create companies first
    const companies = await createCompanies();

    // Then create users
    const users = await createUsers(companies);

    console.log("\n✅ Database seeding completed successfully!");
    console.log(
      `Created ${companies.length} companies and ${users.length} users`
    );

    // Show distribution
    const companyUserCounts = await prisma.company.findMany({
      select: {
        name: true,
        _count: {
          select: { users: true },
        },
      },
    });

    console.log("\nUser distribution by company:");
    companyUserCounts.forEach((company) => {
      console.log(`${company.name}: ${company._count.users} users`);
    });
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
