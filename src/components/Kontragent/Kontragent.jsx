// components/ClientDetails.jsx

import React from "react";
import "./kontragent.css";

const ClientDetails = ({ debtor, onClose }) => {
  if (!debtor) return null;

  return (
    <div className="client-modal-overlay" onClick={onClose}>
      <div className="client-modal" onClick={(e) => e.stopPropagation()}>
        <h2>
          {debtor.first_name} {debtor.last_name}
        </h2>
        <p><strong>PINFL:</strong> {debtor.pinfl}</p>
        <p><strong>Паспорт:</strong> {debtor.passport_seria} {debtor.passport_number}</p>
        <p><strong>Телефон:</strong> {debtor.phone}</p>
        <p><strong>Адрес:</strong> {debtor.addres}</p>
        <h3>Контракты:</h3>
        {debtor.contracts.map((contract, i) => (
          <div className="client-contract" key={i}>
            <p><strong>Продукт:</strong> {contract.products}</p>
            <p><strong>Дата:</strong> {contract.date}</p>
            <p><strong>Тариф:</strong> {contract.tariff}</p>
            <p><strong>Долг:</strong> {contract.debt.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p><strong>Сумма контракта:</strong> {contract.contract_summary.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p><strong>Месячный платёж:</strong> {contract.mounthly_payment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p><strong>Агент:</strong> {contract.agent}</p>
          </div>
        ))}
        <button className="client-close-btn" onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default ClientDetails;
