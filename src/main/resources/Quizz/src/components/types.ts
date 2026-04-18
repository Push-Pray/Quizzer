export type QuizzData = {

    id:number;
    name:string;
    description: string;
    course: string;
    published: boolean;
    creationDate: string;

};

export type Quizz = Omit<QuizzData,"id">;

export type QuestionData = {

    id:number;
    text: string,
    options: string[];
    correctIndex: number
}

export type Question = Omit<QuestionData,"id">;