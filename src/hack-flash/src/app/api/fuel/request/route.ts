import { FuelRequest } from "@/domain/FuelRequest";

export async function POST(request: Request) {
  const data: FuelRequest = await request.json();
  
  return new Response(JSON.stringify({
    status: "Not Implemented"
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
}
