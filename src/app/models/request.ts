import { DetailsRequest } from "./detailsRequest";

export interface Request {

    idRequest: number;
    timeInMinutes: number;
    titleRequest: string;
    porcentajeMinimo: number;
    detailsRequestList: DetailsRequest[];
}