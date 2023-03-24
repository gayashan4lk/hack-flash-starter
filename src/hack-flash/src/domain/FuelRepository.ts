import { FuelRequest } from './FuelRequest';
import { FuelResponse } from './FuelResponse';
import { deleteAllRequests, findVehicle, addFuelRequest } from './FirebaseApp';

export class FuelRepository {
	async requestFuel(fuelRequest: FuelRequest): Promise<FuelResponse> {
		if (await this.checkExists(fuelRequest.licensePlate)) {
			addFuelRequest(fuelRequest);
			let fuelResponse: FuelResponse = {
				used: 0,
				remaining: 0,
			};
			return fuelResponse;
		} else {
			throw new Error('Vehicle does not exist');
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
}
