import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const proyectos = await prisma.proyecto.findMany({
      orderBy: { creadoEn: "desc" },
    });
    return NextResponse.json(proyectos);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener proyectos" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const proyecto = await prisma.proyecto.create({
      data: {
        nombre: body.nombre,
        cliente: body.cliente,
        estado: body.estado,
        fecha: body.fecha,
      },
    });
    return NextResponse.json(proyecto);
  } catch (error) {
    return NextResponse.json({ error: "Error al crear proyecto" }, { status: 500 });
  }
}