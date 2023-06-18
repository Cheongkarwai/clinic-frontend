import {HttpParams} from '@angular/common/http';

function createParam(params:object){
    let httpParam:HttpParams = new HttpParams();
    Object.entries(params)
            .forEach(e=>httpParam = httpParam.append(e[0],e[1]));

    return httpParam;
    //return params ? new URLSearchParams(params).toString() : '';
}

export {createParam};