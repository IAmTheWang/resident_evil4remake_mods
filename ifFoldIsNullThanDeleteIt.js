"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function traverseDirectory(directory, excludedFolders, mode = 'console') {
    const files = fs_1.default.readdirSync(directory);
    for (const file of files) {
        const filePath = `${directory}/${file}`;
        if (fs_1.default.statSync(filePath).isDirectory()) {
            if (excludedFolders.includes(file)) {
                console.log(`Skipping excluded folder: ${filePath}\n`);
                continue;
            }
            if (isDirectoryEmpty(filePath)) {
                if (mode === 'handle') {
                    fs_1.default.rmdirSync(filePath);
                }
                console.log(`Deleted empty directory: ${filePath}\n`);
            }
            else {
                traverseDirectory(filePath, excludedFolders);
            }
        }
    }
}
function isDirectoryEmpty(directory) {
    const files = fs_1.default.readdirSync(directory);
    return files.length === 0;
}
const directoryPath = './';
const excludedFolders = ['.git'];
traverseDirectory(directoryPath, excludedFolders, 'console');
