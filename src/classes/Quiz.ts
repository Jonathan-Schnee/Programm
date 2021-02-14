import { QuizDAO } from "../types/QuizDAO.type";

export class Quiz {
    
    private _title: string = "";
    private _author: string = "";
    private _public: boolean = false;
    private _questions: any[] = [];

    constructor(quizDAO: QuizDAO) {
        this._title = quizDAO._title
        this._author = quizDAO._author;
        this._public = quizDAO._public;
        if(quizDAO._questions == undefined){
            this._questions = []
        }
        else{
            this._questions = quizDAO._questions;
        }
    }

    public setTitle(title: string) {
        this._title = title;
    }

    public setAuthor(author: string) {
        this._author = author;
    }

    public setPublic(publicy: boolean) {
        this._public = publicy;
    }

    public addData(question: string) {
        this._questions.push(question);
    }

    public getTitle(): string {
        return this._title;
    }

    public getAuthor(): string {
        return this._author;
    }

    public getPublic(): boolean {
        return this._public;
    }
    
    public getQuestion(): any {
        return this._questions;
    }
}