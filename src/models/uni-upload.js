import db from "../db/index.js";
import { ethPersonalSign } from "@polybase/eth";
import { PRIVATE_KEY } from "../../config/index.js";
import { ethers } from "ethers";

const wallet = new ethers.Wallet(PRIVATE_KEY);
db.signer((data) => {
  return {
    h: "eth-personal-sign",
    sig: ethPersonalSign(wallet.privateKey, data),
  };
});

await db.applySchema(`
    @public 
    collection UniversityUploads{
        id:string;
        operatorName: string;
        facultyName: string;
        departmentName:string;
        month: number;
        year: number;

        constructor(id:string, operatorName:string, facultyName:string, departmentName:string, month:number, year:number){
            this.id = id;
            this.operatorName = operatorName;
            this.facultyName = facultyName;
            this.departmentName = departmentName;
            this.month = month;
            this.year = year;
        }

        @index(id);
    }
`);

const UniUpload = db.collection("UniversityUploads");
export default UniUpload;
