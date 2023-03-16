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
    collection Users{
        id: string;
        walletAddress: string;
        certificates?: string[];

        constructor(id:string, walletAddress:string, certificates:string[]){
            this.id = id;
            this.walletAddress = walletAddress;
            this.certificates = certificates;
        }

        @index(id, walletAddress);

        updateProfile(walletAddress:string){
            this.walletAddress = walletAddress;
        }
        
        updateCertificate(certificates: string){
            this.certificates.push(certificates);
        }

        del(){
            selfdestruct();
        }
    }

    @public
    collection Certificates{
        id: string;
        universityName: string;
        year: string;
        mintedDate?: string;
        transferredDate: string;
        certificateUrl: string;
        walletAddress: string;
        userId: string;

        constructor(id:string, universityName:string, year:string, transferredDate:string, certificateUrl:string, walletAddress:string, userId:string){
            this.id = id;
            this.universityName = universityName;
            this.year = year;
            this.transferredDate = transferredDate;
            this.certificateUrl = certificateUrl;
            this.walletAddress = walletAddress;
            this.userId = userId;
        }
        
        @index(id, walletAddress, userId);

        updateCertificateDetails(mintedDate: string){
            this.mintedDate = mintedDate;
        }

        del(){
            selfdestruct();
        }
    }
`);

export const Certificate = db.collection("Certificates");
export const User = db.collection("Users");
