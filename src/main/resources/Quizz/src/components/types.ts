export type QuizzData = {

    id:number;
    name:string;
    description: string;
    course: string;
    published: boolean;
    creationDate: string;
    questions: string[];


};

export type Quizz = Omit<QuizzData,"id">;

export type QuestionData = {

    id:number;
    text: string,
    options: string[];
    correctIndex: number

}

export type Question = Omit<QuestionData,"id">;



export type QuestionInfoData = {

    id: number;
    text: string;
    difficulty: "easy" | "medium" | "hard";
}
export type QuestionInfo = Omit<QuestionInfoData,"id">;
