const fs = require( 'fs' );
//
const getPackages = require( './packages/get-packages' );


let DEPENDENCIES = {}


getPackages().forEach((path) => {
  const jsonStr = fs.readFileSync( `${path}/package.json`, 'utf8' )
	const json = jsonStr?JSON.parse(jsonStr):{}


	if('dependencies' in json){
  	for(let key in json['dependencies']){
  		if(key.indexOf('@wordpress') === -1 && !DEPENDENCIES[key]){
				DEPENDENCIES[key] = json['dependencies'][key]
			}
		}
	}
})

fs.writeFileSync( './packages-dependencies.json', JSON.stringify(DEPENDENCIES) );




