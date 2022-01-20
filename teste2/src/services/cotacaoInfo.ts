import axios from "axios";
import { json } from "stream/consumers";
import { Cotacao } from "../types/types";

export const cotacaoInfo = async():Promise<string | null> => {

    try {
      const result =  await axios.get("https://economia.awesomeapi.com.br/last/USD-BRL")

      return result.data.USDBRL.ask
    } catch (error) {
        console.log(error)
        return null
    }
}

