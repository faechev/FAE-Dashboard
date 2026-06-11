import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const proyecto = await prisma.proyecto.update({
      where: { id: params.id },
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
  { params }: { params: { id: string } }
) {
  try {
    await prisma.proyecto.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar proyecto" }, { status: 500 });
  }
}