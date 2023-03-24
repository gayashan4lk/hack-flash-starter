import { FuelRequest } from './FuelRequest';
import { deleteAllRequests } from './FirebaseApp';

export class FuelRepository {
	async insert(fuelRequest: FuelRequest): Promise<boolean> {
		return true;
	}

	async delete(): Promise<boolean> {
		deleteAllRequests();
		return true;
	}
}
