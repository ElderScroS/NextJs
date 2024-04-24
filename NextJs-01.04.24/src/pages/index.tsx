import events from "../../lib/events";
import { useRouter } from "next/router";

export default function Events() {
    const router = useRouter()

    const navigateToDetails = (id: string) => {
        router.push(`events/${id}`)
    }
    return (
        <div>
            {events.map((event) =>
            (
                <div key={event.id}>
                    <button onClick={() => navigateToDetails(event.id)}>
                        <div>
                            <h1>{event.title}</h1>
                            <h1>{event.description}</h1>
                        </div>
                    </button>
                </div>
            ))}
        </div>
    )
}