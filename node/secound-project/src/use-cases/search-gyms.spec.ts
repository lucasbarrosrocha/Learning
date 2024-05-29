import { InMemoryGynsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach, } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGynsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {

    beforeEach(async () => {
        gymsRepository = new InMemoryGynsRepository()
        sut = new SearchGymsUseCase(gymsRepository)
    })



    it('should be able to search for gyms', async () => {
        await gymsRepository.create({
            title: "JS teste",
            description: null,
            phone: null,
            latitude: 0,
            longitude: 0
        })

        await gymsRepository.create({
            title: "TS teste",
            description: null,
            phone: null,
            latitude: 0,
            longitude: 0
        })

        const { gyms } = await sut.execute({
           query: 'JS',
            page: 1,
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({  title: "JS teste" }),
        ])
    })

    it('should be able to fetch paginated gym search', async () => {
        for (let i = 1; i <= 22; i++) {
            await gymsRepository.create({
                title: `JS teste ${i}`,
                description: null,
                phone: null,
                latitude: 0,
                longitude: 0
            })
        }

        const { gyms } = await sut.execute({
            query: 'JS',
             page: 2,
         })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'JS teste 21' }),
            expect.objectContaining({ title: 'JS teste 22' }),
        ])
    })

})