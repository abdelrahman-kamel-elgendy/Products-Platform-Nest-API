// src/base/base.service.ts
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '../error/bad-request';

@Injectable()
export abstract class BaseService<T, CreateDTO, UpdateDTO> {
    constructor(private model: any) {}
    
    async create(data: CreateDTO): Promise<T> {
        return this.model.create({ data });
    }
    
    async findAll(): Promise<T[]> {
        return this.model.findMany();
    }

    async findAllActive(): Promise<T[]> {
        return this.model.findMany({ where: { isActive: true } });  
    }
    
    async findById(id: string): Promise<T> {
        const record = await this.model.findUnique({ where: { id } });
        if (!record)
            throw new NotFoundException(`Record with id: ${id} not found`);
        return record;
    }
    
    async update(id: string, data: UpdateDTO): Promise<T> {
        const record = await this.model.findUnique({ where: { id } });
        if (!record)
            throw new NotFoundException(`Record with id: ${id} not found`);
        
        return this.model.update({ where: { id }, data });
    }
    
    async delete(id: string): Promise<T> {
        const record = await this.model.findUnique({ where: { id } });
        if (!record)
            throw new NotFoundException(`Record with id: ${id} not found`);

        return this.model.delete({ where: { id } });
    }
}