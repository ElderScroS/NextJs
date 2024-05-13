import { NextRequest, NextResponse } from "next/server";
import { Event } from "@/app/types/Event";
import { events } from "../../../../data/events";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    
    const filteredEvents = query ? events.filter((event) => event.title.toLowerCase().includes(query.toLowerCase())) : events;
    
    return NextResponse.json(filteredEvents);
}

export async function POST(request: NextRequest) {
    const event: Event = await request.json();

    const newEvent: Event = {
        id: events.length + 1,
        title: event.title,
        description: event.description,
        type: event.type
    };

    events.push(newEvent);

    console.log(events);

    return NextResponse.json(events);
}
