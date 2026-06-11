import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.transaccion.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar transacción" }, { status: 500 });
  }
}