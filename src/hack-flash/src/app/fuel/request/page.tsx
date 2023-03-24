'use client';

import { useState, useEffect } from 'react';
import { VehicleType } from '@/domain/VehicleType';
import styles from './page.module.css';
import { FuelRequestForm } from './FuelRequestForm';

const fetchTypes = async (): Promise<VehicleType[]> => {
	try {
		const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
		const respone = await fetch(`${baseUrl}/api/vehicle/types`);
		if (respone.ok) {
			return respone.json();
		} else {
			return [];
		}
	} catch (error) {
		return [];
	}
};

export default function Home() {
	const [error, setError] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [data, setData] = useState<any>({});

	useEffect(() => {}, []);

	return (
		<main className={styles.main}>
			<FuelRequestForm />
		</main>
	);
}
