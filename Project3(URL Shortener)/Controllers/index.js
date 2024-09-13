const URL=require('../Models/url')
const shortid = require('shortid');

async function handlePostUrl(req,res) {
    const body=req.body
    if (!body) {
        return res.status(400).json({ msg: "Required Fields are empty." })
    }
    const result=await URL.create({
        shortId:shortid.generate(),
        redirectUrl:body.url,
        visitHistory:[]
    })
    
    return res.render("index",{
        id : result.shortId,
    })
}

async function handleRedirectUrl(req,res) {
    const id=req.params.shortId
    const entry= await URL.findOneAndUpdate({shortId:id},{$push:{visitHistory:{
        timestamp:Date.now(),
    }}})
    res.redirect(entry.redirectUrl)
}


module.exports={
    handlePostUrl,
    handleRedirectUrl,
}