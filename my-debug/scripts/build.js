const md2json = require("./md2json");
const { extractDesc } = require("./schemaHelper");
const { getDocJSONPVarNname } = require("./shared");

const fs = require("fs");
const fse = require("fs-extra");
const chalk = require("chalk");
const path = require("path");

const config = {
  galleryViewPath:
    "http://localhost/echarts-website/examples/${lang}/view.html?c=",
  galleryEditorPath:
    "http://localhost/echarts-website/examples/${lang}/editor.html?c=",
  handbookPath: "http://localhost/echarts-website/handbook/${lang}/",
  imagePath: "asset/img/",
  releaseDestDir: "my-debug/public",
};

const languages = ["zh", "en"];

async function md2jsonAsync(opt) {
  const newOpt = Object.assign(
    {
      path: path.join(opt.base, opt.language, opt.entry, "**/*.md"),
      tplEnv: Object.assign({}, config, {
        galleryViewPath: config.galleryViewPath.replace(
          "${lang}",
          opt.language
        ),
        galleryEditorPath: config.galleryEditorPath.replace(
          "${lang}",
          opt.language
        ),
        handbookPath: config.handbookPath.replace("${lang}", opt.language),
      }),
      imageRoot: config.imagePath,
    },
    opt
  );

  function run(cb) {
    md2json(newOpt)
      .then((schema) => {
        writeSingleSchema(schema, opt.language, opt.entry, false);
        writeSingleSchemaPartioned(schema, opt.language, opt.entry, false);
        console.log(
          chalk.green("generated: " + opt.language + "/" + opt.entry)
        );
        cb && cb();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return await new Promise((resolve, reject) => {
    run(resolve);
  });
}

async function run() {
  const context = process.cwd();
  await md2jsonAsync({
    sectionsAnyOf: ["dataZoom"],
    entry: "option",
    language: 'zh',
    base: context + "/my-debug",
  });

  console.log("Build doc done.");
}

function writeSingleSchema(schema, language, docName, format) {
  const destPath = path.resolve(
    config.releaseDestDir,
    `${language}/documents/${docName}.json`
  );
  fse.ensureDirSync(path.dirname(destPath));
  fse.outputFileSync(
    destPath,
    format ? JSON.stringify(schema, null, 2) : JSON.stringify(schema),
    "utf-8"
  );
  console.log(chalk.green("generated single schema: " + destPath));
}

function writeSingleSchemaPartioned(schema, language, docName, format) {
  const { outline, descriptions } = extractDesc(schema, docName);

  function convertToJS(basename, filePath) {
    const content = fs.readFileSync(filePath, "utf-8");
    const varName = getDocJSONPVarNname(basename);
    const code = `window.${varName} = ${content}`;
    fs.writeFileSync(filePath.replace(/\.json$/, ".js"), code, "utf-8");
  }

  const outlineBasename = `${docName}-outline.json`;
  const outlineDestPath = path.resolve(
    config.releaseDestDir,
    `${language}/documents/${docName}-parts/${outlineBasename}`
  );
  fse.ensureDirSync(path.dirname(outlineDestPath));
  fse.outputFileSync(
    outlineDestPath,
    format ? JSON.stringify(outline, null, 2) : JSON.stringify(outline),
    "utf-8"
  );
  convertToJS(outlineBasename, outlineDestPath);

  function copyUIControlConfigs(source, target) {
    for (let key in source) {
      if (target[key]) {
        if (source[key].uiControl && !target[key].uiControl) {
          target[key].uiControl = source[key].uiControl;
        }
        if (source[key].exampleBaseOptions && !target[key].exampleBaseOptions) {
          target[key].exampleBaseOptions = source[key].exampleBaseOptions;
        }
      } else {
        // console.error(`Unmatched option path ${key}`);
      }
    }
  }

  function readOptionDesc(language, partKey) {
    const descDestPath = path.resolve(
      config.releaseDestDir,
      `${language}/documents/${docName}-parts/${partKey}.json`
    );
    try {
      const text = fs.readFileSync(descDestPath, "utf-8");
      return JSON.parse(text);
    } catch (e) {
      return;
    }
  }

  function writeOptionDesc(language, partKey, json) {
    const descBasename = `${partKey}.json`;
    const descDestPath = path.resolve(
      config.releaseDestDir,
      `${language}/documents/${docName}-parts/${descBasename}`
    );
    fse.ensureDirSync(path.dirname(descDestPath));
    fse.outputFileSync(
      descDestPath,
      format ? JSON.stringify(json, null, 2) : JSON.stringify(json),
      "utf-8"
    );
    convertToJS(descBasename, descDestPath);
  }

  for (let partKey in descriptions) {
    let partDescriptions = descriptions[partKey];

    // Copy ui control config from zh to english.
    if (language === "zh") {
      languages.forEach(function(otherLang) {
        if (otherLang === "zh") {
          return;
        }
        const json = readOptionDesc(otherLang, partKey);
        if (json) {
          copyUIControlConfigs(partDescriptions, json);
          writeOptionDesc(otherLang, partKey, json);
        }
      });
    } else {
      const json = readOptionDesc("zh", partKey);
      if (json) {
        copyUIControlConfigs(json, partDescriptions);
      }
    }

    writeOptionDesc(language, partKey, partDescriptions);
    // console.log(
    //   chalk.green("generated single schema partioned: " + descDestPath)
    // );
  }
}

run();
