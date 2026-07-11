import { makeCrud } from "@/lib/crud";
const crud = makeCrud("pricingTier");
export const PUT = crud.PUT;
export const DELETE = crud.DELETE;
