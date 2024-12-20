export default {
    currencies: [
        {
            "id": "bitcoin",
            "name": "Bitcoin",
            "api_symbol": "bitcoin",
            "symbol": "BTC",
            "market_cap_rank": 1,
            "thumb": "https://coin-images.coingecko.com/coins/images/1/thumb/bitcoin.png",
            "large": "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png"
        },
        {
            "id": "ethereum",
            "name": "Ethereum",
            "api_symbol": "ethereum",
            "symbol": "ETH",
            "market_cap_rank": 2,
            "thumb": "https://coin-images.coingecko.com/coins/images/279/thumb/ethereum.png",
            "large": "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png"
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
                },
                {
                    id: "formula-123456",
                    title: "BTC in used for T-Shirts",
                    formula: "X * Y",
                    frequency: 2000,
                    currency: "ASD",
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
        },
        {
            id: "setting-127346239",
            title: "ETH & USDT increase each 3 sec for Hoodies",
            status: "active",
            formulas: [
                {
                    id: "formula-123457",
                    title: "ETH in used for Hoodies",
                    formula: "X * Y",
                    frequency: 3000,
                    currency: "ETH",
                    targets: {
                        collectionsIds: ['collection-324545634'],
                        products: []
                    }
                }
            ]
        },
        {
            id: "setting-127346240",
            title: "BTC & USDT increase each 4 sec for T-Shirts",
            status: "draft",
            formulas: [
                {
                    id: "formula-123458",
                    title: "BTC in used for T-Shirts",
                    formula: "X * Y",
                    frequency: 4000,
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
}