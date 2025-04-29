// src/base/base.service.ts
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '../error/bad-request';
import { BaseRepository } from './base.repository';

@Injectable()
export abstract class BaseService<T, CreateDTO, UpdateDTO> {
    constructor(private repository: BaseRepository<T, CreateDTO, UpdateDTO>) { }

    async create(data: CreateDTO): Promise<T> {
        return this.repository.create(data);
    }

    async findAll(): Promise<T[]> {
        return this.repository.findAll();
    }

    async findAllActive(): Promise<T[]> {
        return this.repository.findAllActive();
    }

    async findById(id: string): Promise<T> {
        const record = await this.repository.findById(id);
        if (!record)
            throw new NotFoundException(`Record with id: ${id} not found`);
        return record;
    }

    async update(id: string, data: UpdateDTO): Promise<T> {
        const record = await this.repository.findById(id);
        if (!record)
            throw new NotFoundException(`Record with id: ${id} not found`);

        return this.repository.update(id, data);
    }

    async delete(id: string): Promise<T> {
        const record = await this.repository.findById(id);
        if (!record)
            throw new NotFoundException(`Record with id: ${id} not found`);

        return this.repository.delete(id);
    }
}