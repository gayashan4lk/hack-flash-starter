"use client";

import { Vehicle } from "@/domain/Vehicle";
import { VehicleType } from "@/domain/VehicleType";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import styles from "./page.module.css";

const submitRequest = async (
  vehicle: Vehicle
): Promise<{ registered: boolean }> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const respone = await fetch(`${baseUrl}/api/vehicle/register`, {
    method: "POST",
    body: JSON.stringify(vehicle),
  });
  return respone.json();
};

export function Form({ types }: { types: VehicleType[] }) {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      licensePlate: { value: string };
      vehicleType: { value: string };
    };
    const vehicle: Vehicle = {
      licensePlate: target.licensePlate.value,
      vehicleType: target.vehicleType.value,
    };
    const resp = await submitRequest(vehicle);
    if (resp.registered) {
      router.push("/vehicle/register/success");
    } else {
      router.push("/vehicle/register/error");
    }
  };
  return (
    <div className={styles.clWrapper}>
      <form onSubmit={handleSubmit} action="/api/vehicle/register">
        <div>
          <div className={styles.clLabel}>Vehicle Type :</div>
          <div>
            <select
              name="vehicleType"
              id="vehicleType"
              className={styles.clSelect}
            >
              {types.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <div className={styles.clLabel}>Licence Plate :</div>
          <div>
            <input
              id="licensePlate"
              name="licensePlate"
              className={styles.clTextBox}
            ></input>
          </div>
        </div>
        <div>
          <button id="submit" type="submit" className={styles.clButton}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
