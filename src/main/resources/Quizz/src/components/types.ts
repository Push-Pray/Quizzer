export type QuizzData = {

    name:string;
    description: string;
    coursecode: string;
    
}

export type Quizz = Omit<QuizzData,"_links">