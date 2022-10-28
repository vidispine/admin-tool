const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  axios: (args) => ipcRenderer.invoke('axios', args),
});
