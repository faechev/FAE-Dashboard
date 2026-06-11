import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const proyecto = await prisma.proyecto.update({
      where: { id },
      data: {
        nombre: body.nombre,
        cliente: body.cliente,
        estado: body.estado,
        fecha: body.fecha,
      },
    });
    return NextResponse.json(proyecto);
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar proyecto" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.proyecto.delete({
      where: { id },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar proyecto" }, { status: 500 });
  }
}