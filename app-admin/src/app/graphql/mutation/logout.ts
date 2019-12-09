import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({ providedIn: 'root' })
export class LogoutService extends Mutation<boolean> {
    document = gql(`
        mutation{
            logout
        }
    `);
}
