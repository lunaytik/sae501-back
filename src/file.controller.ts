import {Controller, Get, Param, Res} from '@nestjs/common';
import {Response} from "express";
import {dirname, join} from "path";

@Controller()
export class FileController {
    @Get('/public/uploads/:filename')
    async getFile(@Param('filename') filename: string, @Res() res: Response) {
        const fileLocation = join(dirname(require('path').resolve('./back')), '/public/uploads', filename);
        res.sendFile(fileLocation);
    }
}
