import { WebPartContext } from "@microsoft/sp-webpart-base";
import {SPFI,spfi,SPFx} from "@pnp/sp";
import {LogLevel, PnPLogging} from "@pnp/logging";

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching"; 



var _sp:SPFI;

export const getSP = (context?: WebPartContext):SPFI => {
 if(context != null){
    //we need pnp logging package
    _sp = spfi().using(SPFx(context)).using(PnPLogging(LogLevel.Warning));
 }
 return _sp;
}