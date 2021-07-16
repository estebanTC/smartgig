import '../styles/globals.css'
import {ApolloProvider} from '@apollo/client'
import client from '../config/apollo';
import PaginaState from '../context/PaginaState';



function MyApp({ Component, pageProps }) {

  return (
            <ApolloProvider client={client}>
               <PaginaState>
                  <Component {...pageProps} />
             </PaginaState>
            </ApolloProvider>
          )
}

export default MyApp
