const isValidUser = (req,res,next)=>{

     var ctr = req.flash('counter')
     console.log(ctr)
    if(ctr==1){
        
        console.log("Middleware called !!!")
       
        next()
    }
    else{
        // As counter will have nothig in flash
        console.log("As falsh is having [] in second request so counter is also [] ")
        
        console.log(`Value of counter after refresh or in second request in flash : ${req.flash('counter')}`)
        console.log(req.flash('counter'))
        console.log(`Value of variable ctr after refresh or in second request : ${ctr}`)
        console.log(req.flash('ctr'))
        req.flash('msg6','please Login or Signup fisrt to view dashboard page!!!')
        res.redirect('/login')
    }
}

export default isValidUser