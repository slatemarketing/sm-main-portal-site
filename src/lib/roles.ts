export enum UserRole {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
}

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type Session = {
  user: User;
};

// Role checking utilities
export const hasRole = (user: User | null, role: UserRole): boolean => {
  return user?.role === role;
};

export const isAdmin = (user: User | null): boolean => {
  return hasRole(user, UserRole.ADMIN);
};

export const isClient = (user: User | null): boolean => {
  return hasRole(user, UserRole.CLIENT);
};

export const hasAnyRole = (user: User | null, roles: UserRole[]): boolean => {
  return user ? roles.includes(user.role) : false;
};

// Permission checking
export const canAccessAdminPanel = (user: User | null): boolean => {
  return isAdmin(user);
};

export const canManageUsers = (user: User | null): boolean => {
  return isAdmin(user);
};

export const canViewDashboard = (user: User | null): boolean => {
  return hasAnyRole(user, [UserRole.ADMIN, UserRole.CLIENT]);
};