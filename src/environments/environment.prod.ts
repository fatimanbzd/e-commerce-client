import {IEnvironmentModel} from "../app/shared/interfaces/environment.model";

export const environment: IEnvironmentModel = {
  production: true,
  serviceWorker: true,
  apiUrl: 'http://10.180.7.11:7055/',
  appVersion: `1.0.0`,
  settings: {
    auth: {
      clientId: 'client-id',
      secretId: 'secret-id',
      accessToken: 'clientToken',
      accessTokenKey: 'DoPS3ZrQjM',
      refreshTokenKey: 'nmlP8PW2nb',
      userInformation: 'client-information',
    },
  },
};
