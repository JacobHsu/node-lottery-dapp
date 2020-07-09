const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

 
const builPath = path.resolve(__dirname, '../compiled');

const buildSources = () => {

	const sources = {};
  const contractsFolderPath = path.resolve(__dirname, '../contracts');
  const contractsFiles = fs.readdirSync(contractsFolderPath);

	contractsFiles.forEach(file => {
		const contractFullPath = path.resolve(contractsFolderPath, file);
		sources[file] = {
			content: fs.readFileSync(contractFullPath, 'utf8')
		};
	});
	return sources;
}

const input = {
  language: 'Solidity',
  sources: buildSources(),
  settings: {
    outputSelection: {
      '*': {
        '*': [ 'abi', 'evm.bytecode' ]
      }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)))
console.log(output) //debug return
const compiledContracts = output.contracts;


for (let contract in compiledContracts) {
    for(let contractName in compiledContracts[contract]) {
        fs.outputJsonSync(
            path.resolve(builPath, `${contractName}.json`),
            compiledContracts[contract][contractName],
            {
                spaces: 2
            }
        )
    }
}