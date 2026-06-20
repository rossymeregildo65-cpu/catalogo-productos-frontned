export class PageDto {

    public size!: number;
    public number!: number;
    public totalElements!: number;
    public totalPages!: number;

    public isFirst(): boolean {
        return this.number == 0;
    }

    public isLast(): boolean {
        return this.number == (this.totalPages - 1);
    }

}