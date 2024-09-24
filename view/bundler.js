const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const Terser = require('terser');

const config = require('./bundler.config.js');

function resolveDependencies(content, filePath) {
    const regex = /require\(['"](.+?)['"]\)/g;
    let match;
    const dependencies = [];

    while ((match = regex.exec(content))) {
        dependencies.push(path.resolve(path.dirname(filePath), match[1]));
    }

    return dependencies;
}

async function bundle(entry) {
    const content = fs.readFileSync(entry, 'utf-8');
    const dependencies = resolveDependencies(content, entry);
    
    const transformed = babel.transformSync(content, {
        filename: entry,
        presets: config.babel.presets,
        plugins: config.babel.plugins,
    });

    let bundleCode = transformed.code;

    for (const dep of dependencies) {
        const depCode = fs.readFileSync(dep, 'utf-8');
        const transformedDep = babel.transformSync(depCode, {
            filename: dep,
            presets: config.babel.presets,
            plugins: config.babel.plugins,
        });
        bundleCode += `\n${transformedDep.code}`;
    }

    if (config.minify.enabled) {
        const minified = await Terser.minify(bundleCode, config.minify.options);
        bundleCode = minified.code;
    }

    fs.writeFileSync(path.resolve(config.output.path, config.output.filename), bundleCode);
    console.log('Bundling completed:', config.output.filename);
}


function watchFiles() {
    const watchPath = path.resolve(__dirname, 'src'); // Directory to watch

    fs.watch(watchPath, { recursive: true }, (eventType, filename) => {
        if (filename) {
            console.log(`File changed: ${filename}. Rebuilding...`);
            bundle(config.entry); // Re-bundle on change
        }
    });
}

bundle(config.entry).then(() => {
    console.log('Initial bundling complete. Watching for changes...');
    if (config.watch.enabled) {
        watchFiles();
    }
}).catch(err => {
    console.error('Error during bundling:', err);
});
