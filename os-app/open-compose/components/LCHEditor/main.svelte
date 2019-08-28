<script>
export let EditorInitialValue = '';
export let EditorOptions = {};

let EditorPostInitializeQueue = [];
export let EditorConfigure = function (e) {
	// console.log(EditorInstance ? 'run' : 'queue', e);
	return EditorInstance ? e(EditorInstance) : EditorPostInitializeQueue.push(e);
};

let EditorElement;
let EditorInstance;
import { onMount, createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
onMount(function SetupEditor () {
	EditorInstance = CodeMirror.fromTextArea(EditorElement, EditorOptions);

	EditorInstance.setValue(EditorInitialValue);

	EditorInstance.on('change', function (instance, changeObject) {
		if (changeObject.origin === 'setValue') {
			return;
		}

		dispatch('EditorDispatchValueChanged', instance.getValue());
	});

	// console.log(EditorPostInitializeQueue);
	
	EditorPostInitializeQueue.splice(0, EditorPostInitializeQueue.length).forEach(function(e) {
		// console.log('run', e);

		return e(EditorInstance);
	});
});
</script>

<textarea bind:this={ EditorElement }></textarea>
