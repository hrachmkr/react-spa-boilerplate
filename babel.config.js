module.exports = {
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-flow'],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-flow-strip-types',
        'transform-es2015-modules-commonjs',
        'babel-plugin-dynamic-import-node',
        'babel-plugin-styled-components',
        'inline-react-svg'
    ]
}
