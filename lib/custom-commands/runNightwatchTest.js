const {ChildProcess} = require('../utils');

module.exports = class RunCommand {
  async command(args, settings) {
    const child = new ChildProcess(args, settings);
    await child.run();
  };
}