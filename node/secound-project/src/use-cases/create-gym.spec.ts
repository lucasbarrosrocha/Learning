import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGynsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gynsRepository: InMemoryGynsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {

    beforeEach(() => {
        gynsRepository = new InMemoryGynsRepository()
        sut = new CreateGymUseCase(gynsRepository)
    })

    it('should be able to create gym', async () => {
        const { gym } = await sut.execute({
            title: "Gym teste",
            description: null,
            phone: null,
            latitude: 0,
            longitude: 0
        })

        expect(gym.id).toEqual(expect.any(String))
    })

})