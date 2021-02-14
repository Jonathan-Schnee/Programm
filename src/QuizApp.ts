import { lowerCase } from "lodash";
import { type } from "os";
import ConsoleHandling from "./classes/ConsoleHandling";
import { QuestionFactory } from "./classes/factory/QuestionFactory";
import { FileHandler } from "./classes/FileHandler";
import { Quiz } from "./classes/Quiz";
import { RegUser } from "./classes/RegUser";
import { QuizDAO } from "./types/QuizDAO.type";

export class QuizApp {

    private regUser: RegUser;
    private fileHandler: FileHandler = new FileHandler();
    private _red: string = "\x1b[31m";
    private _reset: string = "\x1b[0m";

    constructor(regUser: RegUser) {
        this.regUser = regUser;
    }

    public async showFunctionalities() {
        let answer: String = await ConsoleHandling.showPossibilities(
            [
                "1. Play a quiz",
                "2. Create a quiz",
                "3. Show statistic",
            ],
            "What do you want to do? (default 1): ");

        this.handleAnswer(answer);
    }

    public async handleAnswer(answer: String) {
        switch (answer) {
            case "1":
                this.askQuiz();
                break;
            case "2":
                if (this.regUser.getName() == ("User")) {
                    ConsoleHandling.printInput(`\n${this._red}Please register to create quiz${this._reset}`);
                    this.showFunctionalities();
                }
                else{
                    this.createQuiz();
                }
                break;
            case "3":
                this.showStatistic();
                break;
            default:

                break;
        }
    }

    public async createQuiz() {
        ConsoleHandling.printInput("\nCREATE A QUIZ\n")
        let title: string = await ConsoleHandling.question("Please choose a title: ")
        let regex: RegExp = /^[\w\s]{3,}$/;
        while (!regex.test(title)) {
            ConsoleHandling.printInput(`\n${this._red}The title must contain 3 letters${this._reset}\n`);
            title = await ConsoleHandling.question("Please choose a title: ")
        }

        let quFa: QuestionFactory = new QuestionFactory();
        let quizDAO: QuizDAO = this.fileHandler.readObjectFile("../data/Quizzes/QuizExample.json");
        let quiz: Quiz = new Quiz(quizDAO);
        quiz.setTitle(title);
        quiz.setAuthor(this.regUser.getName());
        let quit: boolean = false
        let count: number = 1;
        while (!quit) {
            let answer: String = await ConsoleHandling.showPossibilities(
                [
                    "1. Create Multiple Choice Question",
                    "2. Create a Unique Number Question",
                    "3. Create a Unique Word Question",
                ],
                "What kind of Question do you want to create? (default 1): "
            );

            let question = quFa.createQuestion(answer);
            let test: string = await question.createQuestion();
            quiz.addData(test);
            if (count >= 3) {
                let finish: string = await ConsoleHandling.question("Do you want to save and exit the Quiz [y|n] (default: n): ");
                if ("y" == lowerCase(finish)) {
                    quit = true;
                }
            }
            if (count >= 10) {
                ConsoleHandling.printInput("you have reached the maximum number of questions")
                quit = true;
            }
            count++
        }
        let publicy: string = await ConsoleHandling.question("Should the Quiz be public? [y|n] (default: y) ");
        switch (publicy.toLowerCase()) {
            case "y":
                quiz.setPublic(true);
                break;
            case "n":
                quiz.setPublic(false);
                break;
            default:
                quiz.setPublic(true);
                break;
        }
        let quizLibary = this.fileHandler.readArrayFile("../data/Quizzes/Quiz.json");
        quizLibary.push(quiz);
        this.fileHandler.writeFile(("../data/Quizzes/Quiz.json"), quizLibary)
        this.showFunctionalities();
    }

    public async askQuiz() {
        let answer: String = await ConsoleHandling.showPossibilities(
            [
                "1. Play public quiz",
                "2. Play own quiz",
            ],
            "What do you want to do? (default 1): ");

        this.showQuiz(answer);
    }

    public async showQuiz(answer: String) {
        let quizDAO: QuizDAO[] = this.fileHandler.readArrayFile("../data/Quizzes/Quiz.json");
        let quizLibary: Quiz[] = [];

        switch (answer) {
            case "1":
                for (let quiz of quizDAO) {
                    if (quiz._public) {
                        quizLibary.push(new Quiz(quiz));
                    }
                }
                break;
            case "2":
                if (this.regUser.getName() == ("User")) {
                    ConsoleHandling.printInput(`\n${this._red}Please register to play your own quiz${this._reset}`);
                    this.askQuiz();
                }
                for (let quiz of quizDAO) {
                    if (quiz._author === this.regUser.getName()) {
                        quizLibary.push(new Quiz(quiz));
                    }
                }
                break;
            default:
                for (let quiz of quizDAO) {
                    if (quiz._public) {
                        quizLibary.push(new Quiz(quiz));
                    }
                }
                break;
        }
        for (let index in quizLibary) {
            let quiz: Quiz = quizLibary[index];
            let num: Number = Number.parseInt(index) + 1;
            ConsoleHandling.printInput(`\n${num}. Title: ${quiz.getTitle()}   Author: ${quiz.getAuthor()}`);
        }
        let quizChoice: string = await ConsoleHandling.question("\nPlease choose a quiz (number): ")
        if(quizLibary[Number.parseInt(quizChoice) - 1] == undefined){
            ConsoleHandling.printInput(`\n${this._red}This Quiz doesnt exist${this._reset}`);
            quizChoice = await ConsoleHandling.question("\nPlease choose a quiz (number): ")
        }
        this.playQuiz(quizLibary[Number.parseInt(quizChoice) - 1]);
    }

    public async playQuiz(quiz: Quiz) {
        let quFa: QuestionFactory = new QuestionFactory();
        let questions = quiz.getQuestion();
        for (let question of questions) {
            let quest = quFa.askQuestion(question.type);
            if (await quest.askQuestion(question)) {
                this.regUser.addWin()
                this.regUser.addOverallQuestion();
            }
            else {
                this.regUser.addOverallQuestion();
            }
        }
        this.regUser.addOverallQuiz();
        if (!(this.regUser.getName() == "User")) {
            this.fileHandler.writeFile((`../data/User/${[this.regUser.getName()]}.json`), this.regUser)
        }
        this.showFunctionalities();
    }

    public async showStatistic() {
        ConsoleHandling.printInput(`\nSTATISTIC\n`);
        ConsoleHandling.printInput(`You have ${this.regUser.getOverallQuiz()} Quiz played`);
        ConsoleHandling.printInput(`You have ${this.regUser.getOverallQuestion()} Question answerd`);
        ConsoleHandling.printInput(`You have ${this.regUser.getWin()} Question  right answerd`);
        ConsoleHandling.printInput(`Your statistic is ${this.regUser.getProcentual()} %\n`);
        await ConsoleHandling.question("Press any key to continue");
        this.showFunctionalities();
    }
}