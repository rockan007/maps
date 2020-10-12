import { AreaInfo } from './area-info';
export interface AreaInfoResponse {
    status: string;
    info: string;
    infocode: string;
    count: string;
    districts: Array<AreaInfo>;
}
