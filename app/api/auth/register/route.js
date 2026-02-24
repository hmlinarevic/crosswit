import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid JSON" },
      { status: 400 }
    );
  }

  const { email, password, name } = body ?? {};
  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  const trimmedEmail = String(email).trim().toLowerCase();
  if (String(password).length < 8) {
    return NextResponse.json(
      { message: "Password must be at least 8 characters" },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({
    where: { email: trimmedEmail },
  });
  if (existing) {
    return NextResponse.json(
      { message: "An account with this email already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(String(password), 12);
  const user = await prisma.user.create({
    data: {
      email: trimmedEmail,
      hashedPassword,
      name: name ? String(name).trim() : null,
    },
    select: { id: true, email: true, name: true },
  });

  return NextResponse.json(user, { status: 201 });
}
