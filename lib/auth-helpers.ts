import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  return session?.user ?? null;
}

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("UNAUTHORIZED");
  }

  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();

  if (user.role !== "ADMIN") {
    throw new Error("FORBIDDEN");
  }

  return user;
}

export async function requireCategoryStaff() {
  const user = await requireAuth();

  if (user.role !== "ADMIN" && user.role !== "CATEGORY_STAFF") {
    throw new Error("FORBIDDEN");
  }

  return user;
}

export async function requireCategoryAccess(categoryId: string) {
  const user = await requireCategoryStaff();

  if (user.role !== "ADMIN" && user.categoryId !== categoryId) {
    throw new Error("FORBIDDEN");
  }

  return user;
}
