
import React from 'react';
import PropTypes from 'prop-types';

import styles from '../OrderForm/OrderForm.scss';
import OrderSummary from '../../features/OrderSummary/OrderSummary';
import OrderOption from '../../features/OrderOption/OrderOption';
import Button from '../../common/Button/Button';
import { Row, Col} from 'react-flexbox-grid';

import pricing from '../../../data/pricing.json';
import settings from '../../../data/settings.js';

import { formatPrice } from '../../../utils/formatPrice';
import { calculateTotal } from '../../../utils/calculateTotal';

const sendOrder = (trip, options, tripCost) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...trip,
    ...options,
    totalCost,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse) {
      console.log('parsedResponse', parsedResponse);
    });
};
const OrderForm = ({trip, options, tripCost, setOrderOption}) => {
  return (
    <Row className={styles.component}>
      {pricing.map(option => (
        <Col key={option.id} md={4}>
          <OrderOption {...option} currentValue={options[option.id]} setOrderOption={setOrderOption}/>
        </Col>
      )
      )}
      <Col xs={12}>
        <OrderSummary cost={tripCost} options={options} />
        <Button onClick={() => sendOrder(trip, options, tripCost)}>Order Now!</Button>
      </Col>
    </Row>
  );

};

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
  trip: PropTypes.object,
};

export default OrderForm;

