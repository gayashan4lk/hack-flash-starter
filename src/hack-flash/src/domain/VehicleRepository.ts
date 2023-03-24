import { deleteAllVehicles, findVehicle, registerVehicle } from './FirebaseApp';
import { Vehicle } from './Vehicle';

export class VehicleRepository {
	async insert(vehicle: Vehicle): Promise<boolean> {
		if (await this.checkExists(vehicle.licensePlate)) {
			return false;
		} else {
			registerVehicle(vehicle);
			return true;
		}
	}
	async checkExists(licensePlate: string) {
		if (await findVehicle(licensePlate)) {
			return true;
		}
		return false;
	}
	async getVehicleType(licensePlate: string) {
		return (await findVehicle(licensePlate))?.vehicleType;
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

	async delete(): Promise<boolean> {
		await deleteAllVehicles();
		return true;
	}
}
