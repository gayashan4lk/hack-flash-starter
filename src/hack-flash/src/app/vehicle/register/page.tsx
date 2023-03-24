import { VehicleType } from "@/domain/VehicleType";
import { Form } from "./Form";
import styles from "./page.module.css";

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

export default async function Home() {
  const types = await fetchTypes();

  return (
    <main className={styles.main}>
      <div className={styles.clHeader}>Bistec Fuel Pass</div>
      <Form types={types} />
    </main>
  );
}
