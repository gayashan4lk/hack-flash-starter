import { FuelRequest } from '@/domain/FuelRequest';

export async function POST(request: Request) {
	const data: FuelRequest = await request.json();
	console.log(data);

	return new Response(
		JSON.stringify({
			licensePlage: data.licensePlate,
			amount: data.amount,
			date: data.date,
		}),
		{
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);
}
