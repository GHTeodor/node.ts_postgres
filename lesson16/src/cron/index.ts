import { getNewUsers } from './getNewUsers';

export const cronRun = () => {
    getNewUsers();
};
