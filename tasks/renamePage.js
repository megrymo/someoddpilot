import path from "path";

export default function renamePage(filePath) {
  if (filePath.basename !== "index") {
    filePath.dirname = path.join(
      filePath.dirname,
      filePath.basename
    );
    filePath.basename = "index";
  }
}
