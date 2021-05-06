import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
    return (
     <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
    </Helmet>
    )
}

Meta.defaultProps = {
    title: 'ProShop | ',
    keywords: 'cheap electronics, buy cheap electronics, discount electronics',
    description: '$elling you discount electronics at premium price$'
}

export default Meta
