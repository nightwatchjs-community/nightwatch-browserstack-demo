const child_process = require('child_process');
const EventEmitter = require('events');

class ChildProcess extends EventEmitter {
  static get defaultStartDelay() {
    return 10;
  }

  constructor(args, {live_output = true}) {
    super();

    this.mainModule = process.mainModule.filename;
    this.process = null;
    this.globalExitCode = 0;
    this.args = args || [];
    this.output = [];
    this.live_output = live_output;
  }

  /**
   * Returns an array of cli arguments to be passed to the child process,
   * based on the args passed to the main process
   * @returns {Array}
   */
  getArgs() {
    const args = [];

    args.push(this.mainModule);
    args.push.apply(args, this.args);

    return args;
  }

  writeToStdout(data) {
    data = data.toString().trim();
    let childProcessLabel = '[child-process]';
    let output = '';
    if (this.live_output) {
      output += '\n';
    }

    let lines = data.split('\n').map(line => {
      return `${childProcessLabel} ${line}`;
    });

    data = lines.join('\n');
    output += data;

    if (this.live_output) {
      process.stdout.write(output + '\n');
    } else {
      this.output.push(output);
    }
  }

  run() {
    const cliArgs = this.getArgs();
    const env = {};

    Object.keys(process.env).forEach(function(key) {
      env[key] = process.env[key];
    });

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.process = child_process.spawn(process.execPath, cliArgs, {
          cwd: process.cwd(),
          encoding: 'utf8',
          env: env,
          stdio: [null, null, null, 'ipc']
        });

        this.process.stdout.on('data', data => this.writeToStdout(data));
        this.process.on('message', message => this.emit('message', message));
        this.process.stderr.on('data', data => this.writeToStdout(data))
        this.process.on('exit', code => {
          resolve(code);
        });
      }, ChildProcess.defaultStartDelay);
    });
  }
}

module.exports = ChildProcess;
