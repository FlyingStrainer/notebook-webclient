
export const InputEnum = {
	TEXT : function formValidNotEmpty(data) {
		return data.length > 0;
	},
	SELECTION : function formValidSelection(selectElem) {
		return $('option:selected', selectElem).length > 0 && !$('option:selected', selectElem).is(':disabled');
	},
	CHECKBOX : function formValidCheckbox(checkboxElem) {
		return $(checkboxElem).is(':checked');
	},
	RADIO : function formValidRadio() {
		return true;
	},
	EMAIL : function formValidEmail(data) {
		return data.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
	},
	ZIPCODE : function formValidZip(data) {
		return data.match(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
	},
	PHONE : function formValidPhone(data) {
		return data.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/);
	}
}

export class Input {
	constructor(inputEnum, required, validate, placeholder, description) {
		this.inputType = inputEnum;
		this.required = required;
		this.validate = validate;
		this.placeholder = placeholder;
		this.description = description;
	}
}

export class Label {
	constructor(html) {
		this.html = html;
	}
}

export class Form {
	constructor(formFields) {
		this.formFields = formFields;
	}
}