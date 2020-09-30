function checkCashRegister(price, cash, cid) {
   // create denomination array to loop through
   const denominations = [['ONE HUNDRED', 100], ['TWENTY', 20], ['TEN', 10], ['FIVE', 5], ['ONE', 1], ['QUARTER', 0.25], ['DIME', 0.10], ['NICKEL', 0.05], ['PENNY', 0.01]]

   //calculate change and sum of register
   let change = cash - price
   const sum = cid.reduce((sum, el) => sum += el[1], 0) * 100 / 100
   const output = { status: null, change: [] }

   //if exact change, return output
   if (sum === change) {
      output.status = 'CLOSED'
      output.change = cid
      return output
   }

   //if obvious insufficient funds, return output
   if (change > sum) {
      output.status = 'INSUFFICIENT_FUNDS'
      return output
   }

   //loop through denominations array to create change array
   // reverse cid array to match denomination array
   const reversedCid = cid.reverse()
   const changeArr = denominations.reduce((acc, denom, i) => {
      let changeInHand = 0
      while (reversedCid[i][1] > 0 && change >= denom[1]) {
         change -= denom[1]
         change = Math.round(change * 100) / 100
         reversedCid[i][1] -= denom[1]
         changeInHand += denom[1]
      }
      if (changeInHand > 0) {
         acc.push([denom[0], changeInHand])
      }
      return acc
   }, [])


   if (changeArr.length < 1 || change > 0) {
      output.status = 'INSUFFICIENT_FUNDS'
      return output
   }

   output.status = 'OPEN'
   output.change = changeArr
   return output
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
