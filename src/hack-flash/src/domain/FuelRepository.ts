import { FuelRequest } from './FuelRequest';
import { FuelResponse } from './FuelResponse';
import { deleteAllRequests, findVehicle, addFuelRequest } from './FirebaseApp';
import { Vehicle } from './Vehicle';

export class FuelRepository {
	async requestFuel(fuelRequest: FuelRequest): Promise<FuelResponse> {
		if (await this.checkExists(fuelRequest.licensePlate)) {
			addFuelRequest(fuelRequest);
			let vehicle: Vehicle = await findVehicle(fuelRequest.licensePlate);

			let totalQuota = getTotalFuelQuota(vehicle.vehicleType);
			if (fuelRequest.amount > totalQuota) {
				return Promise.reject('Fuel request is greater than the quota');
			} else {
				let remaining = totalQuota - fuelRequest.amount;
				let fuelResponse: FuelResponse = {
					used: fuelRequest.amount,
					remaining: remaining,
				};
				return fuelResponse;
			}
		} else {
			return Promise.reject('Vehicle does not exist');
		}
	}

	async delete(): Promise<boolean> {
		deleteAllRequests();
		return true;
	}

	async checkExists(licensePlate: string) {
		if (await findVehicle(licensePlate)) {
			return true;
		}
		return false;
	}

	vehicleTypes() {
		return [
			{
				id: '1',
				name: 'Car',
				quota: 20,
			},
			{
				id: 2,
				name: 'Bus',
				quota: 40,
			},
			{
				id: 3,
				name: 'Lorry',
				quota: 40,
			},
			{
				id: 4,
				name: 'Bike',
				quota: 4,
			},
			{
				id: 5,
				name: 'Three Wheel',
				quota: 5,
			},
		];
	}
}
function getTotalFuelQuota(vehicleType: string): number {
	switch (vehicleType) {
		case 'Car':
			return 20;
		case 'Bus':
			return 40;
		case 'Lorry':
			return 40;
		case 'Bike':
			return 4;
		case 'Three Wheel':
			return 5;
		default:
			return 0;
	}
}
