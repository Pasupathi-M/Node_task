import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

import { APP_DB } from "../db/database";
import { APIResponse } from "../utils/response";
import { dotenv } from '../server';
import { SECRET_KEY } from '../app-constant/auth'

class Auth {
  constructor() {
    //Empty
  }
  async userSignIn(req: Request | Record<string, any>, res: Response) {
    const apiResponse = new APIResponse(req, res);
    try {
      const findUser: any = await APP_DB.user.findFirst({
        where: {
          email: { equals: req.body.email },
        },
      });
      
      if(!findUser) return apiResponse.faild({ message: "Invalid username", statusCode: 200 })
      
      const isValidPassword = await bcrypt.compare(req.body.password, findUser.password)
      if(!isValidPassword) return apiResponse.faild({ message: 'Invalid password', statusCode: 200})

      //Generate token
      const token = jwt.sign(
        {
          username: findUser.name,
        },
        SECRET_KEY
      );
        
      console.log("Signin", findUser);
      apiResponse.success({
        userName: findUser.name,
        headerName: 'access-token',
        token
      }, true);
    } catch (e) {}
  }

  async createUser(req: Request | Record<string, any>, res: Response) {
    const apiResponse = new APIResponse(req, res);
    try {
      const findUser = await APP_DB.user.findFirst({
        where: {
          email: { equals: req.body.email },
        },
      });

      if (findUser) return apiResponse.faild({ message: "User already exist", statusCode: 200 });

      const saltValue = await bcrypt.genSalt(7)

      // Hash password
      const hashPass = await bcrypt.hash(req.body.password, saltValue)

      // Encrypted password
      req.body.password = hashPass
      
      const resData = await APP_DB.user.create({ data: { ...req.body } });
      console.log("resData", resData);
      apiResponse.success(resData);
    } catch (e: any) {
      console.log("Error", e.message);
      apiResponse.faild(e);
    }
  }
}

export default new Auth()
