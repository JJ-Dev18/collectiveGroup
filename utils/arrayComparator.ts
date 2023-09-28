

export const comparatorArray = (firstArray:Array<any>,secondArray:Array<any>,) => {

   return firstArray.filter( item => { 
      return !secondArray.some( item2 => item.id === item2.id)
   })

}