import { MultiChoice } from "./MultiChoice";
import { Question } from "./Question";
import { SpecificNumber } from "./SpecificNumber";
import { SpecificWord } from "./SpecificWord";

export class QuestionFactory {

    public createQuestion(form: String): Question {
        switch (form) {
            case "1":
                return new MultiChoice();
                break;
            case "2":
                return new SpecificNumber();
                break;
            case "3":
                return new SpecificWord();
                break;
            default:
                return new MultiChoice();
                break;
        }
        return new MultiChoice;
    }

    public askQuestion(form: String): Question {
        switch (form) {
            case "1":
                return new MultiChoice();
                break;
            case "2":
                return new SpecificNumber();
                break;
            case "3":
                return new SpecificWord();
                break;
            default:
                return new MultiChoice();
                break;
        }
        return new MultiChoice;
    }
}