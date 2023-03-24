import { FuelRequest } from '@/domain/FuelRequest';
import { FuelRepository } from '@/domain/FuelRepository';

export async function POST(request: Request) {
	const data: FuelRequest = await request.json();
	const fuelRepository = new FuelRepository();
	const requested = await fuelRepository.insert(data);

	return new Response(
		JSON.stringify({
			requested,
		}),
		{
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);
}
