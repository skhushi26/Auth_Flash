import bcrypt from 'bcrypt'

import userModel from '../models/user.js'

import flash from 'connect-flash'

class UserController{


      // get Methods

      static landing_get = (req,res)=>{
        res.render('landingpage.ejs')
      }
      
      static signUp_get = (req,res)=>{

        res.render('signup.ejs',{error:req.flash('err')})
      }

      static login_get = (req,res)=>{


        res.render('login.ejs',{error:req.flash('err'),message1:req.flash('msg1'),m6:req.flash('msg6')})
      }

    static dashboard_get = (req,res)=>{


        res.render('dashboard.ejs' ,{message2:req.flash('msg2')})
    }
    // Post Methods handling the Form Data


    static signUp_post = async(req,res)=>{

    // get the form data

    // usr_name=&usr_email=&usr_pwd=

      const{usr_name,usr_email,usr_pwd} = req.body

      // check the user in db

      const user_existed = await userModel.findOne({email:usr_email})

      if(user_existed){

        req.flash('err','User already Exists Please Login!!!')
        res.redirect('/login')

      }
      else{

        // As it is a new User We save it in db
        // But with encrypted Password

           const hashedPwd = await bcrypt.hash(usr_pwd,12)

           userModel.create({
            name :usr_name,
            email : usr_email,
            password : hashedPwd
           }).then(()=>{
            req.flash('msg1',`Registration Successfull Please Login Dear ${usr_name}`)
            res.redirect('/login')
           })
            .catch((error)=>{
                console.log(error)
            })
      }



    }

    static login_post = async(req,res)=>{

        const{usr_email,usr_pwd} = req.body

        const existing_user = await userModel.findOne({email:usr_email})

        if(existing_user){

            // test the password is also correct then send to dashboard

            console.log("User is Existing user")
            console.log(existing_user.password)
            console.log(usr_pwd)

            const pwd_matched = await bcrypt.compare(usr_pwd,existing_user.password)

            
             console.log(pwd_matched)
            if(pwd_matched){
                console.log("User Verfied as pwd matched!!!")
                console.log(pwd_matched)
                req.flash('msg2',`Welcome Dear ${existing_user.name} to our dashboard page!!!` )
                req.flash('counter',1)
                res.redirect('/dashboard')
            }
            else{

                req.flash('err','Please Enter Correct Password !!!')
                res.redirect('/login')
            }

        }
        else{

            req.flash('err','You are not a Registered User Please Signup first !!!')
            res.redirect('/signup')
        }
    }

    static logout_post_dashboard=(req,res)=>{

      // we destroy the sesion to remove any variables attached

      req.session.destroy()
     // Code below will start a new session

      
    
     res.redirect('/login')

  }


}

export default UserController