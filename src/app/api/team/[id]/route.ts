import { makeCrud } from "@/lib/crud";
const crud = makeCrud("teamMember", { joinedAt: "asc" });
export const PUT = crud.PUT;
export const DELETE = crud.DELETE;
