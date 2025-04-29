import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class BaseRepository<T, CreateDTO, UpdateDTO> {
  constructor(protected readonly model: any) {}
        
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
            return await this.model.findUnique({ where: { id } });
        }
        
        async update(id: string, data: UpdateDTO): Promise<T> {
            return this.model.update({ where: { id }, data });
        }
        
        async delete(id: string): Promise<T> {    
            return this.model.delete({ where: { id } });
        }
}