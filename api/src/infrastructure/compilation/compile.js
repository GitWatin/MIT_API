const { exec } = require("child_process");
const { extension } = require("../../util/file");
const { addCompilationToHistory } = require("../rest/fonctionRoutes/compile");

const canCompile = () => {
  let status = false;

  //paramettre pour le start/stop de la compilation

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
const compile = async (path, email, options = "") => {
  compileStatus.start();
  const ext = extension(path); // Check la compilateur en fonction de l'extension
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
  await addCompilationToHistory(email, result, path);
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
