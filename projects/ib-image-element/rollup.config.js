import angular from 'rollup-plugin-angular';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';

export default [{
   input: 'src/rollup.ts',
   output: {
     file: '../../src/assets/plugins/plugin-image.bundle.js',
     format: 'umd',
     name: 'plugin-image',
},
   plugins: [
     angular(),
     resolve({
        jsnext: true,
        main: true,
        // pass custom options to the resolve plugin
        customResolveOptions: {
           moduleDirectory: 'node_modules'
        }
     }),
     typescript({
       typescript: require('typescript')
     }),
     commonjs()
   ],
   external: [
     '@angular/core',
     '@angular/common',
     '@angular/forms'
   ]
}]
