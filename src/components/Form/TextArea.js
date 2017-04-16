import React from 'react';
import ReactQuill from 'react-quill';


const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

const FormTextArea = (({ id, className, placeholder, label, value, defaultValue, onChange }) =>
    <div className="form-group">
      <div className="row">
        <label htmlFor={id} className="col-sm-2 control-label">{label}</label>
        <div className="col-sm-10">
          {
            defaultValue
              ? <ReactQuill className={className} placeholder={placeholder} theme="snow" modules={modules} defaultValue={defaultValue} onChange={onChange} />
              : <ReactQuill className={className} placeholder={placeholder} theme="snow" modules={modules} value={value} onChange={onChange} />
          }
        </div>
      </div>
    </div>
);

FormTextArea.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  label: React.PropTypes.string,
  value: React.PropTypes.string,
  defaultValue: React.PropTypes.string,
  onChange: React.PropTypes.func,
};

export default FormTextArea;
