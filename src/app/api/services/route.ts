import { makeCrud } from "@/lib/crud";
const crud = makeCrud("service");
export const GET = crud.GET;
export const POST = crud.POST;
