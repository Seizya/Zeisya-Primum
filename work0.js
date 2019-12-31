self.addEventListener('message', message => {
    self.postMessage(JSON.stringify(learning(JSON.parse(message))))
    tetet()
});