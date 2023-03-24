import { VehicleRepository } from "@/domain/VehicleRepository";

export async function GET(request: Request) {

    const vehicleRepo = new VehicleRepository();
    const types = vehicleRepo.vehicleTypes()
  
    return new Response(JSON.stringify(
        types
      ), { 
        status: 200,
        headers: {
        'Content-Type': 'application/json'
      }})
  }
  