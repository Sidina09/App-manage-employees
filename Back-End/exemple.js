
() => {
    const type= String;
const {endDate , startDate} = Number
const daysoffYear = 45;
const reqDaysOff = endDate - startDate
    if( reqDaysOff >= 15) console.error("ur request off days off should be less than or equal 15 days")
const numberOffDays = daysoffYear - reqDaysOff
if(daysoffYear < 0)  type = "unpaid"

if (numberOffDays >= 0)  type= "paid" 

if(numberOffDays  < 0)  type = "unpaid"
if(numberOffDays <= 0) {
    type = "paid"
    daysoffYear = type
    type = "unpaid"
    daysoffYear = type
}
daysoffYear = numberOffDays
console.log(daysoffYear)
}
