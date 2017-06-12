export interface IContact {
    id: string;
    source: string;

    name: string;
    title: string;
    email: string;
}

export class GoogleContact implements IContact {
    source: string;
    id: string;
    title: string;
    name: string;
    email: string;


}