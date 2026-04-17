export type QuizzData = {

    id:number;
    name:string;
    description: string;
    course: string;
    published: boolean;
    creationDate: string;

    
};

export type Quizz = Omit<QuizzData,"id">;