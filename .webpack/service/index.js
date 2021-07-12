module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(0);
const serverless_http_1 = tslib_1.__importDefault(__webpack_require__(2));
const express_1 = tslib_1.__importDefault(__webpack_require__(3));
const functions_1 = tslib_1.__importDefault(__webpack_require__(4));
const app = express_1.default();
app.get('/', function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return res.send('Hello World!');
    });
});
app.get('/pdf', (req, res) => {
    functions_1.default();
    res.send({
        message: 'PDF created!',
    });
});
module.exports.handler = serverless_http_1.default(app);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("serverless-http");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(0);
//import PdfPrinter = require('pdfmake');
const pdfmake_1 = tslib_1.__importDefault(__webpack_require__(5));
const vfsFont = tslib_1.__importStar(__webpack_require__(6));
const fs = tslib_1.__importStar(__webpack_require__(7));
const logic = () => {
    const fonts = {
        Roboto: {
            normal: new Buffer(vfsFont.pdfMake.vfs['Roboto-Regular.ttf'], 'base64'),
            bold: new Buffer(vfsFont.pdfMake.vfs['Roboto-Medium.ttf'], 'base64'),
            italics: new Buffer(vfsFont.pdfMake.vfs['Roboto-Italic.ttf'], 'base64'),
            bolditalics: new Buffer(vfsFont.pdfMake.vfs['Roboto-MediumItalic.ttf'], 'base64')
        }
    };
    const documentDefinition = {
        pageSize: 'A4',
        pageOrientation: 'portrait',
        footer: (currentPage, pageCount) => {
            return {
                columns: [
                    {
                        text: `${currentPage.toString()} / ${pageCount}`,
                        alignment: 'right'
                    }
                ]
            };
        },
        content: [],
        styles: {
            footer: {
                margin: [48, 0, 48, 0]
            }
        }
    };
    const printer = new pdfmake_1.default(fonts);
    const pdfDoc = printer.createPdfKitDocument(documentDefinition);
    pdfDoc.pipe(fs.createWriteStream(`document_${Math.floor(Math.random() * 20)}.pdf`));
    pdfDoc.end();
};
exports.default = logic;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("pdfmake");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("pdfmake/build/vfs_fonts.js");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ })
/******/ ]);