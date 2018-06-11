let fs = require('fs')
let Mock = require('mockjs')
let Random = Mock.Random;
let o = {
    id:1,
    date: '2016-05-03',
    name:'',
    code:'',
    email:'',
    phone:'',
    org:'',
    auth:'',
    forg:''
}
let res= Mock.mock({
    "userList|100":[
        {
            name:()=>Random.cname(),
            id:()=>Random.id(),
            mobile:/^1[3578]\d{9}$/,
            email:()=>Random.email(),
            data:()=>Random.date(),
            "org|1":[
                "工程维护部本部",
                "黄永璋组",
                "企业营销",
                "专网事业部",
                "资产管理部",
                "电信通行政部",
                "人事行政部",
                "财务部",
                "电信通帐务部",
                "法务部"
            ],
            "forg|1":[
                "电信通后台2部",
                "教育业务部",
                "北京电信通电信工程有限公司",
                "北京电信通电信工程有限公司",
                "电信通后台1部",
                "北京电信通电信工程有限公司",
                "电信通后台1部",
                "电信通后台1部",
                "北京电信通电信工程有限公司",
                "电信通后台1部"
            ],
            auth:'',
            "code|10000-60000":1
        }
    ]
})

fs.writeFile('user.json',JSON.stringify(res),function(){
    console.log('success')
})