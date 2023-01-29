import axios from 'axios';
import { ICustomParts } from '../store/slices/totalCustomSlice';
import { IParts } from '../store/slices/totalSlice';


interface IFinalInfo {
  vin: string;
  car: string;
  parts: IParts[];
  total: number;
}
interface IFinalCustomInfo {
  vin: string;
  car: string | undefined;
  parts: ICustomParts[];
  total: number;
}

const TOKEN = process.env.REACT_APP_TOKEN;
const CHAT_ID = process.env.REACT_APP_CHAT_ID;
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

export const postToTelegram = (data:IFinalInfo) => {
  let message = `<b>Vin: ${data.vin}</b>\n`;
  message += `<b>Машина: </b>${data.car}\n\n`;
  data.parts.forEach(item => {
    message += `<b>${item.name + ' ' + item.quality + ' ' + item.count + 'шт'} : ${item.partPrice}$</b>\n`;
    message += `<b>Работа : ${item.workPrice}$</b>\n`;
    message += `<b>Деталь с работой : ${item.totalPrice}$</b>\n\n`;
  });
  message += `<b>Ремонт: ${data.total}$</b>\n`;
  
  axios.post(URI_API, {
    chat_id: CHAT_ID,
    parse_mode: 'html',
    text: message
  })
}

export const postCustomToTelegram = (data:IFinalCustomInfo) => {
  let message = `<b>Vin: ${data.vin}</b>\n`;
  message += `<b>Машина: </b>${data.car}\n\n`;
  data.parts.forEach(item => {
    if (item.count === 0){
      message += `<b>Рихтовка (${item.name}) : ${item.workPrice}$</b>\n\n`;
    }else{
      message += `<b>${item.name} ${item.count}шт : ${item.partPrice}$</b>\n`;
      message += `<b>Работа : ${item.workPrice}$</b>\n`;
      message += `<b>Всего : ${item.totalPrice}$</b>\n\n`;
    }
  });
  message += `<b>Ремонт: ${data.total}$</b>\n`;
  
  axios.post(URI_API, {
    chat_id: CHAT_ID,
    parse_mode: 'html',
    text: message
  })
}