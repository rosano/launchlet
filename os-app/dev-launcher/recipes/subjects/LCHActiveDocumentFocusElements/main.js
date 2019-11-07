// https://stackoverflow.com/questions/1599660/which-html-elements-can-receive-focus
const LCHFocusElementsSelector= [
	'a[href]:not([tabindex="-1"])',
  // 'area[href]:not([tabindex="-1"])',
  'input:not([disabled]):not([tabindex="-1"]):not([type="hidden"])',
  // 'select:not([disabled]):not([tabindex="-1"])',
  // 'textarea:not([disabled]):not([tabindex="-1"])',
  'button:not([disabled]):not([tabindex="-1"])',
  // 'iframe:not([tabindex="-1"])',
  // '[tabindex]:not([tabindex="-1"])',
  // '[contentEditable=true]:not([tabindex="-1"])',
].join(',')

export const LCHActiveDocumentsFocusElements = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null || typeof inputData.querySelectorAll !== 'function') {
		throw new Error('LCHErrorInputNotValid');
	}

	const aggregate = {
		ids: {},
	};

	return [].concat.apply([], inputData.querySelectorAll(LCHFocusElementsSelector)).filter(function (e) {
		return {
			'A': function FocusElementAnchorFilter (e) {
				if (!e.href) {
					return false;
				};
				
				if (!e.textContent.trim() && !e.title.trim()) {
					return false;
				};
				
				return true;
			},
			'INPUT': function FocusElementInputFilter (e) {
				if (!aggregate.labels) {
					aggregate.labels = Array.from(inputData.querySelectorAll('label'));
				};

				aggregate.ids[e.id] = aggregate.labels.filter(function (label) {
					return label.getAttribute('for') === e.id;
				}).map(function (e) {
					return e.textContent.trim();
				}).shift();

				if (!e.name.trim() && !e.placeholder.trim() && !aggregate.ids[e.id]) {
					return false;
				};

				return true;
			},
			'BUTTON': function FocusElementButtonFilter (e) {
				if (!e.textContent.trim()) {
					return false;
				};

				return true;
			}
		}[e.tagName](e);
	}).map(function (e) {
		return {
			LCHRecipeName: {
				'A': function FocusElementAnchorNameg (e) {
					return e.textContent.trim() || e.title.trim()
				},
				'INPUT': function FocusElementInputNameg (e) {
					return aggregate.ids[e.id] || e.placeholder.trim() || e.name.trim();
				},
				'BUTTON': function FocusElementButtonName (e) {
					return e.textContent.trim();
				},
			}[e.tagName](e),
			LCHRecipeCallback () {
				return e;
			},
			LCHRecipeOutputType: 'DOMElement',
		};
	});
};

export const LCHActiveDocumentFocusElementsCallback = function() {
	return LCHActiveDocumentsFocusElements(document);
};

export const LCHActiveDocumentFocusElementsRecipe = function() {
	return {
		LCHRecipeSignature: 'LCHActiveDocumentFocusElements',
		LCHRecipeOutputType: 'SubjectContainer',
		LCHRecipeCallback: LCHActiveDocumentFocusElementsCallback,
	};
};
