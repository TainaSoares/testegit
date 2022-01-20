export enum MOEDA  {
    BRL = "BRL",
    USD =  "USD"
}


export type Cotacao = {
    ask: string
}


export type Conversao = {
    id: string,
    moedaOriginal:MOEDA,
    moedaDaConversao: MOEDA,
    valorEnviado: number,
    valorConvertido: number
}

