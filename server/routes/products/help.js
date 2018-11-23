
exports.setVars = (options = {}) => {
    return (req, res, next) => {
        setTimeout(() => {
            res.locals.vars = {
                page: {
                    ...options,
                    title: 'lets see what you need',
                    name: 'products',
                    bread: [
                        {
                            id: 0,
                            title: 'man\'s',
                            link: '/products/man'
                        },
                        {
                            id: 1,
                            title: 'woman\'s',
                            link: '/products/woman'
                        },
                        {
                            id: 2,
                            title: 'child\'s',
                            link: '/products/child'
                        },
                        {
                            id: 3,
                            title: 'pet\'s',
                            link: '/products/pet'
                        }
                    ],
                    slides: [
                        {
                            id: 0,
                            message: 'brand new',
                            category: 'fun',
                            title: 'brand new bysicle',
                            link: '/product/brand_new_bysicle',
                            image: {
                                src: 'http://pngimg.com/uploads/bicycle/bicycle_PNG5355.png',
                                position: 'bottom right'
                            },
                            background: 'linear-gradient(to right, #36d1dc, #5b86e5)'
                        },
                        {
                            id: 1,
                            message: 'black friday !!!',
                            category: 'suits',
                            title: 'suit better',
                            link: '/product/suit_better',
                            image: {
                                src: 'http://www.pngall.com/wp-content/uploads/2016/05/Jacket-PNG.png',
                                position: 'center right'
                            },
                            background: 'linear-gradient(to right, #56ccf2, #2f80ed)'
                        },
                        {
                            id: 2,
                            message: 'brand new',
                            category: 'fun',
                            title: 'brand new bysicle',
                            link: '/product/brand_new_bysicle',
                            image: {
                                src: 'http://pngimg.com/uploads/bicycle/bicycle_PNG5355.png',
                                position: 'bottom right'
                            },
                            background: 'linear-gradient(to right, #36d1dc, #5b86e5)'
                        }
                    ]
                }
            };
            next();
        }, 0);
    }
}
