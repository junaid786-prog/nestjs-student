import { Body, Controller, Get, HttpStatus, Param, Post, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('student')
export class StudentController {
    // declare a map
    students: Map<number, string>;
    constructor() {
        this.students = new Map<number, string>();
    }

    @Get()
    find(@Req() req: Request, @Query() query: any): string[] {
        return [...this.students.values()];
    }

    @Post()
    create(@Body() params: {
        id: number;
        name: string;
    }
    ): string {
        console.log(params);

        this.students.set(params.id, params.name);
        return "Student created";
    }

    @Get('test')
    test(@Res() res: Response) {
        res.status(HttpStatus.OK).json({
            message: "Hello World"
        });
    }

    @Get(':id')
    findById(@Param() id: number): string {
        return this.students.get(id);
    }
}
