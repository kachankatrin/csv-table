import React from "react";
import Papa from "papaparse";
import TheTable from "./TheTable.jsx";
import Error from "./Error.jsx";
import ImportButton from "./Button.jsx";
import TableData from "./TableData.jsx";
import ImportAlert from "./ImportAlert.jsx";
import { capitalizeHeader } from "../utils.js";

export default class Main extends React.Component {
  state = {
    candidates: [],
    heading: "",
    errors: null,
    emailsRegistry: {},
    phonesRegistry: {},
    errorMessage: "File format is not correct",
    display: false,
    disabled: true,
    file: null,
    showAlert: false,
  };
  isValueValid(validator) {
    return validator ? "valid" : "invalid";
  }

  showDulicatedId = (id, ...args) => {
    let duplicateIds = [];
    for (const arg of args) {
      arg.filter((item) =>
        item !== id ? duplicateIds.push(item) : duplicateIds
      );
    }
    return duplicateIds.sort();
  };
  createRegistry = (registry, el, id) => {
    registry[el] = registry[el] || [];
    registry[el].push(id);
  };
  normilizePhone = (phone) => {
    if (`${phone}`.startsWith("+1")) {
      return phone;
    } else if (`${phone}`.startsWith("1")) {
      return `+${phone}`;
    } else {
      return `+1${phone}`;
    }
  };
  defineRegistry(arr) {
    let emailsRegistry = {};
    let phonesRegistry = {};
    arr.forEach((candidate, index) => {
      const { email, phone, id = index + 1 } = candidate;
      this.createRegistry(emailsRegistry, email, id);
      this.createRegistry(phonesRegistry, this.normilizePhone(phone), id);
    });
    return { emailsRegistry, phonesRegistry };
  }
  renderTableData() {
    return this.state.candidates.map((candidate, index) => {
      const {
        "full name": fullName,
        phone,
        email,
        age,
        experience,
        "yearly income": yearlyIncome,
        "has children": hasChildren,
        "license states": licenseStates,
        "expiration date": expirationDate,
        "license number": licenseNumber,
        id = index + 1,
      } = candidate;
      const self = this;
      const tel = this.state.phonesRegistry[this.normilizePhone(phone)];
      const mail = this.state.emailsRegistry[email];
      const duplicateIds = this.showDulicatedId(id, mail, tel);
      const isChildren = hasChildren
        ? hasChildren.toString().toUpperCase()
        : null;
      const errStyle = (param) => self.isValueValid(param);
      return (
        <TableData
          id={id}
          fullName={fullName}
          errStyle={errStyle}
          phone={phone}
          email={email}
          tel={tel}
          mail={mail}
          age={age}
          experience={experience}
          yearlyIncome={yearlyIncome}
          licenseStates={licenseStates}
          hasChildren={hasChildren}
          licenseNumber={licenseNumber}
          duplicateIds={duplicateIds}
          isChildren={isChildren}
          expirationDate={expirationDate}
          normilizePhone={this.normilizePhone(phone)}
        />
      );
    });
  }
  renderTableHeader() {
    if (this.state.heading) {
      if (this.state.heading.indexOf("Id") === -1) {
        this.state.heading.unshift("Id");
      }
      if (this.state.heading.indexOf("Duplicate with") === -1) {
        this.state.heading.push("Duplicate with");
      }
    }
    return this.state.heading.map((item, index) => (
      <th key={index} className="table-cell table-cell-header">
        {capitalizeHeader(item)}
      </th>
    ));
  }
  onChangeHandler(event) {
    if (event.target.files[0]) {
      this.setState({
        ...this.state,
        disabled: false,
        file: event.target.files[0],
      });
    }
  }
  importUsers() {
    const self = this;
    Papa.parse(self.state.file, {
      header: true,
      transformHeader: (h) => h.toLowerCase().trim(),
      transform: function (val) {
        return val.trim();
      },
      dynamicTyping: true,
      complete: function (results) {
        self.setState({
          ...self.state,
          heading: results.meta.fields,
          erorrs: results.errors,
          candidates: results.data,
          emailsRegistry: self.defineRegistry(results.data).emailsRegistry,
          phonesRegistry: self.defineRegistry(results.data).phonesRegistry,
          display: true,
          disabled: true,
          showAlert: false,
        });
      },
    });
  }
  closeAlert() {
    this.setState({
      ...this.state,
      showAlert: false,
    });
  }
  render() {
    const condition =
      this.state.heading.indexOf("full name") !== -1 &&
      this.state.heading.indexOf("email") !== -1 &&
      this.state.heading.indexOf("phone") !== -1 &&
      !this.state.errors;
    return (
      <div className="table-wrapper py-5 px-5">
        {
          <div>
            <ImportButton
              handleClick={() => {
                this.state.file
                  ? this.importUsers()
                  : this.setState({ ...this.state, showAlert: true });
              }}
              disabled={this.state.disabled}
              onChange={(e) => this.onChangeHandler(e)}
            />
            {this.state.showAlert ? (
              <ImportAlert onClose={() => this.closeAlert()} />
            ) : null}
            {this.state.display ? (
              condition ? (
                <TheTable
                  renderTableHeader={this.renderTableHeader()}
                  renderTableData={this.renderTableData()}
                />
              ) : (
                <Error message={this.state.errorMessage} />
              )
            ) : null}
          </div>
        }
      </div>
    );
  }
}