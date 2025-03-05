import { IEnvironmentModel } from '@core/interfaces/environment.model';

export const environment: IEnvironmentModel = {
  production: false,
  // apiUrl: 'http://10.180.7.11:7055/',
  apiUrl: 'http://10.180.7.11:7056/',
  appVersion: `1.0.0`,
  settings: {
    auth: {
      clientId: 'client-id',
      secretId: 'secret-id',
      accessToken: 'clientToken',
      userInformation: 'client-information',
      accessTokenKey: 'DoPS3ZrQjM',
      refreshTokenKey: 'nmlP8PW2nb',
    },
  },
};
