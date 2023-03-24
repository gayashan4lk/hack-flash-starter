'use client';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Vehicle } from '@/domain/Vehicle';
import { VehicleType } from '@/domain/VehicleType';
import { FuelRequest } from '@/domain/FuelRequest';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { FuelResponse } from '@/domain/FuelResponse';

const submitRequest = async (
	fuelRequest: FuelRequest
): Promise<{ fuelResponse: FuelResponse }> => {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
	const respone = await fetch(`${baseUrl}/api/fuel/request`, {
		method: 'POST',
		body: JSON.stringify(fuelRequest),
	});
	return respone.json();
};

export function FuelRequestForm() {
	const [startDate, setStartDate] = useState(new Date());

	const router = useRouter();

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		const target = event.target as typeof event.target & {
			licensePlate: { value: string };
			amount: { value: number };
			date: { value: Date };
		};
		const fuelRequest: FuelRequest = {
			licensePlate: target.licensePlate.value,
			amount: target.amount.value,
			date: startDate,
		};
		try {
			const resp = await submitRequest(fuelRequest);
			console.log(resp);
		} catch (error) {
			console.log(error);
		}
		// if (resp.registered) {
		// 	router.push('/vehicle/register/success');
		// } else {
		// 	router.push('/vehicle/register/error');
		// }
	};

	const handleDateChange = (date: Date) => {
		console.log(date);
		(date: any) => setStartDate(date);
	};

	return (
		<div className={styles.clWrapper}>
			<form onSubmit={handleSubmit} action='/api/fuel/request'>
				<div>
					<div className={styles.clLabel}>Licence Plate :</div>
					<div>
						<input
							id='licensePlate'
							name='licensePlate'
							className={styles.clTextBox}
						></input>
					</div>
				</div>
				<div>
					<div className={styles.clLabel}>Amount :</div>
					<div>
						<input
							id='amount'
							name='amount'
							className={styles.clTextBox}
						></input>
					</div>
				</div>
				<div>
					<div className={styles.clLabel}>Date :</div>
					<DatePicker selected={startDate} onChange={handleDateChange} />
				</div>
				<div>
					<button id='submit' type='submit' className={styles.clButton}>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}
