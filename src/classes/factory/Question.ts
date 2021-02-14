export interface Question {
    createQuestion(): Promise<any>;
    askQuestion(question: any): Promise<boolean>;
}