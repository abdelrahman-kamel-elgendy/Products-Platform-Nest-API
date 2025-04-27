// src/common/filters/http-exception.filter.ts
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaClientKnownRequestError } from 'node_modules/.prisma/client/runtime/library';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let error = 'Internal Server Error';


        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const response = exception.getResponse();
            message = typeof response === 'string' ? response : response['message'];
            error = exception.name;
        } 
        
        if (exception instanceof PrismaClientKnownRequestError && exception.code === 'P2002') {
            status = HttpStatus.CONFLICT;
            message = 'Record already exists';
            error = exception.name;
        } 
        
        else if (exception instanceof Error) {
            message = exception.message;
            error = exception.name;
        }

        response.status(status).json({
            statusCode: status,
            message,
        });

        console.error('Error:', exception);
        console.error('Error Message:', message);
        console.error('Error Name:', error);
    }
}