export type QuestionDifficulty = "easy" | "medium" | "hard";

export type OptionData = {
    text: string;
    isCorrect: boolean;
}

export type QuizzData = {

    id:number;
    name:string;
    description: string;
    course: string;
    category?: string;
    published: boolean;
    creationDate: string;
    questions: QuestionInfoData[];
    categoryID?:{ id: number; name: string } ;


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
    difficulty: QuestionDifficulty;
}
export type QuestionInfo = Omit<QuestionInfoData,"id">;
