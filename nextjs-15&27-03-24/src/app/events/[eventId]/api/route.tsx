import { NextRequest, NextResponse } from "next/server"
import { events } from "../../../../../data/events"
import type { Event } from "@/app/types/Event"

export async function GET(request: NextRequest, { params }: any) {
    const eventId = Number(params.eventId)
    const event = events.find((event) => event.id === eventId)
    return NextResponse.json(event)
}

export async function PUT(request: NextRequest, { params }: any) {
    try {
        const event: Event = await request.json()
        const eventId = Number(params.eventId)
        const eventIndex = events.findIndex((event) => event.id === eventId)
        if (eventIndex !== -1) {
            events[eventIndex] = event
            return NextResponse.json(event)
        } else {
            return NextResponse.error()
        }
    } catch (error) {
        return NextResponse.error()
    }
}

export async function DELETE(request: NextRequest, { params }: any) {
    try {
        const eventId = Number(params.eventId)
        const eventIndex = events.findIndex((event) => event.id === eventId)
        if (eventIndex !== -1) {
            events.splice(eventIndex, 1)
            return NextResponse.json(events)
        } else {
            return NextResponse.error()
        }
    } catch (error) {
        return NextResponse.error()
    }
}
