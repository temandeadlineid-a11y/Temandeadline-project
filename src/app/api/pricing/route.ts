import { makeCrud } from "@/lib/crud";
const crud = makeCrud("pricingTier");
export const GET = crud.GET;
export const POST = crud.POST;
