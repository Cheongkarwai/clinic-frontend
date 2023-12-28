import {APOLLO_NAMED_OPTIONS, APOLLO_OPTIONS, ApolloModule, NamedOptions} from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';

const uri = 'http://localhost:9000/appointments'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): NamedOptions {
  return {
    default: {
      link: httpLink.create({uri}),
      cache: new InMemoryCache(),
    },
    appointments:{
      link:httpLink.create({uri:'http://localhost:8084/graphql'}),
      cache: new InMemoryCache()
    },
    products:{
      link:httpLink.create({uri:'http://localhost:8082/graphql'}),
      cache: new InMemoryCache()
    }
  }
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_NAMED_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
