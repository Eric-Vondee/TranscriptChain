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
    collection University{
        id: string;
        name: string;
        registrarName: string;
        vcName: string;
        year: number;
        month: number;
        email: string;
        accessId: string;
        isVerified: boolean;
        walletAddress?: string;


        constructor(id:string, name:string, registrarName:string,vcName: string, year:number, month:number, email:string, accessId:string, isVerified:boolean){
            this.id = id;
            this.name = name;
            this.registrarName = registrarName;
            this.vcName = vcName;
            this.year = year;
            this.month = month;
            this.email = email;
            this.accessId = accessId;
            this.isVerified = isVerified;
        }

        @index(id, accessId);

        updateProfile(isVerified:boolean, walletAddress:string){
            this.isVerified = isVerified;
            this.walletAddress = walletAddress;
        }

        del(){
            selfdestruct();
        }
    }
`);

const Uni = db.collection("University");
export default Uni;
