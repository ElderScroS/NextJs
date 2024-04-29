import { useRouter } from "next/router"
import { Car } from "@/types/Car"

interface Props
{
    car: Car
}

export default function CarDetails({car}: Props)
{
    let router = useRouter()
    if (router.isFallback)
    {
        return <>Loading...</>
    }

    return (
        <div>
            <h1>{car.make} {car.model}</h1>
            <hr/>
            <p>Year: {car.year}</p>
            <p>Price: {car.price}</p>
            <p>Color:{car.color}</p>
        </div>
    )
}

export function getStaticPaths()
{
    return {
        paths: [
            {
                params: {
                    carId: '1'
                }
            },
        ],
        fallback: true
    }
}


export async function getStaticProps(context: any)
{
    const {
        params: {carId}
    } = context
    const response = await fetch(`http://localhost:3000/cars/${carId}`)
   
    let car = await response.json()

    return {
        props:
        {
            car: car
        }
    }
}