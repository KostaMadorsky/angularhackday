// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  chatHub: {
    hub: 'http://localhost:2575/chat',
    msgApi: 'http://localhost:2575/api/messages',
    msgEventName: 'onMessageReceived',
    joinMethodName: 'JoinRoom',
    leaveMethodName: 'Leave'
  }
};
