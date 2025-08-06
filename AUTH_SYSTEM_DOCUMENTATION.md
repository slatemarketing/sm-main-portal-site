# Authentication System Documentation

Based on my comprehensive analysis of your codebase, here's a detailed report on your authentication system:

## 📋 System Overview

Your project uses **Better Auth** with **Prisma** and **PostgreSQL** for authentication, implementing a role-based access control system with two user types: `ADMIN` and `CLIENT`.

## 🔧 Core Configuration

### Better Auth Setup (`src/lib/auth.ts`)
```typescript
export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: { enabled: true },
  plugins: [nextCookies()],
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "CLIENT",
      },
    },
  },
});
```

### Client Configuration (`src/lib/auth-client.ts`)
```typescript
export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
});

export const { useSession, signIn, signUp, signOut } = authClient;
```

## 🗄️ Database Schema

### User Model (Prisma)
```prisma
model User {
  id            String    @id
  name          String
  email         String    @unique
  emailVerified Boolean
  image         String?
  role          UserRole  @default(CLIENT)
  createdAt     DateTime
  updatedAt     DateTime
  sessions      Session[]
  accounts      Account[]
  profiles      Profile[]
}

enum UserRole {
  ADMIN
  CLIENT
}
```

## 🔐 Authentication Methods

### 1. Getting User Sessions

#### Client-Side (React Components)
```typescript
import { useSession } from "@/lib/auth-client";

function MyComponent() {
  const { data: session, isPending } = useSession();
  
  if (isPending) return <div>Loading...</div>;
  if (!session) return <div>Not authenticated</div>;
  
  return <div>Welcome {session.user.name}!</div>;
}
```

#### Server-Side (Server Components/API Routes)
```typescript
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function ServerComponent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if (!session) {
    redirect("/auth/signin");
  }
  
  return <div>Welcome {session.user.name}!</div>;
}
```

### 2. User Authentication Actions

#### Sign In
```typescript
import { authClient } from "@/lib/auth-client";

await authClient.signIn.email({
  email: "user@example.com",
  password: "password",
  fetchOptions: {
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (ctx) => {
      // Handle error
    },
  },
});
```

#### Sign Up
```typescript
await authClient.signUp.email({
  email: "user@example.com",
  password: "password",
  name: "User Name",
  fetchOptions: {
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (ctx) => {
      // Handle error
    },
  },
});
```

#### Sign Out
```typescript
await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      router.push("/");
    },
  },
});
```

## 🛡️ Route Protection

### 1. Middleware Protection (`middleware.ts`)
```typescript
// Protects routes at the edge
const publicRoutes = ["/", "/auth/signin", "/auth/signup", "/about", "/features", "/contact"];

// Matcher configuration
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*", 
    "/profile/:path*",
    "/settings/:path*"
  ],
};
```

### 2. Server-Side Protection
```typescript
// In server components
export default async function ProtectedPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/signin");
  }
  
  // Page content
}
```

### 3. Client-Side Protection with Role Guards
```typescript
import { RoleGuard, AdminOnly, ClientOnly, AuthenticatedOnly } from "@/components/auth/role-guard";

// Generic role guard
<RoleGuard allowedRoles={[UserRole.ADMIN, UserRole.CLIENT]}>
  <ProtectedContent />
</RoleGuard>

// Convenience components
<AdminOnly>
  <AdminContent />
</AdminOnly>

<ClientOnly>
  <ClientContent />
</ClientOnly>

<AuthenticatedOnly>
  <UserContent />
</AuthenticatedOnly>
```

## 👥 Role-Based Access Control

### Role Checking Utilities (`src/lib/roles.ts`)
```typescript
import { UserRole, isAdmin, isClient, hasAnyRole } from "@/lib/roles";

// Check specific role
const userIsAdmin = isAdmin(user);
const userIsClient = isClient(user);

// Check multiple roles
const hasAccess = hasAnyRole(user, [UserRole.ADMIN, UserRole.CLIENT]);

// Permission-based checks
const canAccessAdminPanel = canAccessAdminPanel(user);
const canManageUsers = canManageUsers(user);
```

### Displaying User Information
```typescript
function UserProfile() {
  const { data: session } = useSession();
  const user = session?.user;
  
  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      <p>Email: {user?.email}</p>
      <p>Role: {user && 'role' in user ? user.role : 'User'}</p>
    </div>
  );
}
```

## 🎨 UI Components

### 1. Authentication Forms
- **SignInForm**: `src/components/auth/sign-in-form.tsx`
- **SignUpForm**: `src/components/auth/sign-up-form.tsx`
- Both include form validation using Zod and react-hook-form

### 2. Navigation Integration
The navigation component (`src/components/navigation.tsx`) automatically shows:
- User dropdown with role information when authenticated
- Sign in button when not authenticated
- Admin-specific menu items for admin users

### 3. Role Guard Components
```typescript
// Protects content based on user roles
<RoleGuard allowedRoles={[UserRole.ADMIN]} fallback={<AccessDenied />}>
  <AdminContent />
</RoleGuard>
```

## 🔄 API Integration

### Auth API Route
- **Endpoint**: `/api/auth/[...all]`
- **Handler**: Exports GET and POST methods from Better Auth
- **Location**: `src/app/api/auth/[...all]/route.ts`

## 🚀 Usage Examples

### Creating a Protected Admin Page
```typescript
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/roles";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !isAdmin(session.user)) {
    redirect("/dashboard");
  }

  return <AdminDashboard />;
}
```

### Creating a Client Component with Auth
```typescript
"use client";

import { useSession } from "@/lib/auth-client";
import { UserRole } from "@/lib/roles";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  
  if (isPending) return <Loading />;
  if (!session) return <SignInPrompt />;
  
  const userIsAdmin = session.user && 'role' in session.user && 
                     session.user.role === UserRole.ADMIN;
  
  return (
    <div>
      <h1>Dashboard</h1>
      {userIsAdmin && <AdminPanel />}
      <UserContent />
    </div>
  );
}
```

## ⚙️ Environment Variables Required
```env
DATABASE_URL="postgresql://..."
BETTER_AUTH_URL="http://localhost:3000"  # Optional, defaults to localhost:3000
```

## 🎯 Key Features
- ✅ Email/password authentication
- ✅ Role-based access control (ADMIN/CLIENT)
- ✅ Middleware-level route protection
- ✅ Server and client-side session management
- ✅ TypeScript support with proper typing
- ✅ Form validation with Zod
- ✅ Toast notifications for auth actions
- ✅ Responsive UI components

This authentication system provides a robust foundation for user management with proper security practices, TypeScript support, and a clean separation between client and server-side authentication logic.