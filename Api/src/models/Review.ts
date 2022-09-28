import { User } from "./User";


export interface Review {
    id: string;
    header: string;
    body: string;
    author: User;
    writtenAt: string;
    likes: number;


}