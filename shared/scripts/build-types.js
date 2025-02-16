import fs from "fs";
import path from "path";
import { glob } from "glob";

// Paths
const __dirname = import.meta.dirname;
const DIST_DIR = path.resolve(__dirname, "../src");
const INDEX_FILE = path.join(DIST_DIR, "index.ts");

// Collect all types and generate index.d.ts
const typeFiles = glob
  .sync("src/**/*.ts", { absolute: false })
  .map((file) => file.replace(/^src\\/, "./"))
  .filter((file) => file !== "./index.ts");

const exports = typeFiles
  .map(
    (file) =>
      `export * from "${file.replaceAll("\\", "/").replace(".ts", "")}";`
  )
  .join("\n");

fs.writeFileSync(INDEX_FILE, exports);
console.log("index.ts generated successfully");
