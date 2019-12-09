import { Injectable } from '@angular/core';
import { Query, Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({ providedIn: 'root' })
export class UpdateUserRolesService extends Mutation<boolean, { id: number, roleIds: number[] }> {
    document = gql(`
        mutation  ($id:Int,$roleIds:[Int]){
            updateUserRoles(id:$id,roleIds:$roleIds)
        }
    `);
}

