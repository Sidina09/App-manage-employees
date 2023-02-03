import jwt  from "jsonwebtoken"
import { config } from 'dotenv'

config()

export const checkRole= (roles, req, res, next)=> {
        
    const token = req.headers.authorization.split(' ')[1]; 
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN); 
    (roles.includes(decodedToken.role)) ? next() : res.status(403).json({error: 'acces denieted'})
}

// decodedToken.role = super admin





// if (roles.includes(decodedToken.role))
//         userId= user._id
//         justification = user.justification
//         next()
       
//         return res.status(403).json({error:"you don't have access"})


// user type
// let days = 45; // 1 ere iter== > days = 45 // 2 eme iter ==> 35 // 3eme iter ==> -5
// let reqDays = endDate - startdate // 1ere iter ==> reqDays = 10 // 2 eme iter ==> reqDays = 40
// const numberOffDays = days - reqDays // 1ere iter == > numberOffDays = days(45) -reqDays(10) = 35
                                    // 2eme iter ==> numberOffDays = days(35) - reqDays(40) = -5



        //1err: 10 < 45
// if ( reqDays < days) return type = paid // 1ere iter == > numberOffDays= 35 > 0 ==> paid
                                            // 2eme iter == > false
// if (reqDays > days) 
            //  {numberOffDays : type = unpaid // 2eme iter ==> numberOffDays = -5 < 0 ==> unpaid 
                // days : type = paid}
// else 
//  type= sick 
//  days = numberOffDays // 1 ere iter ==> days = 35 
                            // 2eme iter ==> days = -5
// if ( days === 0 || reqDays > days) // 1ere iter ==> reqDays(10)  < 35 // 2 eme iter ==> 40 > -5
//  res.status(200).json({ message: "your days off in the year is finished" });
// res.status(500).json({ message: 'you can just daysoff of type sick ' });

// process.exit()