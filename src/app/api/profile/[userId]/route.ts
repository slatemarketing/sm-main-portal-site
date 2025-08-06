import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    // Await params before using its properties
    const { userId } = await params;
    
    // Verify the user is authenticated and can access this profile
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Users can only access their own profile (unless admin)
    const userIsAdmin = session.user && 'role' in session.user && session.user.role === 'ADMIN';
    if (session.user.id !== userId && !userIsAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const profile = await prisma.profile.findUnique({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    // Await params before using its properties
    const { userId } = await params;
    
    // Verify the user is authenticated and can access this profile
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Users can only update their own profile (unless admin)
    const userIsAdmin = session.user && 'role' in session.user && session.user.role === 'ADMIN';
    if (session.user.id !== userId && !userIsAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { firstName, lastName, company, phone, bio, avatar } = body;

    // Upsert the profile (create if doesn't exist, update if it does)
    const profile = await prisma.profile.upsert({
      where: {
        userId: userId,
      },
      update: {
        firstName,
        lastName,
        company,
        phone,
        bio,
        avatar,
        updatedAt: new Date(),
      },
      create: {
        userId: userId,
        firstName,
        lastName,
        company,
        phone,
        bio,
        avatar,
      },
    });

    return NextResponse.json({ profile, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}