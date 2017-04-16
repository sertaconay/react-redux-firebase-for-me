import React from 'react';


const FormInput = (({ type, name, id, className = '', defaultValue, required, placeholder, label, helpText, multiple = false }) =>
    <div className="form-group is-empty">
      <div className="row">
        <label className="col-sm-2 control-label" htmlFor={id}>{label}</label>
        <div className="col-sm-10">
          <input type={type} multiple={multiple} name={name} id={id} className={`form-control ${className}`} placeholder={placeholder} defaultValue={defaultValue} required={required} />
          <span className="help-block">{helpText}</span>
        </div>
      </div>
      <span className="material-input" />
    </div>
);

FormInput.propTypes = {
  type: React.PropTypes.string,
  multiple: React.PropTypes.bool,
  name: React.PropTypes.string,
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  label: React.PropTypes.string,
  helpText: React.PropTypes.string,
  required: React.PropTypes.bool,
  defaultValue: React.PropTypes.string,
};

export default FormInput;
