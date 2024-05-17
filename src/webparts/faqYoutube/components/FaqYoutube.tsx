import * as React from 'react';
import { SPFI, SPFx as spSPFx } from "@pnp/sp";
import type { IFaqYoutubeProps } from './IFaqYoutubeProps';

import { useEffect ,useState} from 'react';

import { IFaqYoutube } from '../../../interfaces';
import { getSP } from '../../../pnpConfig';
import { Accordion } from "@pnp/spfx-controls-react/lib/Accordion";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";


const FaqYoutube = (props: IFaqYoutubeProps) => {


  const LOG_SOURCE = 'FAQ Web part';
  const LIST_NAME = 'FAQ';
  let _sp: SPFI = getSP(props.context);

  // const graph = graphfi().using(graphSPFx(props.context));
  const [faqItems, setFaqItems] = useState<IFaqYoutube[]>([]);

  const getFAQItems = async () => {

    const items = await _sp.web.lists.getById(props.listGuid).items.select().orderBy('Letter', true).orderBy('Title', true)();
    console.log('FAQ items', items);

    setFaqItems(items.map((item:any) => {
      return {
        Id: item.Id,
        Title: item.Title,
        Body: item.Body,
        Letter: item.Letter
      }
    }));
   
  }

  //use effect says just run once, 
  //if instead of empty [] array we add the 
  //[props] will run only if the props change 
  useEffect(() => {
    if(props.listGuid && props.listGuid != ''){
      getFAQItems();
    }
  }, [props])

  return (
    <>
    <WebPartTitle displayMode={props.displayMode}
              title={props.title}
              updateProperty={props.updateProperty} />

        {props.listGuid ? faqItems.map((o:IFaqYoutube,index:number) => {
      return (<Accordion key={index} title={o.Title} defaultCollapsed={true} >
        {o.Body}
      </Accordion> )
    }) : <Placeholder iconName='Edit'
    iconText='Configure your web part'
    description='Please configure the web part.'
    buttonLabel='Configure'
    onConfigure={() => props.context.propertyPane.open()}
    />}
    </>
  )
}

export default FaqYoutube
