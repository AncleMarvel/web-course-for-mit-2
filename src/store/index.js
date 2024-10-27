import { createStore } from 'vuex';

export default createStore({
    state: {
        currencies: [
            {
                handle: "BTC",
                title: "Bitcoin",
                value: 65000, // 1 btc = 65000 usdt
                priceCurrency: "USDT"
            },
            {
                handle: "ETH",
                title: "Ethereum",
                value: 2500, // 1 eth = 2500 usdt
                priceCurrency: "USDT"
            }
        ],
        settings: [
            {
                id: "setting-127346238",
                title: "BTC & USDT increase each 2 sec for T-Shirts",
                status: "draft",
                formulas: [
                    {
                        id: "formula-123456",
                        title: "BTC in used for T-Shirts",
                        formula: "X * Y",
                        frequency: 2000,
                        currency: "BTC",
                        targets: {
                            collectionsIds: ['collection-1827498', 'collection-324545634'],
                            products: [
                                {
                                    id: 'product-23423523',
                                    variantsIds: ['variant-23423523', 'variant-23423524']
                                }
                            ]
                        }
                    }
                ]
            }
        ],
        collections: [
            {
                id: "collection-1827498",
                title: "T-Shirts"
            },
            {
                id: "collection-324545634",
                title: "Hoodies"
            }
        ],
        products: [
            {
                id: "product-23423523",
                title: "Product 1",
                price: 11,
                variants: [
                    {
                        id: "variant-23423523",
                        title: "Black",
                        price: 11
                    },
                    {
                        id: "variant-23423524",
                        title: "Red",
                        price: 12
                    }
                ]
            }
        ]
    },
    mutations: {
    },
    actions: {
    },
    getters: {
        getCurrencies: (state) => state.currencies,
    },
});