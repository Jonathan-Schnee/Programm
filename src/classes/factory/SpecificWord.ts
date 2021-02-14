import { lowerCase } from "lodash";
import ConsoleHandling from "../ConsoleHandling";
import { Question } from "./Question";

export class SpecificWord implements Question {

    private _red: string = "\x1b[31m";
    private _green: string = "\x1b[32m";
    private _reset: string = "\x1b[0m";
    
    public async createQuestion(): Promise<any> {
        let regex: RegExp = /(^[\w\W\s]{3,}$)+/;
        let question: string = await ConsoleHandling.question("\nPlease write a Question: ");
        while (!regex.test(question)) {
            ConsoleHandling.printInput(`\n${this._red}The question must be 3 characters long${this._reset}\n`);
            question = await ConsoleHandling.question("Please write a Question: ");
        }
        
        let answer: string = "";
        answer = await ConsoleHandling.question("Please write the right answer: ");
        regex = /(^[\w\s]*$)+/;
        while (!regex.test(answer) || answer == "") {
            ConsoleHandling.printInput(`\n${this._red}The answer should not conatain special characters and should not be empty${this._reset}\n`);
            answer = await ConsoleHandling.question("Please write the right answer: ");
        }
        let quizQuestion = { type: "3", Question: question, Answers: answer };
        return quizQuestion;
    }
    
    public async askQuestion(question: any): Promise<boolean> {
        ConsoleHandling.printInput("\n" + question.Question + "?");
        let yourAnswer: string = await ConsoleHandling.question("Please write the right answer: ");
        if (lowerCase(question.Answers) == lowerCase(yourAnswer)) {
            ConsoleHandling.printInput(`\n${this._green}You are right, the Answer is ${question.Answers}${this._reset}\n`);
            return true;
        }
        else {
            ConsoleHandling.printInput(`\n${this._red}You are false, the Answer is ${question.Answers}${this._reset}\n`);
            return false;
        }
    }
}