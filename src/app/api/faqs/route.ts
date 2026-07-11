import { makeCrud } from "@/lib/crud";
const crud = makeCrud("faq");
export const GET = crud.GET;
export const POST = crud.POST;
