import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from "@nestjs/common";
import { BaseService } from "./baseService";
import { HttpExceptionFilter } from "../error/http-exception";

@UseFilters(HttpExceptionFilter)
export class BaseController<T, CreateDTO, UpdateDTO> {
  constructor(private service: BaseService<T, CreateDTO, UpdateDTO>) { }

  @Post()
  async create(@Body() data: CreateDTO): Promise<T> {
    return this.service.create(data);
  }

  @Get()
  async findAll(): Promise<T[]> {
    return this.service.findAll();
  }

  @Get('active')
  async findAllActive(): Promise<T[]> {
    return this.service.findAllActive();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<T> {
    return this.service.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateDTO,
  ): Promise<T> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<T> {
    return this.service.delete(id);
  }
}