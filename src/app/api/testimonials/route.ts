import { makeCrud } from "@/lib/crud";
const crud = makeCrud("testimonial");
export const GET = crud.GET;
export const POST = crud.POST;
