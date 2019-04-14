import { IWidget } from 'ibcommon-lib';
import { Injectable } from '@angular/core';

@Injectable()
 export abstract class WidgetService {
   abstract  getWidgets(): IWidget[]
 } 
 

export class AppWidgetService {

    public getWidgets(): IWidget[] {
        return [
            {
             name:'Image',
             description: 'Displays an image',
             htmlTag:'image-element',
             contextSchema: `{
                "type": "object",
              "properties": {
                "src": { "type": "string" },
                "content": { "type": "string" },
              },
              "required": [ "url" ]
              }`,
             acceptedContents:[]
            },
            {
                name:'Markdown',
                description: 'Displays markdown',
                htmlTag:'markdown-element',
                contextSchema: `{
                   "type": "object",
                 "properties": {
                   "src": { "type": "string" },
                   "content": { "type": "string" },
                 },
                 "required": [ "url" ]
                 }`,
                acceptedContents:[]
               }
        ]
    }
}