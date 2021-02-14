import { RegUserDAO } from "../types/RegUserDAO.type";
import { AbstractUser } from "./abstracts/AbstractUser";
export class RegUser extends AbstractUser {
    
    constructor(regUser: RegUserDAO) {
        super();
        this.setName(regUser._name);
        this.setPassword(regUser._password);
        this.setOverallQuestion(regUser._overallQuestion);
        this.setOverallQuiz(regUser._overallQuiz);
        this.setWin(regUser._win);
    }
}