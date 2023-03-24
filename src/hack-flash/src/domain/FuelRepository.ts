import { FuelRequest } from './FuelRequest';
import { deleteAllRequests } from './FirebaseApp';

export class FuelRepository {
	async delete(): Promise<boolean> {
		deleteAllRequests();
		return true;
	}
}
