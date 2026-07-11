import { makeCrud } from "@/lib/crud";
const crud = makeCrud("testimonial");
export const PUT = crud.PUT;
export const DELETE = crud.DELETE;
