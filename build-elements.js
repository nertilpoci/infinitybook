const fs = require('fs-extra');
const concat = require('concat');    

(async function build() {

    const files =[
        './dist/BaseComponents/main.js',
        './dist/BaseComponents/runtime.js',
        './dist/BaseComponents/polyfills.js',
        // './dist/BaseComponents/scripts.js'
    ]
    
    await fs.ensureDir('elements')
    
    await concat(files, 'elements/scheduled-jobs.js')
    console.info('Angular Elements created successfully!')

})()