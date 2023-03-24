import { FuelRequest } from './FuelRequest';
import { deleteAllRequests, findVehicle, addFuelRequest } from './FirebaseApp';

export class FuelRepository {
	async insert(fuelRequest: FuelRequest): Promise<boolean> {
		if (await this.checkExists(fuelRequest.licensePlate)) {
			return false;
		} else {
			addFuelRequest(fuelRequest);
			return true;
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
