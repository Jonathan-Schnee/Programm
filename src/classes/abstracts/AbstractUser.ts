export class AbstractUser {

    private _name: string;
    private _password: string;
    private _win: number;
    private _overallQuestion: number;
    private _overallQuiz: number;

    constructor() {
        this._name = "";
        this._password = "";
        this._win = 0;
        this._overallQuestion = 0;
        this._overallQuiz = 0;
    }

    public rightAnswer(): void {
        this._win = this._win + 1;
        this._overallQuestion = this._overallQuestion + 1;
    }

    public wrongAnswer(): void {
        this._overallQuestion = this._overallQuestion + 1;
    }

    public solvedQuiz(): void {
        this._overallQuiz = this._overallQuiz + 1;
    }

    //Set Methods
    public setName(name: string) {
        this._name = name;
    }

    public setPassword(password: string) {
        this._password = password;
    }

    public setWin(win: number) {
        this._win = win;
    }

    public setOverallQuestion(overallQuestion: number) {
        this._overallQuestion = overallQuestion;
    }

    public setOverallQuiz(overallQuiz: number) {
        this._overallQuiz = overallQuiz;
    }

    //Get Methods
    public getName(): string {
        return this._name;
    }

    public getPassword(): string {
        return this._password;
    }

    public getWin(): number {
        return this._win;
    }

    public getOverallQuestion(): number {
        return this._overallQuestion;
    }

    public getOverallQuiz(): number {
        return this._overallQuiz;
    }

    public getProcentual(): string {
        return Number((100 / this._overallQuestion) * this._win).toFixed(2);
    }

    public addWin() {
        this._win = this._win + 1;
    }

    public addOverallQuestion() {
        this._overallQuestion = this._overallQuestion + 1;
    }

    public addOverallQuiz() {
        this._overallQuiz = this._overallQuiz + 1;
    }
}