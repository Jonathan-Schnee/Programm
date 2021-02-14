import { AbstractUser } from "./abstracts/AbstractUser";

export class User extends AbstractUser {
    
    constructor() {
        super();
        this.setName("User");
        this.setPassword("");;
        this.setWin(0);
        this.setOverallQuestion(0);
        this.setOverallQuiz(0);
    }
}