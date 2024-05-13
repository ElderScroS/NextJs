import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Event } from "./types/Event";
import { events } from "../../data/events";

export default function Events() {
    const router = useRouter()
    const [eventsData, setEventsData] = useState<Event[]>([])
    const [searchInput, setSearchInput] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            if (searchInput) {
                let filteredEvents = events.filter(event => event.title.toLowerCase().includes(searchInput.toLowerCase()))
                setEventsData(filteredEvents)
            } else {
                setEventsData(events)
            }
        }
        fetchData()
    }, [searchInput])

    const handleNavigateToAddEvent = () => {
        router.push("/events/add")
    }

    const handleChangeSearchInput = (search: string) => {
        setSearchInput(search)
    }

    return (
        <div>
            <input placeholder="Search" value={searchInput} onChange={(e) => handleChangeSearchInput(e.target.value)}/>
            <div>
                <button onClick={handleNavigateToAddEvent}>Add event</button>
            </div>
            {eventsData.map((event) => (
                <div key={event.id}>
                    <Link href={`/events/${event.id}`}>{event.id}. {event.title}</Link>
                </div>
            ))}
        </div>
    )
}
