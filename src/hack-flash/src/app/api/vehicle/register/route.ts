import { Vehicle } from '@/domain/Vehicle';
import { VehicleRepository } from '@/domain/VehicleRepository';

export async function POST(request: Request) {

    const data: Vehicle = await request.json();
    const vehicleRepo = new VehicleRepository();
    const registered = await vehicleRepo.insert(data);

    return new Response(JSON.stringify({
      registered
    }), { 
      status: 200,
      headers: {
      'Content-Type': 'application/json'
    }})
  }
  