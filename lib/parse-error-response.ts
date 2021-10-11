import { GraphQLResult } from '@aws-amplify/api';

export const parseErrorResponse = (error: any): string => {
  const result = error as GraphQLResult;
  // const res = { errors: [{ message: 'error1' }, { message: 'error2' }] };
  return result.errors
    ? result.errors.map((error) => error.message).join('\n')
    : 'The error object could not be parsed.';
};
