import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import GenericError from './genericApi.errors';
import ErrorMessage from './message';

export default class NotFoundError extends GenericError {
    constructor(resourceName: string, property: string, propertyValue: any) {
        const errorExplanation: string = `The resource: ${resourceName} with property ${property} : ${propertyValue} not found`;
        super(StatusCodes.NOT_FOUND,'NOT_FOUND_ERROR', ErrorMessage.NotFoundErrorMessage,errorExplanation);
    }
}