import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const transacciones = await prisma.transaccion.findMany({
      orderBy: { creadoEn: "desc" },
    });
    return NextResponse.json(transacciones);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener transacciones" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const transaccion = await prisma.transaccion.create({
      data: {
        descripcion: body.descripcion,
        monto: body.monto,
        tipo: body.tipo,
        categoria: body.categoria,
        fecha: body.fecha,
      },
    });
    return NextResponse.json(transaccion);
  } catch (error) {
    return NextResponse.json({ error: "Error al crear transacción" }, { status: 500 });
  }
}