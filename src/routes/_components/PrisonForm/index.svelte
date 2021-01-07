<script>
	import {Form, Field} from "svelte-final-form";

	// Just for example
	import Select from "svelte-select";
	// Your custom form group adapter
	import FormGroup from "components/FormGroup";

	const selectItems = ["Green", "Red", "Black"];

	const initialValues = {
		firstName: "Alexey",
		lastName: "Solilin",
		color: "Red",
	};

	const onSubmit = async (values) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		console.log(JSON.stringify(values, undefined, 2));
	};

	const validate = (values) => {
		const errors = {};
		if (!values.firstName) {
			errors.firstName = "Required";
		}
		if (!values.lastName) {
			errors.lastName = "Required";
		}
		return errors;
	};
</script>

<Form {onSubmit} {validate} {initialValues} let:form let:state>
	<form on:submit|preventDefault={form.submit}>
		<Field name="firstName" let:input let:meta>
			<label htmlFor="firstName">First Name</label>
			<input
					name={input.name}
					on:blur={input.onBlur}
					on:focus={input.onFocus}
					on:input={(e) => input.onChange(e.target.value)}
					type="text"
					placeholder="Last Name"
					value={input.value}/>
			{#if meta.touched && meta.error}
				<div>{meta.error}</div>
			{/if}
		</Field>

		<!-- You can prepare you Form Group Adapter with Label, Input, Errors -->
		<Field name="lastName" let:input let:meta>
			<FormGroup label="Last Name" type="text" {...input} {...meta}/>
		</Field>

		<!-- Example for svelte-select -->
		<Field name="color" let:input let:meta>
			<Select
					items={selectItems}
					on:blur={input.onBlur}
					on:focus={input.onFocus}
					on:select={({ detail }) => input.onChange(detail.value)}
					selectedValue={input.value}
					name="color"
			/>
		</Field>

		<button type="submit" disabled={state.submitting}>Submit</button>
		or
		<button disabled={state.pristine} on:click={() => form.reset(initialValues)}>Reset</button>
	</form>
</Form>