import { NextFunction } from "express";

// export const AsyncErrrorHandler = async (
//   func: Function,
//   next: NextFunction
// ) => {
//   try {
//     func;
//   } catch (err) {
//     next(err);
//   }
// };


export const AsyncErrrorHandler = async (func: Function) => {
  try{
    func
  }catch(err){
    console.log(err)
  }
}