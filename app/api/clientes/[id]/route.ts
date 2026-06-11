import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const cliente = await prisma.cliente.update({
      where: { id: params.id },
      data: {
        nombre: body.nombre,
        empresa: body.empresa,
        email: body.email,
        telefono: body.telefono,
      },
    });
    return NextResponse.json(cliente);
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar cliente" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.cliente.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar cliente" }, { status: 500 });
  }
}