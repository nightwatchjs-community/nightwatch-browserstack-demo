module.exports.command = async function (selector, done = async function() {}) {
  // click the accept cookie button, if it's found
  const cookieButton = await this.findElement({
    selector: selector,
    suppressNotFoundErrors: true
  });

  if (cookieButton && typeof cookieButton.getId == 'function') {
    const cookieButtonId = cookieButton.getId();
    await this.elementIdClick(cookieButtonId);
  }

  await done();
};