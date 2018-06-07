var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",
	entry: {
		gate: "./gate.js",
		app: "./app.js"
	},
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "../public")
	},
	module: {
        rules: [{
            test: /\.scss$/,
            use: [
                "style-loader",
                "css-loader",
                "sass-loader"
            ]
        }]
    },
	plugins: [
		new HtmlWebpackPlugin({
			template: "./gate.html",
			filename: "./gate.html",
			chunks: ["gate"]
		}),
		new HtmlWebpackPlugin({
			template: "./app.html",
			filename: "./app.html",
			chunks: ["app"]
		})
	]
};
