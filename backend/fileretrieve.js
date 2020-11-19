const config= require('./config')
const {mysqlexec}= require('./mysql')
const { ClientRetrieve,ClientFindData } =require('./lotus');



async function UpdateStatusAccordingFilecoinCid(datacid,sts){
	let updateSql = "update filelog set Status = ? where filecoinCid =?";
	console.log(updateSql)
	//let updateres = await mysqlexec(updateSql,[sts,datacid])
}

//UpdateStatusAccordingFilecoinCid("kdfajs",1)



/*
 * 文件状态默认为NULL, 如果能够查到filecoinid，则为1  如果是2 表示查不到
 */

async function fileretrieve(){
	let querysql = "select * from filelog where (Status !=1 or Status is null) and filecoinCid is not null limit 1"
	let queryRes = await mysqlexec(querysql)
	if(queryRes.err != null){
		return
	}
	let arrcount = queryRes.rows.length
	if(arrcount == 0){
		return
	}
	let data =queryRes.rows
	//console.log(data)
	data.forEach(async function(v,i,a){
		console.log(v)
		console.log("======================")
		let testdata = "bafykbzacebdzsmpyubegd7iymhimj4uivr7hk4vue55nmbbvj2enuevsee4ri"
		let finddatares= await ClientFindData(testdata)
		console.log(finddatares)
		if(finddatares.result.length==0){
			contine
		}
		finddatares.result.forEach(async function(v,i,a){
			console.log(typeof v)
			console.log(v.Err==nil)
		})
	});


}

fileretrieve()
