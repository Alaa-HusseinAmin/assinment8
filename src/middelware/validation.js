export const validation=(schema)=>{
    return (req,res,next)=>{
        let {error}=schema.validate(req.body,{abortEarly: false })
        console.log(error);
        if(error?.details){
            res.json(error?.details)
        }else{
            next()
        }
    }
}