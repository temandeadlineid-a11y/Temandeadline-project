import { makeCrud } from "@/lib/crud";
const crud = makeCrud("service");
export const PUT = crud.PUT;
export const DELETE = crud.DELETE;
