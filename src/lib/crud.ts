import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

type Params = { params: { id: string } };

function delegate(model: string) {
  return (prisma as any)[model];
}

async function guard() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export function makeCrud(model: string, orderBy: object = { order: "asc" }) {
  return {
    async GET() {
      const denied = await guard();
      if (denied) return denied;
      const items = await delegate(model).findMany({ orderBy });
      return NextResponse.json(items);
    },
    async POST(req: Request) {
      const denied = await guard();
      if (denied) return denied;
      const data = await req.json();
      delete data.id;
      const item = await delegate(model).create({ data });
      return NextResponse.json(item, { status: 201 });
    },
    async PUT(req: Request, { params }: Params) {
      const denied = await guard();
      if (denied) return denied;
      const data = await req.json();
      delete data.id;
      const item = await delegate(model).update({ where: { id: params.id }, data });
      return NextResponse.json(item);
    },
    async DELETE(_req: Request, { params }: Params) {
      const denied = await guard();
      if (denied) return denied;
      await delegate(model).delete({ where: { id: params.id } });
      return NextResponse.json({ ok: true });
    },
  };
}
