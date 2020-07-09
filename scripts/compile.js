// https://www.npmjs.com/package/solc/v/0.4.26

const fs = require('fs-extra');
const path = require('path');
const solc = require('solc');

const compiledDir = path.resolve(__dirname, '../compiled');
fs.removeSync(compiledDir);
fs.ensureDirSync(compiledDir);


// const contractFile = 'Lottery.sol';
// const contractPath = path.resolve(__dirname, '../contracts', contractFile);
// const contractSource = fs.readFileSync(contractPath, 'utf8');

const buildSources = () => {

	const sources = {};
  const contractsFolderPath = path.resolve(__dirname, '../contracts');
  const contractsFiles = fs.readdirSync(contractsFolderPath);

	contractsFiles.forEach(file => {
		const contractFullPath = path.resolve(contractsFolderPath, file);
    sources[file] = fs.readFileSync(contractFullPath, 'utf8');
    
    console.log(`file compiled: ${file}`);
	});
	return sources;
}
// console.log( buildSources() )
// const input = {
//   'Owned.sol': 'pragma solidity ^0.4.22; contract Owned {}',
//   'Lottery.sol': contractSource
// };
const result = solc.compile({ sources: buildSources() }, 1);

// const input = contractSource;
// const result = solc.compile( input , 1);

// console.log(`file compiled: ${contractFile}`);
// console.log(result); // debug


if (Array.isArray(result.errors) && result.errors.length) {
  throw new Error(result.errors[0]);
}

Object.keys(result.contracts).forEach(name => {
  
  // const contractName = name.replace(/^:/, ''); // ':Lottery': {
  const extIndex = name.lastIndexOf('.'); 
  const contractName = name.substr(0, extIndex); // 'Lottery.sol:Lottery': {

  const filePath = path.resolve(compiledDir, `${contractName}.json`);
  fs.outputJsonSync(filePath, result.contracts[name]);
  console.log(` > contract ${contractName} saved to ${filePath}`);

  const dappDir = path.resolve(__dirname, '../dapp/src');
  const dappFilePath = path.resolve(dappDir, `${contractName}.json`);
  fs.outputJsonSync(dappFilePath, result.contracts[name]);
  console.log(` > contract ${contractName} saved to ${dappFilePath}`);
});
