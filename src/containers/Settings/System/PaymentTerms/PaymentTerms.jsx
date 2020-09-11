import React from 'react';
import { PageHeader } from 'components';
import PaymentTermsTable from './PaymentTermsTable/PaymentTermsTable';

const PaymentTerms = () => (
  <div>
    <PageHeader
      bigText="Company Name - PAYMENT TERMS"
      smallText="xxxx"
    />
    <PaymentTermsTable />
  </div>
);

export default PaymentTerms;
