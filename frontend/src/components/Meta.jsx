import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />


    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'DrinksAndChill',
  description: 'We sell the best alcoholic products for cheap',
  keywords: 'drinsandchill,drinks and chill,drink&chill,drink,chill,drink muranga,drink chill muranga,drinkandchill,alcohol, murang"a wines and spirit, muranga drink and chill,beer,wines and spirit',
}

export default Meta
