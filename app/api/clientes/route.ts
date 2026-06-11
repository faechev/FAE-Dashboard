import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const clientes = await prisma.cliente.findMany({
      orderBy: { creadoEn: "desc" },
    });
    return NextResponse.json(clientes);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener clientes" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cliente = await prisma.cliente.create({
      data: {
        nombre: body.nombre,
        empresa: body.empresa,
        email: body.email,
        telefono: body.telefono,
      },
    });
    return NextResponse.json(cliente);
  } catch (error) {
    return NextResponse.json({ error: "Error al crear cliente" }, { status: 500 });
  }
}