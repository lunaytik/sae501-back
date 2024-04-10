import {ArgumentsHost, Catch, HttpStatus} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {BaseExceptionFilter} from "@nestjs/core";
import {Response} from "express";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>()
    const message = exception.message.replace(/\n/g, '');
    const model = exception.meta.modelName;

    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        response.status(status).json({
          statusCode: status,
          message: '[' + model + '] ' + message,
        });

        break;
      }
      default:
        super.catch(exception, host);
        break;
    }

  }
}
