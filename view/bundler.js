const fs = require("fs");
const path = require("path");

function bundle(entry) {
    const graph = buildDependencyGraph(entry);
    let bundledCode = "";
    for (const [file, dependencies] of Object.entries(graph)) {
        const content = fs.readFileSync(file, "utf-8");
        bundledCode += wrapInFunction(content) + "\n";
    }
    writeToFile(bundledCode);
}
function wrapInFunction(content) {
    return `(function() {
        ${content}
    })();`;
}
function writeToFile(content) {
    const outputPath = path.resolve(__dirname, "bundle.js");
    fs.writeFileSync(outputPath, content, "utf-8");
    console.log(`Bundle created at ${outputPath}`);
}
function resolveDependencies(content) {
    const regex = /require\(['"](.+?)['"]\)/g;
    let match;
    const dependencies = [];
    while ((match = regex.exec(content))) {
        dependencies.push(match[1]);
    }
    return dependencies;
}
function buildDependencyGraph(entry) {
    const graph = {};
    const queue = [entry];
    while (queue.length) {
        const current = queue.shift();
        const content = fs.readFileSync(current, "utf-8");
        const dependencies = resolveDependencies(content);

        graph[current] = dependencies.map((dep) =>
            path.resolve(path.dirname(current), dep)
        );

        dependencies.forEach((dep) => {
            const resolvedPath = path.resolve(path.dirname(current), dep);
            if (!graph[resolvedPath]) {
                queue.push(resolvedPath);
            }
        });
    }
    return graph;
}

module.exports = bundle;

if (require.main === module) {
    bundle(path.resolve(__dirname, "src/index.js"));
}
