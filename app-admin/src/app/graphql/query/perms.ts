import { Injectable } from '@angular/core';
import { Query, Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { Perm } from 'src/types/RtWeb';

@Injectable({ providedIn: 'root' })
export class PermsService extends Query<{ rtWebPerms: Perm[] }, { id: number }> {
    document = gql(`
        query($id:Int){
            rtWebPerms(id:$id) {
                id,
                pid,
                name,
                value,
                attr,
                desc
            }
        }
    `);
}
