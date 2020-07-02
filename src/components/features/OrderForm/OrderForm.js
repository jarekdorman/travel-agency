import React from 'react';
import OrderSummary from '../../features/OrderSummary/OrderSummary';
import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import OrderOption from '../OrderOption/OrderOption';
import pricing from '../../../data/pricing.json';
import styles from './OrderForm.scss';

const OrderForm = ({options, tripCost, setOrderOption}) => (
  <Row className={styles.component}>
    {pricing.map((option) => (
      <Col key={option.id} md={6}>
        <OrderOption
          {...option}
          currentValue={options[option.id]}
          setOrderOption={setOrderOption}
        />
      </Col>
    ))}
    <Col xs={12}>
      <OrderSummary cost={tripCost} options={options} />
      <button>SEND REQUEST</button>
    </Col>
  </Row>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
};

export default OrderForm;
