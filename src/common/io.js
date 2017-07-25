const fs = require('fs'),
  path = require('path'),
  fileCopy = require('filecopy'),
  mkdirp = require('mkdirp'),
  debug = require('debug')('cgd-io');

const readJsonFile = (filePath, next) => {
  debug('read Json:', filePath);

  fs.readFile(filePath, 'utf8', (err, data) => next(err, JSON.parse(data)));
};

const writeJsonFile = (filePath, data, next) => {
  debug('write Json:', filePath);

  const serializedData = typeof data === 'string' ? data : JSON.stringify(data);

  write(filePath, serializedData, next);
};

const write = (filePath, data, next) => {
  debug('write:', filePath);

  fs.writeFile(filePath, data, 'utf8', next);
  // next(null);
};

const listFiles = (dirPath, opts, next) => {
  debug('listFiles:', dirPath, opts);
  opts = opts || {};

  fs.readdir(dirPath, (err, files) => {
    if (err) return next(err, dirPath);

    if (opts.match) {
      const match = new RegExp(opts.match);
      files = files.filter(f => match.test(f));
    }

    next(null, dirPath, files.map(f => path.join(dirPath, f)));
  });
};

const copy = (source, dest, next) => {
  debug('copy', source, 'to', dest);
  fileCopy(source, dest, {mkdirp: true})
    .then(() => next(null)) // explicit call with null required
    .catch((err) => next(err));
  // next(null);
};

const createDir = (path, next) => {
  debug('mkdirp:', path);
  mkdirp(path, err => next(err));
  // next(null);
};

module.exports = {
  listFiles,
  copy,
  write,
  mkdirp: createDir,
  json: {
    read: readJsonFile,
    write: writeJsonFile
  }
};
