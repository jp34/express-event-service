
export interface CreateEventPayload {
    title: string
    authorId: string
    memberIds: string[]
    locationId: string
    isPublic: boolean
    dateStart: Date
    dateEnd: Date
}

export interface EventSearchParams {
    authorId?: string
    memberIds?: string[]
    locationId?: string
    isPublic?: boolean
    dateFrom?: Date
    dateUntil?: Date
}

export interface CreateEventRequest extends Express.Request {
    body: {
        data: CreateEventPayload
    }
}