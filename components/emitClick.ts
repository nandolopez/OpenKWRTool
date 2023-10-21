export const emitClick = (event: any) => {
$emit('update:modelValue', event.target?.value);
};
