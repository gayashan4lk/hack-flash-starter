import { FuelRepository } from "@/domain/FuelRepository";
import { VehicleRepository } from "@/domain/VehicleRepository";

export async function DELETE(request: Request) {

    const fuelRepo = new FuelRepository();
    const vehicleRepo = new VehicleRepository();
    fuelRepo.delete();
    await vehicleRepo.delete()
    
  return new Response(JSON.stringify(
    "Success"
  ), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
