import { StatusCodes } from 'http-status-codes';
import ErrorMessage from './message';
import GenericError from './genericApi.errors';

export default class InternalServerError extends GenericError {
    constructor(errorExplanation: string) {
        super(StatusCodes.INTERNAL_SERVER_ERROR,'INTERNAL_SERVER_ERROR', ErrorMessage.IntervalServerErrorMessage,errorExplanation);
    }
}