import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { MessageService } from 'src/app/services/message.service';


const errorLink = onError(({ graphQLErrors, networkError }) => {
    const msgServ = new MessageService();
    if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => {
            msgServ.add({
                type: 'error',
                content: `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            });
        });
    } else if (networkError) {
        msgServ.add({
            type: 'error',
            content: `[Network error]: ${networkError}`
        });
    } else {
        msgServ.add({
            type: 'error',
            content: `[unknow error]:${networkError}`
        });
    }
});

export function createApollo(httpLink: HttpLink) {
    return {
        link: ApolloLink.from([errorLink, httpLink.create({ uri: '/graphql' })]),
        cache: new InMemoryCache(),
        defaultOptions: {
            query: {
                fetchPolicy: 'network-only',
                errorPolicy: 'all',
            },
            mutate: {
                errorPolicy: 'all',
            },
        },
    };
}

@NgModule({
    exports: [ApolloModule, HttpLinkModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink],
        },
    ],
})
export class GraphQLModule { }
