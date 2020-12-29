const { exec } = require("child_process");
const { extension } = require("../../util/file");

const canCompile = () => {
  let status = false;

  const isCompiling = () => {
    return status;
  };

  const start = () => {
    status = true;
  };

  const stop = () => {
    status = false;
  };

  return {
    isCompiling,
    start,
    stop,
  };
};

const compileStatus = canCompile();

// On retourne une promesse pour pouvoir attendre le résultat de la compilation
const compile = async (path, options = "") => {
  compileStatus.start();
  const ext = extension(path);
  let result = undefined;
  switch (ext.toLowerCase()) {
    case "c":
    case "cpp":
      result = await compileGcc(path, options);
      break;
    case "asm":
      result = await compileAssembly(path, options);
      break;
    default:
  }
  compileStatus.stop();
  return result;
};

const compileGcc = (path, options = "") =>
  new Promise((resolve, reject) => {
    exec(
      `gcc -lstdc++ ${options} ${path} -o ${path}.out && ${path}.out`,
      (error, stdout, stderr) => {
        if (error) {
          return reject(error);
        }
        if (stderr) {
          return resolve(stderr);
        }
        return resolve(stdout);
      }
    );
  });

const compileAssembly = (path, options = "") =>
  new Promise((resolve, reject) => {
    exec(
      `nasm -f elf64 ${options} -o ${path}.out ${path} && ld -o ${path}.run ${path}.out && ${path}.run`,
      (error, stdout, stderr) => {
        if (error) {
          return reject(error);
        }
        if (stderr) {
          return resolve(stderr);
        }
        return resolve(stdout);
      }
    );
  });

module.exports = { compile, compileStatus };
