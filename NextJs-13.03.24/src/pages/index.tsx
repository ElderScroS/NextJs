import { Event } from "@/types/Event";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
    events: Event[]
}

export default function Events({ events }: Props) {
    const router = useRouter()
    const [eventsData, setEventsData] = useState<Event[]>(events)


    const fetchAll = async () => {
        const response = await fetch("http://localhost:3000/api/events")
        const events = await response.json()

        setEventsData(events)
    }

    const handleNavigateToAddEvent = () => 
    {
        router.push("/events/add")
    }


    return (
        <div style={{ padding: 10 }}>
            <div >
                 <button onClick={fetchAll}>Get All Events</button>
                 <button onClick={handleNavigateToAddEvent}>Add event</button>
            </div>
            {eventsData.map((event) =>
            (
                <div key={event.id}>
                    <Link href={`/events/${event.id}`}>{event.title}</Link>
                </div>
            ))}
        </div>
    )
}


export async function getServerSideProps() {
    const response = await fetch("http://localhost:3000/api/events")
    const events = await response.json()

    return {
        props:
        {
            events: events
        }
    }

}