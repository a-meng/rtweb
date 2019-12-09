import { Injectable } from '@angular/core';
import { Query, Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { Role, RolePerm } from 'src/types/RtWeb';

@Injectable({ providedIn: 'root' })
export class RolesService extends Query<{ rtWebRoles: Role[] }, { id?: number }> {
    document = gql(`
        query($id:Int){
            rtWebRoles(id:$id) {
                id,
                pid,
                name
            }
        }
    `);
}
