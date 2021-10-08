import path from "path";
import fs from "fs";
import { URL } from "url";

const walk = (dir: string): string[] => {
  const results = [];
  const dirs = fs.opendirSync(dir);
  let currentPath = dirs.readSync();
  while (currentPath) {
    const absolutePath = path.join(dir, currentPath.name);

    if (currentPath.isDirectory()) {
      results.push(...walk(absolutePath));
    } else if (currentPath.isFile() && currentPath.name.includes("spec.ts")) {
      results.push(absolutePath);
    }
    currentPath = dirs.readSync();
  }
  return results;
};

const fileUrl = new URL(import.meta.url);
const testFolder = path.resolve(
  fileUrl.host + path.sep + fileUrl.pathname,
  ".."
);
console.log("Looking for tests in", testFolder);
console.log();

const tests = walk(testFolder).sort();

(async () => {
  for (const testFile of tests) {
    const importedTests = await import(testFile);
    for (const property of Object.keys(importedTests)) {
      if (property.startsWith("test")) {
        try {
          importedTests[property]();
          console.log(`    ✅   ${property} @ ${testFile}`);
        } catch (e) {
          console.error(`    ❌   ${property} @ ${testFile}`);
          console.error(e);
          console.log();
          process.exit(1);
        }
      }
    }
  }
})();
