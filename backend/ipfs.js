

function Uploadfile(file){
	console.log(file)
	let shellcmd = "ipfs add "+file
	console.log(shellcmd)
   let res = require('child_process').execSync(shellcmd)
	console.log(res.toString())
	return res.toString().split(' ')[1]
}


module.exports = {
	Uploadfile
}
