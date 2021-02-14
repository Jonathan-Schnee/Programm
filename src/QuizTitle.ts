import ConsoleHandling from "./classes/ConsoleHandling";
import { FileHandler } from "./classes/FileHandler";
import { RegUser } from "./classes/RegUser";
import { User } from "./classes/User";
import { QuizApp } from "./QuizApp";
import { RegUserDAO } from "./types/RegUserDAO.type";

export class QuizTitle {

    private _fileHandler = new FileHandler();
    private _regUser: RegUser | undefined;
    private _quizApp: QuizApp | undefined;
    private _red: string = "\x1b[31m";
    private _reset: string = "\x1b[0m";

    public async showFunctionalities() {
        let answer: String = await ConsoleHandling.showPossibilities(
            [
                "1. Play a Quiz",
                "2. Login",
                "3. Registration",
            ],
            "What do you want to do?: "
        );
        this.handleAnswer(answer);
    }

    public async handleAnswer(answer: String) {
        switch (answer) {
            case "1":
                this._regUser = new User();
                this._quizApp = new QuizApp(this._regUser);
                this._quizApp.showFunctionalities();
                break;
            case "2":
                this.login();
                break;
            case "3":
                this.register();
                break;
            default:
                this.showFunctionalities();
                break;
        }
    }

    public async register() {
        ConsoleHandling.printInput("\nREGISTER\n");
        let username: string = "";
        let regex: RegExp = /^[\w]{3,}$/;
        let bool: boolean = true
        while (bool) {
            username = await ConsoleHandling.question("Please choose a username: ")
            if (this._fileHandler.exists(`../data/User/${username}.json`)) {
                ConsoleHandling.printInput(`\n${this._red}This username is already in use${this._reset}\n`);
            }
            else if (!regex.test(username)) {
                ConsoleHandling.printInput(`\n${this._red}The username must not contain special characters and must at least be 3 characters long${this._reset}\n`);
            }
            else {
                bool = false;
            }
        }
        let password: string = await ConsoleHandling.question("Please choose a password: ");
        while (password == "") {
            ConsoleHandling.printInput(`\n${this._red}The password can not be empty${this._reset}\n`);
            password = await ConsoleHandling.question("Please choose a password: ");
        }

        let userJson: RegUserDAO = this._fileHandler.readObjectFile("../data/User/userExample.json");
        let user: RegUser = new RegUser(userJson);
        user.setName(username);
        user.setPassword(password)
        this._fileHandler.writeFile((`../data/User/${username}.json`), user);
        await this.login();
    }

    public async login() {
        ConsoleHandling.printInput("\nLOGIN\n");
        let username: string = await ConsoleHandling.question("Please enter your username: ");
        if (!this._fileHandler.exists(`../data/User/${username}.json`)) {
            ConsoleHandling.printInput(`\n${this._red}This username doesn't exist${this._reset}\n`);
            await this.login();
        }
        let password: string = await ConsoleHandling.question("Please enter your password: ");
        let userJson: RegUserDAO = this._fileHandler.readObjectFile(`../data/User/${username}.json`);
        this._regUser = new RegUser(userJson);
        while (!(this._regUser.getPassword() == (password))) {
            ConsoleHandling.printInput(`\n${this._red}This is the wrong password${this._reset}\n`);
            password = await ConsoleHandling.question("Please enter your password: ");
        }
        ConsoleHandling.printInput("\nLogin successful\n");
        this._quizApp = new QuizApp(this._regUser);
        this._quizApp.showFunctionalities();
    }
}
