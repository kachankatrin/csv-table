import React from "react";
import Cell from "./Cell.jsx";
import {
  validateAge,
  validateDate,
  validateChildren,
  validateExperience,
  validateEmail,
  validatePhone,
  validateDuplicates,
  validateIncome,
  validateLicense,
  stateAbbr,
} from "../utils.js";

export default function TableData(props) {
  const {
    id,
    fullName,
    errStyle,
    phone,
    email,
    tel,
    mail,
    age,
    experience,
    yearlyIncome,
    licenseStates,
    hasChildren,
    licenseNumber,
    duplicateIds,
    isChildren,
    expirationDate,
    normilizePhone,
  } = props;
  return (
    <tr key={id}>
      <th className="table-cell table-cell-header">{id}</th>
      <Cell value={fullName} />
      <Cell
        cellClass={errStyle(validatePhone(phone) && !validateDuplicates(tel))}
        value={normilizePhone}
      />
      <Cell
        cellClass={errStyle(validateEmail(email) && !validateDuplicates(mail))}
        value={email}
      />
      <Cell cellClass={errStyle(validateAge(age))} value={age} />
      <Cell
        cellClass={errStyle(validateExperience(experience, age))}
        value={experience}
      />
      <Cell
        cellClass={errStyle(validateIncome(yearlyIncome))}
        value={yearlyIncome.toFixed(2)}
      />
      <Cell
        cellClass={errStyle(validateChildren(hasChildren))}
        value={isChildren}
      />
      <Cell value={stateAbbr(licenseStates)} />
      <Cell
        cellClass={errStyle(validateDate(expirationDate))}
        value={expirationDate}
      />
      <Cell
        cellClass={errStyle(validateLicense(licenseNumber))}
        value={licenseNumber}
      />
      <Cell
        value={
          mail.length > 1 || tel.length > 1 ? duplicateIds.join(", ") : null
        }
      />
    </tr>
  );
}