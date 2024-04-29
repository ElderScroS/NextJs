import { useState, useEffect } from "react";
import Link from "next/link";
import { Event } from "@/types/Event";
import { useRouter } from "next/router";

interface Props {
  events: Event[];
}

export default function EventsPage({ events }: Props) {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const router = useRouter();

  const filterEvents = (type: string) => {
    const filtered = events.filter((event) => event.type === type);
    setFilteredEvents(filtered);
    router.push(`/events?type=${type}`, undefined, { shallow: true });
  };

  const showAllEvents = () => {
    setFilteredEvents(events);
    router.push("/events", undefined, { shallow: true });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/events");
        const data = await response.json();
        setFilteredEvents(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => filterEvents("holiday")}>
          Holiday Events
        </button>
        <button onClick={() => filterEvents("charity")}>
          Charity Events
        </button>
        <button
          onClick={() => filterEvents("networking")}
        >
          Networking Events
        </button>
        <button onClick={showAllEvents}>
          All Events
        </button>
      </div>

      {filteredEvents.map((event) => (
        <ul style={{ fontSize: 30, display: "flex" }} key={event.id}>
          <Link href={`/events/${event.id}`}>
            <br />
            <li>
              {event.id}. {event.title}
            </li>
          </Link>
        </ul>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/events");
  const events = await response.json();

  return {
    props: {
      events,
    },
  };
}