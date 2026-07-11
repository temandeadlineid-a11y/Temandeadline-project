import { makeCrud } from "@/lib/crud";
const crud = makeCrud("teamMember", { joinedAt: "asc" });
export const GET = crud.GET;
export const POST = crud.POST;
