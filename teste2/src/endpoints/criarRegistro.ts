import { Request, Response } from "express"
import { connection } from "../connection"
import { cotacaoInfo } from "../services/cotacaoInfo"
import { Conversao, MOEDA } from "../types/types"

export const criarRegistroDeConversao = async(req:Request, res:Response) => {
    try {
        const {moedaOriginal, moedaDaConversao,valorEnviado } = req.body

        if(!moedaOriginal || !moedaDaConversao || !valorEnviado){
            throw new Error("Verifique se os parâmetros 'moedaOriginal' , 'moedaDaConversao' e 'valorEnviado' estão sendo passados!")
        }

        // const [verificandoExistencia] = await connection("cowala_mercado").where({nome})

        // if(verificandoExistencia){
        //     throw new Error("Produto já cadastrado!")
        // }

        //Conversão de USD-BRL

        // const conversao = async(): => {

        //verificar se moedaOriginal é BRL ou USD = ENUM
//
        let valorConvertido 

            if(moedaOriginal === MOEDA.USD){
                
                const cotacaoDolar = await cotacaoInfo()

                if(cotacaoDolar === null){
                    throw new Error("Erro de requisição da cotação dolar")
                }
                 valorConvertido = valorEnviado * Number(cotacaoDolar)
                
            }else{
                const cotacaoDolar = await cotacaoInfo()

                if(cotacaoDolar === null){
                    throw new Error("Erro de requisição da cotação dolar")
                }
                 valorConvertido = valorEnviado / Number(cotacaoDolar)
                
            }

        // }
  

        const novaConversao:Conversao = {
            id: Date.now().toString(),
            moedaOriginal,
            moedaDaConversao,
            valorEnviado,
            valorConvertido
        }

        await connection("cowala_conversao_moeda").insert(novaConversao)

        res.status(201).send({message: "Registro de convesão realizado com sucesso!"})
    } catch (error:any) {
        res.status(400).send({message: error.sqlMessage|| error.message})
    }

}