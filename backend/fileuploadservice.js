
const {mysqlexec}= require('./mysql')
const { readDirSync } = require('./filetraverse')
const fs = require("fs");

/*
 *插入MySQL的值默认为0
 定时任务会每隔一秒中从数据库中取状态为0的数据，每次取一条，然后判断文件或者文件夹是否存在，
 如果不存在，状态标记为2.如果存在，则进行上传
 */
async function do_exec(){
	let res = await mysqlexec("select * from filepath where status=0 limit 1")
	if (res.err ==null && res.rows.length ==1 ) {
		let pathstatus=1
		console.log(res.rows[0])
		let row = res.rows[0]
		console.log(row.id)
		if (fs.existsSync(row.path)){
			console.log("step into filepath")
			try{
				readDirSync(row.path)
			}catch(e){
				console.log(e)
				return
			}

		}else{
			pathstatus=2
			//let tmpnull=await mysqlexec("update filepath set status=2 where id=?",[row.id])
		}
		let tmpnull=await mysqlexec("update filepath set status=? where id=?",[pathstatus,row.id])


	}
}



function intervalExec(){
	let is_doing= false
	setInterval(function(){
		if(!is_doing){
			is_doing=true
			do_exec()
			is_doing=false
		}
	},3000)
}
intervalExec()
