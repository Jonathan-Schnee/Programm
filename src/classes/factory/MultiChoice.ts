import ConsoleHandling from "../ConsoleHandling";
import { Question } from "./Question";

export class MultiChoice implements Question {

    private _red: string = "\x1b[31m";
    private _green: string = "\x1b[32m";
    private _reset: string = "\x1b[0m";

    public async createQuestion(): Promise<any> {
        let answers: String[] = [];
        let regex: RegExp = /(^[\w\W\s]{3,}$)+/;
        let question: string = await ConsoleHandling.question("\nPlease write a Question: ");
        while (!regex.test(question)) {
            ConsoleHandling.printInput(`\n${this._red}The question must be 3 characters long${this._reset}\n`);
            question = await ConsoleHandling.question("Please write a Question: ");
        }
        let numberAnswer: number = 0;
        while (numberAnswer < 2 || numberAnswer > 4) {
            let numberAnswerString: string = await ConsoleHandling.question("\n" + "Please enter the number of answers (between 2 and 4): ");
            numberAnswer = Number.parseInt(numberAnswerString);
            if (isNaN(numberAnswer)) {
                numberAnswer = 0;
            }
        }
        let rightAnswer: string = await ConsoleHandling.question("Please write the right answer: ");
        while(rightAnswer == ""){
            ConsoleHandling.printInput(`\n${this._red}The answer must not be empty${this._reset}\n`);
            rightAnswer = await ConsoleHandling.question("Please write the right answer: ");
        }
        answers.push(rightAnswer);
        for (let count: number = 1; count < numberAnswer; count++) {
            let wrongAnswer: string = await ConsoleHandling.question("Please write a wrong answer: ");
            while(wrongAnswer == ""){
                ConsoleHandling.printInput(`\n${this._red}The answer must not be empty${this._reset}\n`);
                wrongAnswer = await ConsoleHandling.question("Please write the wrong answer: ");
            }
            answers.push(wrongAnswer);
        }
        let quizQuestion = { type: "1", Question: question, Answers: answers };
        return quizQuestion;
    }

    public async askQuestion(question: any): Promise<boolean> {
        console.log("\n" + question.Question + "?");
        let rightAnswer = question.Answers[0];
        let shuffleAnswers = this.randomArrayShuffle(question.Answers);
        for (let index in shuffleAnswers) {
            ;
            let _index: Number = Number.parseInt(index) + 1;
            ConsoleHandling.printInput(`${_index}. ${shuffleAnswers[Number.parseInt(index)]}\n`);
        }
        let yourAnswer: string = await ConsoleHandling.question("Please write the right answer (number): ");
        if (shuffleAnswers[Number.parseInt(yourAnswer) - 1].match(rightAnswer)) {
            ConsoleHandling.printInput(`\n${this._green}You are right, the Answer is ${rightAnswer}${this._reset}\n`);
            return true;
        }
        else {
            ConsoleHandling.printInput(`\n${this._red}You are false, the Answer is ${rightAnswer}${this._reset}\n`);
            return false;
        }
    }

    public randomArrayShuffle(array: any[]) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
}