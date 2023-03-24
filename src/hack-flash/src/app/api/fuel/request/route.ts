import { FuelRequest } from '@/domain/FuelRequest';
import { FuelRepository } from '@/domain/FuelRepository';

export async function POST(request: Request) {
	const data: FuelRequest = await request.json();
	const fuelRepository = new FuelRepository();
	const result = await fuelRepository.requestFuel(data);

	return new Response(
		JSON.stringify({
			result,
		}),
		{
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);
}
