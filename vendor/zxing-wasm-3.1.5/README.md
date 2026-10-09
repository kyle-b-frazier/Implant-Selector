# zxing-wasm 3.1.5 (reader only)

The barcode reader the scanner (`scan.js`) uses on browsers without a
built-in `BarcodeDetector`, such as Safari on iPhone. Copied unchanged from
the npm package [zxing-wasm](https://www.npmjs.com/package/zxing-wasm)
3.1.5 (MIT, see LICENSE):

- `zxing-reader.js` ← `dist/iife/reader/index.js`
- `zxing_reader.wasm` ← `dist/reader/zxing_reader.wasm`

To upgrade, copy the same two files from the new version into a folder
named for it, then update the paths in `scan.js` and `sw.js`.
