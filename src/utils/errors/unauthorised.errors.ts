import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import ErrorMessage from './message';
import GenericError from './genericApi.errors';

export default class UnauthorisedError extends GenericError{
    constructor() {
        super(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED, ErrorMessage.UnauthorisedErrorMessage);
    }
}