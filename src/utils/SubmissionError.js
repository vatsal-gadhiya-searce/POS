
export default class SubmissionError {
    errors = [];
    message = null;
    constructor(errors, message) {
        this.errors = errors;
        this.message = message;
    }
}