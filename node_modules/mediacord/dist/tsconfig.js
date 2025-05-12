// src/tsconfig.json
var extends2 = "@sapphire/ts-config/extra-strict-without-decorators.json";
var compilerOptions = {
  rootDir: "./",
  outDir: "../dist",
  composite: true,
  tsBuildInfoFile: "../dist/.tsbuildinfo",
  emitDeclarationOnly: true,
  skipLibCheck: true,
  lib: ["es2021", "DOM"]
};
var include = ["."];
var tsconfig_default = {
  extends: extends2,
  compilerOptions,
  include
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  compilerOptions,
  extends: null,
  include
});
