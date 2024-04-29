import NavBar from "@/components/NavBar/NavBar";
import Link from "next/link";
import React from "react";
import { Car } from "@/types/Car";

interface Props {
  cars: Car[]
}

export default function Cars({ cars }: Props) {
  console.log(cars);

  return (
    <div>
      <NavBar />
      <h1>Cars</h1>
      {cars.map((car) => (
        <div key={car.id}>
          <Link href={`/cars/${car.id}`}>
            {car.model} - {car.price}
          </Link>
        </div>
      ))}
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch("http://localhost:3000/cars");
  const cars = await response.json();

  return {
    props: {
      cars: cars,
    },
    revalidate: 10,
  };
}