import resolve from "rollup-plugin-node-resolve";

const dist = "dist";

export default {
    input: "src/index.js",
    output: [
        {
            file: `${dist}/histogram.cjs.js`,
            format: "cjs"
        },
        {
            file: `${dist}/histogram.esm.mjs`,
            format: "esm"
        },
        {
            file: `${dist}/histogram.umd.js`,
            format: "umd",
            name: "histogram"
        }
    ],

    plugins: [
        resolve()
    ]
};
