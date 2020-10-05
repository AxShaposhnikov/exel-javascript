// @ts-ignore
import path from "path";

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}
