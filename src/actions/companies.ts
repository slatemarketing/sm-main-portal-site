"use server";

import { CompanyStatus } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import fs from "fs";

export async function getCompanies() {
  return await prisma.company.findMany({
    include: {
      _count: {
        select: { users: true },
      },
      users: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          emailVerified: true,
        },
      },
    },
  });
}

export async function getCompany(id: string) {
  return await prisma.company.findUnique({
    where: { id },
    include: {
      _count: {
        select: { users: true },
      },
      users: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          emailVerified: true,
          profile: true,
        },
      },
    },
  });
}

interface CreateCompanyProps {
  name: string;
  description?: string;
  logo?: string;
  email: string;
  phone?: string;
  status: CompanyStatus;
  address: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  billingEmail?: string;
  billingAddress?: string;
  billingCity?: string;
  billingState?: string;
  billingPostalCode?: string;
  billingCountry?: string;
  taxId?: string;
}

export async function createCompany(data: CreateCompanyProps) {
  try {
    const company = await prisma.company.create({
      data: {
        name: data.name,
        description: data.description || undefined,
        logo: data.logo || undefined,
        email: data.email,
        phone: data.phone || undefined,
        status: data.status,
        address: data.address,
        city: data.city,
        state: data.state || undefined,
        postalCode: data.postalCode,
        country: data.country,
        billingEmail: data.billingEmail || undefined,
        billingAddress: data.billingAddress || undefined,
        billingCity: data.billingCity || undefined,
        billingState: data.billingState || undefined,
        billingPostalCode: data.billingPostalCode || undefined,
        billingCountry: data.billingCountry || undefined,
        taxId: data.taxId || undefined,
      },
      include: {
        _count: {
          select: { users: true },
        },
      },
    });

    return { success: true, data: company };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to create company!");
  }
}

export async function updateCompany(
  id: string,
  data: Partial<CreateCompanyProps>
) {
  try {
    const company = await prisma.company.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description || undefined,
        logo: data.logo || undefined,
        email: data.email,
        phone: data.phone || undefined,
        status: data.status,
        address: data.address,
        city: data.city,
        state: data.state || undefined,
        postalCode: data.postalCode,
        country: data.country,
        billingEmail: data.billingEmail || undefined,
        billingAddress: data.billingAddress || undefined,
        billingCity: data.billingCity || undefined,
        billingState: data.billingState || undefined,
        billingPostalCode: data.billingPostalCode || undefined,
        billingCountry: data.billingCountry || undefined,
        taxId: data.taxId || undefined,
      },
      include: {
        _count: {
          select: { users: true },
        },
      },
    });

    return { success: true, data: company };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to update company!");
  }
}

export async function deleteCompany(id: string) {
  try {
    // First check if there are users associated with this company
    const company = await prisma.company.findUnique({
      where: { id },
      include: {
        _count: {
          select: { users: true },
        },
      },
    });

    if (!company) {
      throw new Error("Company not found");
    }

    // if (company._count.users > 0) {
    //   throw new Error("Cannot delete company with associated users. Please remove users first.");
    // }

    if (company.id === process.env.SM_COMPANY_ID) {
      throw new Error("You cannot delete this company!");
    }

    await prisma.company.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete company"
    );
  }
}

export async function updateCompanyStatus(id: string, status: CompanyStatus) {
  try {
    const company = await prisma.company.update({
      where: { id },
      data: { status },
      include: {
        _count: {
          select: { users: true },
        },
      },
    });

    return { success: true, data: company };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to update company status!");
  }
}

export async function exportCompany(companyId: string) {
  const company = await prisma.company.findUnique({
    where: { id: companyId },
    include: { users: true },
  });
  const data = await prisma.company.findUnique({
    where: { id: companyId },
    include: { users: true },
  });
  fs.writeFileSync(
    `${company!.id}-DATA-${new Date()}.json`,
    JSON.stringify(data, null, 2)
  );
}

export async function exportCompanyToUser(companyId: string) {
  const company = await prisma.company.findUnique({
    where: { id: companyId },
    include: { 
      users: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          emailVerified: true,
          profile: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  if (!company) {
    throw new Error("Company not found");
  }

  const exportData = {
    company: {
      id: company.id,
      name: company.name,
      description: company.description,
      email: company.email,
      phone: company.phone,
      status: company.status,
      address: company.address,
      city: company.city,
      state: company.state,
      postalCode: company.postalCode,
      country: company.country,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    },
    users: company.users,
    exportDate: new Date().toISOString(),
    totalUsers: company.users.length,
  };

  const fileName = `${company.name.replace(/[^a-zA-Z0-9]/g, '_')}_export_${new Date().toISOString().split('T')[0]}.json`;
  const jsonData = JSON.stringify(exportData, null, 2);

  return {
    fileName,
    data: jsonData,
    mimeType: 'application/json',
  };
}
