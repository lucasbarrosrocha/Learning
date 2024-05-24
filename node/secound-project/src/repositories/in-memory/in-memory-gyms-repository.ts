import {  Gym } from "@prisma/client";
import { GymsRepository } from "../gyms-repository";

export class InMemoryGynsRepository implements GymsRepository {
    public items: Gym[] = [];

    async findById(id: string): Promise<Gym | null> {
        return this.items.find((gym) => gym.id === id) || null;
    }

}