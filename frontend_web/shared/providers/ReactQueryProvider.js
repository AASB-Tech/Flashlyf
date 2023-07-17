"use client"

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient()

function ReactQueryProvider({ children })
{

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {process.env.NEXT_PUBLIC_NODE_ENV == "development" ? 
                <ReactQueryDevtools initialIsOpen={false} />
            :
                null   
            }
        </QueryClientProvider>
    )
}

export default ReactQueryProvider
