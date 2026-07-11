import { makeCrud } from "@/lib/crud";
const crud = makeCrud("faq");
export const PUT = crud.PUT;
export const DELETE = crud.DELETE;
