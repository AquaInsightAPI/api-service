class AppError extends Error {
    statusCode;
    explanation
    constructor(statusCode:any,message='Cannot fetch data') {
        super(message);
        this.statusCode = statusCode;
        this.explanation = message;
    }
}

export default AppError;