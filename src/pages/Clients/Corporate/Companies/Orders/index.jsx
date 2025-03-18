import React from 'react'
import { useParams } from 'react-router-dom';

const CorporateCompanyOrdersList = () => {
    const { id } = useParams();

    return (
        <div>CorporateCompanyOrdersList</div>
    )
}

export default CorporateCompanyOrdersList