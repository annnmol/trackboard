
interface IData {
  [key: string]: any;
}

interface IWallet { 
  _id: string
  name: string
  balance: number
  date: string
}


interface ITransaction { 
  _id: string
  walletId: string
  amount: number
  balance: number
  description: string
  type: "CREDIT" | "DEBIT"
  date: date
}
interface IAuthSession { 
  _id: string
  email: string
  fullName: number
  profilePic: number
}
