import { FuelRequest } from './FuelRequest';
import { deleteAllRequests, findVehicle, addFuelRequest } from './FirebaseApp';

export class FuelRepository {
	async insert(fuelRequest: FuelRequest): Promise<boolean> {
		if (await this.checkExists(fuelRequest.licensePlate)) {
			addFuelRequest(fuelRequest);
			return true;
		} else {
			return false;
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
