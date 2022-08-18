import { Timer } from "./timer.model"

export interface Category {
    id: number
    name: string
    timers: Timer[]
}