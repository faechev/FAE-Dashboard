import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const cliente = await prisma.cliente.update({
      where: { id },
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.cliente.delete({
      where: { id },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar cliente" }, { status: 500 });
  }
}